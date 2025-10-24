import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from 'react';

// ----------------------------------------------------------------------

export interface MessageQualityMetrics {
  responseTimeMs: number;
  responseTimeScore: number; // 0-100
  sentimentScore: number; // 0-100
  completenessScore: number; // 0-100
  grammarScore: number; // 0-100
  templateComplianceScore: number; // 0-100
  overallScore: number; // 0-100
  qualityGrade: 'excellent' | 'good' | 'average' | 'poor';
}

export interface WorkerPerformance {
  workerId: string;
  workerName: string;
  role: 'associate' | 'supervisor' | 'manager';
  totalMessages: number;
  averageResponseTime: number;
  averageQualityScore: number;
  responseRate: number; // percentage
  excellentResponses: number;
  goodResponses: number;
  averageResponses: number;
  poorResponses: number;
  lastActive: Date;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  workerId: string;
  workerName: string;
  workerRole: 'associate' | 'supervisor' | 'manager';
  message: string;
  sentAt: Date;
  responseTimeMs: number;
  qualityMetrics: MessageQualityMetrics;
  guestMessage?: string;
  guestMessageTime?: Date;
}

interface MessageQualityContextType {
  // Quality Assessment
  assessMessageQuality: (message: string, responseTimeMs: number) => MessageQualityMetrics;
  
  // Performance Tracking
  recordMessage: (messageRecord: Omit<MessageRecord, 'qualityMetrics'>) => void;
  getWorkerPerformance: (workerId: string) => WorkerPerformance | undefined;
  getAllWorkersPerformance: () => WorkerPerformance[];
  getRolePerformance: (role: 'associate' | 'supervisor' | 'manager') => WorkerPerformance[];
  
  // Real-time Data
  recentMessages: MessageRecord[];
  performanceStats: {
    totalMessages: number;
    averageResponseTime: number;
    averageQualityScore: number;
    activeWorkers: number;
  };
}

const MessageQualityContext = createContext<MessageQualityContextType | undefined>(undefined);

interface MessageQualityProviderProps {
  children: ReactNode;
}

export function MessageQualityProvider({ children }: MessageQualityProviderProps) {
  const [messageRecords, setMessageRecords] = useState<MessageRecord[]>([]);
  const [recentMessages, setRecentMessages] = useState<MessageRecord[]>([]);

  // Response Time Scoring
  const getResponseTimeScore = (responseTimeMs: number): number => {
    const minutes = responseTimeMs / (1000 * 60);
    
    if (minutes <= 10) return 100; // Excellent
    if (minutes <= 30) return 80;  // Good
    if (minutes <= 60) return 60;  // Average
    return 20; // Poor (> 1 hour)
  };

  // Sentiment Analysis (simplified)
  const getSentimentScore = (message: string): number => {
    const positiveWords = ['thank', 'great', 'perfect', 'excellent', 'wonderful', 'amazing', 'helpful', 'appreciate'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'angry', 'frustrated'];
    
    const lowerMessage = message.toLowerCase();
    let score = 50; // neutral baseline
    
    positiveWords.forEach(word => {
      if (lowerMessage.includes(word)) score += 10;
    });
    
    negativeWords.forEach(word => {
      if (lowerMessage.includes(word)) score -= 15;
    });
    
    return Math.max(0, Math.min(100, score));
  };

  // Completeness Check
  const getCompletenessScore = (message: string): number => {
    let score = 0;
    
    // Length check (not too short, not too long)
    if (message.length >= 20 && message.length <= 200) score += 30;
    else if (message.length >= 10 && message.length <= 300) score += 20;
    
    // Question marks indicate questions being asked
    if (message.includes('?')) score += 20;
    
    // Professional greetings/signatures
    const greetings = ['hi', 'hello', 'dear', 'thank you', 'best regards', 'sincerely'];
    const hasGreeting = greetings.some(greeting => message.toLowerCase().includes(greeting));
    if (hasGreeting) score += 20;
    
    // Specific information (numbers, times, locations)
    if (/\d+/.test(message)) score += 15;
    
    // Politeness indicators
    const politeWords = ['please', 'thank you', 'appreciate', 'sorry', 'apologize'];
    const hasPolite = politeWords.some(word => message.toLowerCase().includes(word));
    if (hasPolite) score += 15;
    
    return Math.min(100, score);
  };

  // Grammar Check (simplified)
  const getGrammarScore = (message: string): number => {
    let score = 100;
    
    // Basic checks
    const sentences = message.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > 0) {
        // Check for proper capitalization
        if (!/^[A-Z]/.test(trimmed)) score -= 10;
        
        // Check for excessive punctuation
        if ((trimmed.match(/[!]{2,}/g) || []).length > 0) score -= 5;
        if ((trimmed.match(/[?]{2,}/g) || []).length > 0) score -= 5;
        
        // Check for excessive capitalization
        const capsRatio = (trimmed.match(/[A-Z]/g) || []).length / trimmed.length;
        if (capsRatio > 0.5) score -= 15;
      }
    });
    
    return Math.max(0, score);
  };

  // Template Compliance
  const getTemplateComplianceScore = (message: string): number => {
    let score = 50; // baseline
    
    // Professional templates often include:
    const professionalElements = [
      'thank you for your message',
      'i hope this helps',
      'please let me know',
      'if you have any questions',
      'best regards',
      'sincerely'
    ];
    
    const lowerMessage = message.toLowerCase();
    professionalElements.forEach(element => {
      if (lowerMessage.includes(element)) score += 10;
    });
    
    // Check for company-specific templates
    const companyTemplates = [
      'check-in',
      'check-out',
      'wifi password',
      'key code',
      'parking',
      'amenities'
    ];
    
    companyTemplates.forEach(template => {
      if (lowerMessage.includes(template)) score += 5;
    });
    
    return Math.min(100, score);
  };

  // Overall Quality Assessment
  const assessMessageQuality = useCallback((message: string, responseTimeMs: number): MessageQualityMetrics => {
    const responseTimeScore = getResponseTimeScore(responseTimeMs);
    const sentimentScore = getSentimentScore(message);
    const completenessScore = getCompletenessScore(message);
    const grammarScore = getGrammarScore(message);
    const templateComplianceScore = getTemplateComplianceScore(message);
    
    // Weighted average for overall score
    const overallScore = Math.round(
      (responseTimeScore * 0.3) +
      (sentimentScore * 0.2) +
      (completenessScore * 0.25) +
      (grammarScore * 0.15) +
      (templateComplianceScore * 0.1)
    );
    
    // Determine quality grade
    let qualityGrade: 'excellent' | 'good' | 'average' | 'poor';
    if (overallScore >= 85) qualityGrade = 'excellent';
    else if (overallScore >= 70) qualityGrade = 'good';
    else if (overallScore >= 50) qualityGrade = 'average';
    else qualityGrade = 'poor';
    
    return {
      responseTimeMs,
      responseTimeScore,
      sentimentScore,
      completenessScore,
      grammarScore,
      templateComplianceScore,
      overallScore,
      qualityGrade
    };
  }, []);

  // Record a message with quality metrics
  const recordMessage = useCallback((messageRecord: Omit<MessageRecord, 'qualityMetrics'>) => {
    const qualityMetrics = assessMessageQuality(messageRecord.message, messageRecord.responseTimeMs);
    
    const newRecord: MessageRecord = {
      ...messageRecord,
      qualityMetrics
    };
    
    setMessageRecords(prev => [newRecord, ...prev]);
    setRecentMessages(prev => [newRecord, ...prev.slice(0, 49)]); // Keep last 50 messages
  }, [assessMessageQuality]);

  // Get worker performance
  const getWorkerPerformance = useCallback((workerId: string): WorkerPerformance | undefined => {
    const workerMessages = messageRecords.filter(record => record.workerId === workerId);
    
    if (workerMessages.length === 0) return undefined;
    
    const totalMessages = workerMessages.length;
    const averageResponseTime = workerMessages.reduce((sum, msg) => sum + msg.responseTimeMs, 0) / totalMessages;
    const averageQualityScore = workerMessages.reduce((sum, msg) => sum + msg.qualityMetrics.overallScore, 0) / totalMessages;
    
    const qualityCounts = workerMessages.reduce((counts, msg) => {
      counts[msg.qualityMetrics.qualityGrade]++;
      return counts;
    }, { excellent: 0, good: 0, average: 0, poor: 0 });
    
    const responseRate = 100; // Assuming all messages are responses for now
    
    return {
      workerId,
      workerName: workerMessages[0]?.workerName || 'Unknown',
      role: workerMessages[0]?.workerRole || 'associate',
      totalMessages,
      averageResponseTime,
      averageQualityScore,
      responseRate,
      excellentResponses: qualityCounts.excellent,
      goodResponses: qualityCounts.good,
      averageResponses: qualityCounts.average,
      poorResponses: qualityCounts.poor,
      lastActive: new Date(Math.max(...workerMessages.map(msg => msg.sentAt.getTime())))
    };
  }, [messageRecords]);

  // Get all workers performance
  const getAllWorkersPerformance = useCallback((): WorkerPerformance[] => {
    const workerIds = [...new Set(messageRecords.map(record => record.workerId))];
    return workerIds.map(workerId => getWorkerPerformance(workerId)).filter(Boolean) as WorkerPerformance[];
  }, [messageRecords, getWorkerPerformance]);

  // Get performance by role
  const getRolePerformance = useCallback((role: 'associate' | 'supervisor' | 'manager'): WorkerPerformance[] => 
    getAllWorkersPerformance().filter(worker => worker.role === role), [getAllWorkersPerformance]);

  // Calculate overall performance stats
  const performanceStats = {
    totalMessages: messageRecords.length,
    averageResponseTime: messageRecords.length > 0 
      ? messageRecords.reduce((sum, msg) => sum + msg.responseTimeMs, 0) / messageRecords.length 
      : 0,
    averageQualityScore: messageRecords.length > 0 
      ? messageRecords.reduce((sum, msg) => sum + msg.qualityMetrics.overallScore, 0) / messageRecords.length 
      : 0,
    activeWorkers: new Set(messageRecords.map(record => record.workerId)).size
  };

  // Load sample data for demonstration
  useEffect(() => {
    const sampleMessages: Omit<MessageRecord, 'qualityMetrics'>[] = [
      {
        id: '1',
        conversationId: 'conv-1',
        workerId: 'worker-1',
        workerName: 'Sarah Johnson',
        workerRole: 'associate',
        message: 'Thank you for your message! Yes, early check-in is available. I\'ll send you the key code shortly.',
        sentAt: new Date(Date.now() - 300000), // 5 minutes ago
        responseTimeMs: 8 * 60 * 1000, // 8 minutes
        guestMessage: 'Can we check in early tomorrow?',
        guestMessageTime: new Date(Date.now() - 480000) // 8 minutes ago
      },
      {
        id: '2',
        conversationId: 'conv-2',
        workerId: 'worker-2',
        workerName: 'Mike Wilson',
        workerRole: 'supervisor',
        message: 'Hi! The WiFi password is on the fridge. Let me know if you need anything else.',
        sentAt: new Date(Date.now() - 600000), // 10 minutes ago
        responseTimeMs: 15 * 60 * 1000, // 15 minutes
        guestMessage: 'What\'s the WiFi password?',
        guestMessageTime: new Date(Date.now() - 900000) // 15 minutes ago
      },
      {
        id: '3',
        conversationId: 'conv-3',
        workerId: 'worker-3',
        workerName: 'Lisa Brown',
        workerRole: 'manager',
        message: 'Perfect! Check-out is at 11 AM. Have a great trip!',
        sentAt: new Date(Date.now() - 900000), // 15 minutes ago
        responseTimeMs: 25 * 60 * 1000, // 25 minutes
        guestMessage: 'What time is check-out?',
        guestMessageTime: new Date(Date.now() - 1500000) // 25 minutes ago
      }
    ];

    sampleMessages.forEach(msg => recordMessage(msg));
  }, [recordMessage]);

  const value: MessageQualityContextType = {
    assessMessageQuality,
    recordMessage,
    getWorkerPerformance,
    getAllWorkersPerformance,
    getRolePerformance,
    recentMessages,
    performanceStats
  };

  return (
    <MessageQualityContext.Provider value={value}>
      {children}
    </MessageQualityContext.Provider>
  );
}

export function useMessageQuality() {
  const context = useContext(MessageQualityContext);
  if (context === undefined) {
    throw new Error('useMessageQuality must be used within a MessageQualityProvider');
  }
  return context;
}
