import type { ReactNode} from 'react';

import { useState, useEffect, useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export interface TeamMemberRating {
  workerId: string;
  workerName: string;
  ratedBy: string; // userId of supervisor/manager who rated
  ratedByName: string;
  rating: number; // 1-5 stars
  feedback?: string;
  timestamp: Date;
}

interface RatingsContextType {
  ratings: TeamMemberRating[];
  addRating: (rating: Omit<TeamMemberRating, 'timestamp'>) => void;
  updateRating: (workerId: string, ratedBy: string, rating: number, feedback?: string) => void;
  getRating: (workerId: string, ratedBy?: string) => TeamMemberRating | undefined;
  getWorkerRatings: (workerId: string) => TeamMemberRating[];
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

// ----------------------------------------------------------------------

interface RatingsProviderProps {
  children: ReactNode;
}

export function RatingsProvider({ children }: RatingsProviderProps) {
  const [ratings, setRatings] = useState<TeamMemberRating[]>([]);
  
  // Helper function to send performance warning - uses notification service directly
  const sendPerformanceWarningSafe = async (
    workerId: string,
    ratedByName: string,
    qualityScore: number,
    feedback?: string
  ) => {
    // Check if permission is granted first
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') {
      return;
    }

    // Import and use notification service directly (doesn't require context)
    try {
      const { notifyPerformanceWarning } = await import('../services/notification-service');
      await notifyPerformanceWarning(workerId, ratedByName, qualityScore, feedback);
    } catch (error) {
      // Notification service not available - silently fail
      console.debug('Performance warning notification not available:', error);
    }
  };

  // Load ratings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('teamMemberRatings');
      if (stored) {
        const parsedRatings = JSON.parse(stored).map((r: any) => ({
          ...r,
          timestamp: new Date(r.timestamp),
        }));
        setRatings(parsedRatings);
      }
    } catch (error) {
      console.error('Error loading ratings:', error);
    }
  }, []);

  // Save to localStorage whenever ratings change
  useEffect(() => {
    localStorage.setItem('teamMemberRatings', JSON.stringify(ratings));
  }, [ratings]);

  const addRating = (ratingData: Omit<TeamMemberRating, 'timestamp'>) => {
    setRatings((prev) => {
      // Check if rating already exists
      const existingIndex = prev.findIndex(
        (r) => r.workerId === ratingData.workerId && r.ratedBy === ratingData.ratedBy
      );
      
      let updatedRating: TeamMemberRating;
      
      if (existingIndex !== -1) {
        // Update existing rating
        const updated = [...prev];
        updatedRating = {
          ...ratingData,
          timestamp: new Date(),
        };
        updated[existingIndex] = updatedRating;
        
        // Send performance warning if rating is low (1-2 stars) or feedback indicates poor performance
        if (updatedRating.rating <= 2 || (updatedRating.feedback && updatedRating.feedback.toLowerCase().includes('poor'))) {
          sendPerformanceWarningSafe(
            updatedRating.workerId,
            updatedRating.ratedByName,
            0, // quality score will be calculated separately
            updatedRating.feedback
          );
        }
        
        return updated;
      }
      
      // Add new rating
      updatedRating = {
        ...ratingData,
        timestamp: new Date(),
      };
      
      // Send performance warning if rating is low (1-2 stars) or feedback indicates poor performance
      if (updatedRating.rating <= 2 || (updatedRating.feedback && updatedRating.feedback.toLowerCase().includes('poor'))) {
        sendPerformanceWarningSafe(
          updatedRating.workerId,
          updatedRating.ratedByName,
          0, // quality score will be calculated separately
          updatedRating.feedback
        );
      }
      
      return [...prev, updatedRating];
    });
  };

  const updateRating = (workerId: string, ratedBy: string, rating: number, feedback?: string) => {
    setRatings((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.workerId === workerId && r.ratedBy === ratedBy
      );
      
      if (existingIndex !== -1) {
        // Update existing
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          rating,
          feedback,
          timestamp: new Date(),
        };
        return updated;
      }
      
      return prev;
    });
  };

  const getRating = (workerId: string, ratedBy?: string) => {
    if (ratedBy) {
      return ratings.find((r) => r.workerId === workerId && r.ratedBy === ratedBy);
    }
    // Return most recent rating for this worker
    const workerRatings = ratings.filter((r) => r.workerId === workerId);
    return workerRatings.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  };

  const getWorkerRatings = (workerId: string) => ratings.filter((r) => r.workerId === workerId);

  const value: RatingsContextType = {
    ratings,
    addRating,
    updateRating,
    getRating,
    getWorkerRatings,
  };

  return <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>;
}

export function useRatings() {
  const context = useContext(RatingsContext);
  if (context === undefined) {
    throw new Error('useRatings must be used within a RatingsProvider');
  }
  return context;
}

