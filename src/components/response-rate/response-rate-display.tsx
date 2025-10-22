import { Clock, RefreshCw, TrendingUp } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Card,
  Chip,
  Alert,
  Tooltip,
  IconButton,
  Typography,
  CardContent,
  CircularProgress,
} from '@mui/material';

interface ResponseStats {
  totalSent: number;
  totalResponses: number;
  responseRate: number;
  pendingMessages: number;
}

interface ResponseRateDisplayProps {
  conversationId: string;
  sx?: any;
}

export function ResponseRateDisplay({ conversationId, sx }: ResponseRateDisplayProps) {
  const [stats, setStats] = useState<ResponseStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:3001/api/response-stats/${conversationId}`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
        setLastUpdated(new Date());
      } else {
        setError(data.message || 'Failed to fetch response stats');
      }
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Cannot connect to server. Make sure the Socket.IO server is running on port 3001.');
      } else {
        setError('Failed to fetch response statistics');
      }
      console.error('Error fetching response stats:', err);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [conversationId, fetchStats]);

  const getResponseRateColor = (rate: number) => {
    if (rate >= 80) return 'success';
    if (rate >= 60) return 'warning';
    return 'error';
  };

  const getResponseRateLabel = (rate: number) => {
    if (rate >= 80) return 'Excellent';
    if (rate >= 60) return 'Good';
    if (rate >= 40) return 'Fair';
    return 'Poor';
  };

  if (loading && !stats) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, ...sx }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        action={
          <IconButton size="small" onClick={fetchStats}>
            <RefreshCw size={16} />
          </IconButton>
        }
        sx={sx}
      >
        {error}
      </Alert>
    );
  }

  if (!stats) {
    return (
      <Card sx={{ ...sx }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 2 }}>
            Response Rate
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            No data available yet. Send some messages to see response statistics.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
            Response Rate
          </Typography>
          <Tooltip title="Refresh stats">
            <IconButton size="small" onClick={fetchStats} disabled={loading}>
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp size={20} />
            <Typography variant="h4" sx={{ fontSize: '1.8rem', fontWeight: 700 }}>
              {stats.responseRate.toFixed(1)}%
            </Typography>
          </Box>
          
          <Chip 
            label={getResponseRateLabel(stats.responseRate)}
            color={getResponseRateColor(stats.responseRate)}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Responses: {stats.totalResponses}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: {stats.totalSent}
          </Typography>
        </Box>

        {stats.pendingMessages > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Clock size={14} />
            <Typography variant="caption" color="warning.main">
              {stats.pendingMessages} pending response{stats.pendingMessages !== 1 ? 's' : ''}
            </Typography>
          </Box>
        )}

        {lastUpdated && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
