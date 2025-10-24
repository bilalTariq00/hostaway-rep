import type { MessageQualityMetrics } from 'src/contexts/message-quality-context';

import React from 'react';
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

interface QualityIndicatorProps {
  qualityMetrics: MessageQualityMetrics;
  showDetails?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function QualityIndicator({ 
  qualityMetrics, 
  showDetails = false, 
  size = 'medium' 
}: QualityIndicatorProps) {
  const { overallScore, qualityGrade, responseTimeMs } = qualityMetrics;

  // Get color based on quality grade
  const getQualityColor = (grade: string) => {
    switch (grade) {
      case 'excellent': return '#4caf50';
      case 'good': return '#8bc34a';
      case 'average': return '#ff9800';
      case 'poor': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  // Get icon based on quality grade
  const getQualityIcon = (grade: string) => {
    switch (grade) {
      case 'excellent': return <CheckCircle size={16} />;
      case 'good': return <TrendingUp size={16} />;
      case 'average': return <AlertCircle size={16} />;
      case 'poor': return <Clock size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  // Format response time
  const formatResponseTime = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  // Get size-specific styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          chipHeight: 20,
          fontSize: '0.7rem',
          iconSize: 12
        };
      case 'large':
        return {
          chipHeight: 32,
          fontSize: '0.9rem',
          iconSize: 20
        };
      default: // medium
        return {
          chipHeight: 24,
          fontSize: '0.8rem',
          iconSize: 16
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const qualityContent = (
    <Chip
      icon={getQualityIcon(qualityGrade)}
      label={`${overallScore}%`}
      size="small"
      sx={{
        height: sizeStyles.chipHeight,
        fontSize: sizeStyles.fontSize,
        backgroundColor: getQualityColor(qualityGrade),
        color: 'white',
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: 'white',
          fontSize: sizeStyles.iconSize
        }
      }}
    />
  );

  if (!showDetails) {
    return (
      <Tooltip 
        title={
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Quality Score: {overallScore}% ({qualityGrade})
            </Typography>
            <Typography variant="body2">
              Response Time: {formatResponseTime(responseTimeMs)}
            </Typography>
            <Typography variant="body2">
              Sentiment: {qualityMetrics.sentimentScore}%
            </Typography>
            <Typography variant="body2">
              Completeness: {qualityMetrics.completenessScore}%
            </Typography>
            <Typography variant="body2">
              Grammar: {qualityMetrics.grammarScore}%
            </Typography>
          </Box>
        }
        arrow
      >
        {qualityContent}
      </Tooltip>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {qualityContent}
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Response Time:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {formatResponseTime(responseTimeMs)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Sentiment:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {qualityMetrics.sentimentScore}%
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Completeness:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {qualityMetrics.completenessScore}%
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Grammar:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {qualityMetrics.grammarScore}%
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Template:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {qualityMetrics.templateComplianceScore}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Response Time Indicator Component
interface ResponseTimeIndicatorProps {
  responseTimeMs: number;
  size?: 'small' | 'medium' | 'large';
}

export function ResponseTimeIndicator({ responseTimeMs, size = 'medium' }: ResponseTimeIndicatorProps) {
  const minutes = Math.floor(responseTimeMs / (1000 * 60));
  
  const getTimeGrade = (timeMinutes: number) => {
    if (timeMinutes <= 10) return { grade: 'excellent', color: '#4caf50', label: 'Excellent' };
    if (timeMinutes <= 30) return { grade: 'good', color: '#8bc34a', label: 'Good' };
    if (timeMinutes <= 60) return { grade: 'average', color: '#ff9800', label: 'Average' };
    return { grade: 'poor', color: '#f44336', label: 'Poor' };
  };

  const timeGrade = getTimeGrade(minutes);
  const formatTime = minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { height: 20, fontSize: '0.7rem', iconSize: 12 };
      case 'large':
        return { height: 32, fontSize: '0.9rem', iconSize: 20 };
      default:
        return { height: 24, fontSize: '0.8rem', iconSize: 16 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Tooltip title={`Response Time: ${formatTime} (${timeGrade.label})`} arrow>
      <Chip
        icon={<Clock size={sizeStyles.iconSize} />}
        label={formatTime}
        size="small"
        sx={{
          height: sizeStyles.height,
          fontSize: sizeStyles.fontSize,
          backgroundColor: timeGrade.color,
          color: 'white',
          fontWeight: 600,
          '& .MuiChip-icon': {
            color: 'white',
            fontSize: sizeStyles.iconSize
          }
        }}
      />
    </Tooltip>
  );
}
