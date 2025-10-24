import type { ReactNode } from 'react';

import React, { useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useAuth } from './auth-context';
import { hostawayApi } from '../services/hostaway-api';

import type { HostawayGuest, HostawayRevenue, HostawayChannel, HostawayProperty, HostawayCredentials, HostawayReservation } from '../services/hostaway-api';

interface HostawayContextType {
  // Data
  properties: HostawayProperty[];
  reservations: HostawayReservation[];
  guests: HostawayGuest[];
  revenue: HostawayRevenue[];
  channels: HostawayChannel[];
  
  // Loading states
  isLoading: boolean;
  isPropertiesLoading: boolean;
  isReservationsLoading: boolean;
  isGuestsLoading: boolean;
  isRevenueLoading: boolean;
  isChannelsLoading: boolean;
  
  // Error states
  error: string | null;
  
  // Credentials
  hasCredentials: boolean;
  credentials: HostawayCredentials | null;
  
  // User role
  isSuperAdmin: boolean;
  
  // Actions
  setCredentials: (credentials: HostawayCredentials) => void;
  refreshData: () => Promise<void>;
  refreshProperties: () => Promise<void>;
  refreshReservations: () => Promise<void>;
  refreshGuests: () => Promise<void>;
  refreshRevenue: () => Promise<void>;
  refreshChannels: () => Promise<void>;
  
  // Utility functions
  getPropertyById: (id: number) => HostawayProperty | undefined;
  getReservationById: (id: number) => HostawayReservation | undefined;
  getGuestById: (id: number) => HostawayGuest | undefined;
}

const HostawayContext = createContext<HostawayContextType | undefined>(undefined);

interface HostawayProviderProps {
  children: ReactNode;
}

export function HostawayProvider({ children }: HostawayProviderProps) {
  const { user } = useAuth();
  
  // Data states
  const [properties, setProperties] = useState<HostawayProperty[]>([]);
  const [reservations, setReservations] = useState<HostawayReservation[]>([]);
  const [guests, setGuests] = useState<HostawayGuest[]>([]);
  const [revenue, setRevenue] = useState<HostawayRevenue[]>([]);
  const [channels, setChannels] = useState<HostawayChannel[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(false);
  const [isReservationsLoading, setIsReservationsLoading] = useState(false);
  const [isGuestsLoading, setIsGuestsLoading] = useState(false);
  const [isRevenueLoading, setIsRevenueLoading] = useState(false);
  const [isChannelsLoading, setIsChannelsLoading] = useState(false);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Credentials state
  const [hasCredentials, setHasCredentials] = useState(false);
  const [credentials, setCredentialsState] = useState<HostawayCredentials | null>(null);
  
  // Check if user is super admin
  const isSuperAdmin = user?.role === 'super-admin';

  // Initialize credentials on mount
  useEffect(() => {
    const stored = localStorage.getItem('hostawayCredentials');
    if (stored) {
      try {
        const creds = JSON.parse(stored);
        setCredentialsState(creds);
        setHasCredentials(true);
        hostawayApi.setCredentials(creds);
      } catch (err) {
        console.error('Failed to load Hostaway credentials:', err);
      }
    }
  }, []);

  // Set credentials function
  const setCredentials = (newCredentials: HostawayCredentials) => {
    setCredentialsState(newCredentials);
    setHasCredentials(true);
    hostawayApi.setCredentials(newCredentials);
    refreshData(); // Refresh data with new credentials
  };

  // Refresh all data
  const refreshData = useCallback(async () => {
    if (!hasCredentials) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Refresh all data in parallel
      const [propertiesData, reservationsData, guestsData, revenueData, channelsData] = await Promise.all([
        hostawayApi.getProperties(),
        hostawayApi.getReservations(),
        hostawayApi.getGuests(),
        hostawayApi.getRevenue(),
        hostawayApi.getChannels(),
      ]);
      
      setProperties(propertiesData);
      setReservations(reservationsData);
      setGuests(guestsData);
      setRevenue(revenueData);
      setChannels(channelsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  }, [hasCredentials]);

  // Load initial data when credentials are available
  useEffect(() => {
    if (hasCredentials) {
      refreshData();
    }
  }, [hasCredentials, refreshData]);

  // Refresh properties
  const refreshProperties = async () => {
    setIsPropertiesLoading(true);
    try {
      const data = await hostawayApi.getProperties();
      setProperties(data);
    } catch (err) {
      console.error('Failed to refresh properties:', err);
    } finally {
      setIsPropertiesLoading(false);
    }
  };

  // Refresh reservations
  const refreshReservations = async () => {
    setIsReservationsLoading(true);
    try {
      const data = await hostawayApi.getReservations();
      setReservations(data);
    } catch (err) {
      console.error('Failed to refresh reservations:', err);
    } finally {
      setIsReservationsLoading(false);
    }
  };

  // Refresh guests
  const refreshGuests = async () => {
    setIsGuestsLoading(true);
    try {
      const data = await hostawayApi.getGuests();
      setGuests(data);
    } catch (err) {
      console.error('Failed to refresh guests:', err);
    } finally {
      setIsGuestsLoading(false);
    }
  };

  // Refresh revenue
  const refreshRevenue = async () => {
    setIsRevenueLoading(true);
    try {
      const data = await hostawayApi.getRevenue();
      setRevenue(data);
    } catch (err) {
      console.error('Failed to refresh revenue:', err);
    } finally {
      setIsRevenueLoading(false);
    }
  };

  // Refresh channels
  const refreshChannels = async () => {
    setIsChannelsLoading(true);
    try {
      const data = await hostawayApi.getChannels();
      setChannels(data);
    } catch (err) {
      console.error('Failed to refresh channels:', err);
    } finally {
      setIsChannelsLoading(false);
    }
  };

  // Utility functions
  const getPropertyById = (id: number): HostawayProperty | undefined => properties.find(property => property.id === id);

  const getReservationById = (id: number): HostawayReservation | undefined => reservations.find(reservation => reservation.id === id);

  const getGuestById = (id: number): HostawayGuest | undefined => guests.find(guest => guest.id === id);

  const contextValue: HostawayContextType = {
    // Data
    properties,
    reservations,
    guests,
    revenue,
    channels,
    
    // Loading states
    isLoading,
    isPropertiesLoading,
    isReservationsLoading,
    isGuestsLoading,
    isRevenueLoading,
    isChannelsLoading,
    
    // Error state
    error,
    
    // Credentials
    hasCredentials,
    credentials,
    
    // User role
    isSuperAdmin,
    
    // Actions
    setCredentials,
    refreshData,
    refreshProperties,
    refreshReservations,
    refreshGuests,
    refreshRevenue,
    refreshChannels,
    
    // Utility functions
    getPropertyById,
    getReservationById,
    getGuestById,
  };

  return (
    <HostawayContext.Provider value={contextValue}>
      {children}
    </HostawayContext.Provider>
  );
}

// Custom hook to use Hostaway context
export function useHostaway() {
  const context = useContext(HostawayContext);
  if (context === undefined) {
    throw new Error('useHostaway must be used within a HostawayProvider');
  }
  return context;
}

// Export the context for advanced usage
export { HostawayContext };
