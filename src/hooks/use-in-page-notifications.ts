import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  body: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export function useInPageNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((
    title: string,
    body: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    duration: number = 5000
  ) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    setNotifications((prev) => [...prev, { id, title, body, type, duration }]);
    
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    showNotification,
    removeNotification,
    notifications,
  };
}
