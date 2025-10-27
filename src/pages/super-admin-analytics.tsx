import React, { useState } from 'react';
import {
  Activity,
  Award,
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';

import { DashboardContent } from 'src/layouts/dashboard';
import { useHostaway } from 'src/contexts/hostaway-context';
import { useMessageQuality } from 'src/contexts/message-quality-context';

import { Chart, useChart } from 'src/components/chart';
import { ResponseTimeIndicator } from 'src/components/quality-indicator';

// ----------------------------------------------------------------------

interface WorkerDetailViewProps {
  worker: any;
  onBack: () => void;
}

function WorkerDetailView({ worker, onBack }: WorkerDetailViewProps) {
  const theme = useTheme();
  const { recentMessages, getAllWorkersPerformance } = useMessageQuality();
  const { properties: hostawayProperties, guests: hostawayGuests, reservations } = useHostaway();
  
  // Dummy data for properties and clients
  const dummyProperties = [
    { id: 1, name: 'Sunset Beach Villa', city: 'Miami', country: 'USA', type: 'Villa', status: 'Active' },
    { id: 2, name: 'Downtown Luxury Apartment', city: 'New York', country: 'USA', type: 'Apartment', status: 'Active' },
    { id: 3, name: 'Mountain View Cabin', city: 'Aspen', country: 'USA', type: 'Cabin', status: 'Active' },
    { id: 4, name: 'Oceanfront Condo', city: 'San Diego', country: 'USA', type: 'Condo', status: 'Active' },
    { id: 5, name: 'Urban Loft', city: 'San Francisco', country: 'USA', type: 'Loft', status: 'Active' },
  ];
  
  const dummyGuests = [
    { id: 1, firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phone: '+1-555-0123', country: 'USA' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@example.com', phone: '+1-555-0456', country: 'Canada' },
    { id: 3, firstName: 'Michael', lastName: 'Brown', email: 'm.brown@example.com', phone: '+1-555-0789', country: 'USA' },
    { id: 4, firstName: 'Emma', lastName: 'Davis', email: 'emma.davis@example.com', phone: '+1-555-0321', country: 'UK' },
    { id: 5, firstName: 'David', lastName: 'Wilson', email: 'd.wilson@example.com', phone: '+1-555-0654', country: 'Australia' },
  ];
  
  // Use actual data if available, otherwise use dummy data
  const properties = hostawayProperties.length > 0 ? hostawayProperties : dummyProperties;
  const guests = hostawayGuests.length > 0 ? hostawayGuests : dummyGuests;
  
  // Get this worker's messages
  const workerMessages = recentMessages.filter(msg => msg.workerId === worker.workerId);
  
  // Group messages by conversation
  const conversationGroups = workerMessages.reduce((acc, msg) => {
    if (!acc[msg.conversationId]) {
      acc[msg.conversationId] = [];
    }
    acc[msg.conversationId].push(msg);
    return acc;
  }, {} as Record<string, typeof workerMessages>);
  
  const conversations = Object.entries(conversationGroups).map(([conversationId, messages]) => ({
    conversationId,
    messages,
    lastMessage: messages[0], // Most recent
    totalMessages: messages.length
  })).sort((a, b) => 
    b.lastMessage.sentAt.getTime() - a.lastMessage.sentAt.getTime()
  );
  
  // Get team members (for supervisors and managers)
  const allWorkers = getAllWorkersPerformance();
  const teamMembers = worker.role === 'manager' 
    ? allWorkers.filter(w => w.role === 'supervisor' || w.role === 'associate')
    : worker.role === 'supervisor'
    ? allWorkers.filter(w => w.role === 'associate')
    : [];
  
  // Generate performance data for the past 7 days
  const getDaysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };
  
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = getDaysAgo(6 - i);
    const dayMessages = workerMessages.filter(msg => {
      const msgDate = new Date(msg.sentAt);
      return msgDate.toDateString() === date.toDateString();
    });
    
    const avgQuality = dayMessages.length > 0
      ? Math.round(dayMessages.reduce((sum, m) => sum + m.qualityMetrics.overallScore, 0) / dayMessages.length)
      : 0;
    
    const avgResponseTime = dayMessages.length > 0
      ? Math.round(dayMessages.reduce((sum, m) => sum + m.responseTimeMs, 0) / dayMessages.length / (1000 * 60))
      : 0;
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      messages: dayMessages.length,
      avgQuality,
      avgResponseTime
    };
  });
  
  // Chart options for performance overview
  const performanceChartOptions = useChart({
    colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.success.main],
    xaxis: {
      categories: last7Days.map(d => d.date),
      labels: { style: { fontSize: '12px', fontWeight: 600 } },
    },
    yaxis: [
      {
        title: { text: 'Quality Score (%)', style: { fontSize: '12px', fontWeight: 600 } },
      min: 0,
        max: 100,
    },
      {
        opposite: true,
        title: { text: 'Messages / Response Time (min)', style: { fontSize: '12px', fontWeight: 600 } },
      },
    ],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      fontWeight: 500,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    stroke: {
      width: [3, 2, 2],
      curve: 'smooth',
    },
    markers: {
      size: 5,
    },
  });

  // Calculate detailed performance metrics
  const avgResponseTimeScore = workerMessages.length > 0
    ? Math.round(workerMessages.reduce((sum, m) => sum + m.qualityMetrics.responseTimeScore, 0) / workerMessages.length)
    : 0;
  
  const avgSentimentScore = workerMessages.length > 0
    ? Math.round(workerMessages.reduce((sum, m) => sum + m.qualityMetrics.sentimentScore, 0) / workerMessages.length)
    : 0;
  
  const avgCompletenessScore = workerMessages.length > 0
    ? Math.round(workerMessages.reduce((sum, m) => sum + m.qualityMetrics.completenessScore, 0) / workerMessages.length)
    : 0;
  
  const avgGrammarScore = workerMessages.length > 0
    ? Math.round(workerMessages.reduce((sum, m) => sum + m.qualityMetrics.grammarScore, 0) / workerMessages.length)
    : 0;
  
  const avgTemplateComplianceScore = workerMessages.length > 0
    ? Math.round(workerMessages.reduce((sum, m) => sum + m.qualityMetrics.templateComplianceScore, 0) / workerMessages.length)
    : 0;
  
  const avgDailyMessages = last7Days.reduce((sum, d) => sum + d.messages, 0) / 7;
  const bestDay = last7Days.reduce((max, day) => day.messages > max.messages ? day : max, last7Days[0]);
  
  return (
    <DashboardContent maxWidth="xl">
      {/* Professional Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <IconButton 
            onClick={onBack} 
            sx={{ 
              mr: 1,
              backgroundColor: alpha(theme.palette.grey[500], 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.grey[500], 0.2),
              }
            }}
          >
            ←
          </IconButton>
          <Avatar 
            sx={{ 
              width: 56, 
              height: 56, 
              bgcolor: theme.palette.primary.main,
              fontSize: '1.25rem',
              fontWeight: 700
            }}
          >
            {worker.workerName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {worker.workerName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {worker.role.charAt(0).toUpperCase() + worker.role.slice(1)} • Last active: {worker.lastActive.toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Professional Performance Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Quality Score
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1 }}>
                  <Target size={20} color={theme.palette.success.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {Math.round(worker.averageQualityScore)}%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle size={16} color={theme.palette.success.main} />
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                  {worker.averageQualityScore >= 80 ? 'Excellent' : 
                   worker.averageQualityScore >= 60 ? 'Good' : 'Needs Improvement'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Avg Response Time
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 1 }}>
                  <Clock size={20} color={theme.palette.warning.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {Math.round(worker.averageResponseTime / (1000 * 60))}m
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Zap size={16} color={theme.palette.warning.main} />
                <Typography variant="caption" color="warning.main" sx={{ fontWeight: 600 }}>
                  {worker.averageResponseTime < 600000 ? 'Fast' : 
                   worker.averageResponseTime < 1800000 ? 'Good' : 'Slow'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Messages
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 1 }}>
                  <MessageSquare size={20} color={theme.palette.info.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'info.main', mb: 1 }}>
                {worker.totalMessages}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Activity size={16} color={theme.palette.info.main} />
                <Typography variant="caption" color="info.main" sx={{ fontWeight: 600 }}>
                  Active Worker
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Quality Rate
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 1 }}>
                  <Award size={20} color={theme.palette.primary.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {Math.round(((worker.excellentResponses + worker.goodResponses) / worker.totalMessages) * 100)}%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp size={16} color={theme.palette.primary.main} />
                <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                  {worker.excellentResponses + worker.goodResponses} quality messages
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Breakdown Chart - Line & Bar Combination */}
      <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarChart size={20} color={theme.palette.primary.main} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Performance Breakdown
              </Typography>
            </Box>
          }
          subheader="Detailed quality metrics across different categories"
        />
        <CardContent sx={{ p: 3 }}>
          <Chart
            type="bar"
            series={[
              {
                name: 'Performance Score (%)',
                type: 'column',
                data: [
                  { x: 'Response Time', y: avgResponseTimeScore, fillColor: theme.palette.primary.main },
                  { x: 'Sentiment', y: avgSentimentScore, fillColor: theme.palette.success.main },
                  { x: 'Completeness', y: avgCompletenessScore, fillColor: theme.palette.info.main },
                  { x: 'Grammar', y: avgGrammarScore, fillColor: theme.palette.warning.main },
                  { x: 'Template', y: avgTemplateComplianceScore, fillColor: theme.palette.secondary.main },
                ],
              },
              {
                name: 'Target (80%)',
                type: 'line',
                data: [
                  { x: 'Response Time', y: 80 },
                  { x: 'Sentiment', y: 80 },
                  { x: 'Completeness', y: 80 },
                  { x: 'Grammar', y: 80 },
                  { x: 'Template', y: 80 },
                ],
              },
            ]}
            options={{
              colors: [
                theme.palette.primary.main,
                theme.palette.success.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.secondary.main,
                theme.palette.grey[400],
              ],
              xaxis: {
                categories: ['Response Time', 'Sentiment', 'Completeness', 'Grammar', 'Template'],
                labels: {
                  style: {
                    fontSize: '13px',
                    fontWeight: 600,
                  },
                  rotate: -15,
                },
              },
              yaxis: {
                title: {
                  text: 'Performance Score (%)',
                  style: {
                    fontSize: '13px',
                    fontWeight: 600,
                  },
                },
                min: 0,
                max: 100,
                tickAmount: 5,
                labels: {
                  style: {
                    fontSize: '12px',
                    fontWeight: 500,
                  },
                  formatter: (value: number) => `${value}%`,
                },
              },
              legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '13px',
                fontWeight: 600,
                labels: {
                  colors: [theme.palette.text.primary],
                },
                markers: {
                  size: 12,
                  strokeWidth: 2,
                },
              },
              tooltip: {
                shared: true,
                intersect: false,
                style: {
                  fontSize: '12px',
                },
                y: {
                  formatter: (value: number) => `${value}%`,
                },
                custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                  const metricNames = ['Response Time', 'Sentiment', 'Completeness', 'Grammar', 'Template Compliance'];
                  const currentMetric = metricNames[dataPointIndex];
                  const actualScore = series[0][dataPointIndex];
                  const targetScore = series[1][dataPointIndex];
                  
                  return `
                    <div style="padding: 8px; background: white; border-radius: 6px;">
                      <div style="font-weight: 600; margin-bottom: 4px; font-size: 13px;">${currentMetric}</div>
                      <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                        <span style="color: ${theme.palette.text.secondary};">Actual:</span>
                        <span style="font-weight: 600;">${actualScore}%</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; margin-top: 2px;">
                        <span style="color: ${theme.palette.text.secondary};">Target:</span>
                        <span style="font-weight: 600;">${targetScore}%</span>
                      </div>
                      <div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid #eee; font-size: 11px; color: ${theme.palette.text.secondary};">
                        ${actualScore >= targetScore ? '✓ Meeting target' : '⚠ Below target'}
                      </div>
                    </div>
                  `;
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '60%',
                  borderRadius: 6,
                  borderRadiusApplication: 'end',
                  colors: {
                    ranges: [
                      { from: 0, to: 100, color: theme.palette.primary.main },
                    ],
                  },
                },
              },
              stroke: {
                curve: 'smooth',
                width: 2,
                dashArray: 5,
              },
              fill: {
                type: 'solid',
                opacity: [0.85, 1],
              },
              dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                  fontSize: '11px',
                  fontWeight: 700,
                  colors: [theme.palette.text.primary],
                },
                formatter: (val: number, opts: any) => {
                  // Only show labels on bars, not line
                  if (opts.seriesIndex === 0) {
                    return `${val}%`;
                  }
                  return '';
                },
                background: {
                  enabled: false,
                },
                dropShadow: {
                  enabled: true,
                  top: 1,
                  left: 1,
                  blur: 1,
                  opacity: 0.35,
                },
              },
              grid: {
                strokeDashArray: 3,
                borderColor: alpha(theme.palette.divider, 0.8),
                xaxis: {
                  lines: {
                    show: false,
                  },
                },
                yaxis: {
                  lines: {
                    show: true,
                  },
                },
              },
              chart: {
                toolbar: {
                  show: false,
                },
              },
            }}
            sx={{ height: 450 }}
          />
          
          {/* Chart Explanation */}
          <Box sx={{ mt: 3, p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2, border: `1px solid ${alpha(theme.palette.info.main, 0.2)}` }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'info.main' }}>
              📊 Chart Explanation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Bar Chart:</strong> Shows your actual performance scores across 5 key quality metrics
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Dashed Line:</strong> The 80% target to aim for in all categories
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Colors:</strong> Each metric has its own color - Response Time (Blue), Sentiment (Green), Completeness (Teal), Grammar (Orange), Template (Purple)
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Properties & Clients Assigned (for Associates) */}
      {worker.role === 'associate' && (
        <>
          {/* Assigned Properties */}
          <Card sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calendar size={20} color={theme.palette.primary.main} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Assigned Properties
                  </Typography>
                </Box>
              }
              subheader={`${properties.length} properties available to manage`}
            />
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: alpha(theme.palette.grey[500], 0.04) }}>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Property</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {properties.slice(0, 10).map((property) => (
                      <TableRow 
                        key={property.id}
                        hover
                        sx={{ 
                          '&:nth-of-type(even)': { 
                            backgroundColor: alpha(theme.palette.grey[500], 0.02) 
                          },
                        }}
                      >
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {property.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {property.city}, {property.country}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={property.type || 'Apartment'} 
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={property.status || 'Active'} 
                            size="small"
                            color={property.status === 'Active' ? 'success' : 'default'}
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Clients (Guests) */}
          <Card sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Users size={20} color={theme.palette.primary.main} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Recent Clients
                  </Typography>
                </Box>
              }
              subheader={`${guests.length} guests in the system`}
            />
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: alpha(theme.palette.grey[500], 0.04) }}>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Guest</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Phone</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Country</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Reservations</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {guests.slice(0, 10).map((guest) => {
                      const guestReservations = reservations.length > 0 
                        ? reservations.filter(r => r.guestEmail === guest.email)
                        : Array(Math.floor(Math.random() * 5) + 1);
                      return (
                        <TableRow 
                          key={guest.id}
                          hover
                          sx={{ 
                            '&:nth-of-type(even)': { 
                              backgroundColor: alpha(theme.palette.grey[500], 0.02) 
                            },
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar 
                                sx={{ 
                                  width: 36, 
                                  height: 36,
                                  bgcolor: theme.palette.primary.main,
                                  fontWeight: 600,
                                  fontSize: '0.9rem',
                                }}
                              >
                                {guest.firstName.charAt(0)}
                              </Avatar>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {guest.firstName} {guest.lastName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {guest.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {guest.phone || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={guest.country} 
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={guestReservations.length} 
                              size="small"
                              color="primary"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Team Members (for Supervisors and Managers) */}
      {teamMembers.length > 0 && (
        <Card sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Users size={20} color={theme.palette.primary.main} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Team Members ({teamMembers.length})
                </Typography>
              </Box>
            }
            subheader={`${worker.role.charAt(0).toUpperCase() + worker.role.slice(1)} oversees ${teamMembers.length} team member${teamMembers.length !== 1 ? 's' : ''}`}
          />
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: alpha(theme.palette.grey[500], 0.04) }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Team Member</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Messages</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Quality Score</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Response Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow 
                      key={member.workerId}
                      hover
                      sx={{ 
                        '&:nth-of-type(even)': { 
                          backgroundColor: alpha(theme.palette.grey[500], 0.02) 
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              width: 40, 
                              height: 40,
                              bgcolor: theme.palette.primary.main,
                              fontWeight: 600,
                            }}
                          >
                            {member.workerName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {member.workerName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Last active: {member.lastActive.toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          size="small"
                          color={
                            member.role === 'supervisor' ? 'secondary' : 'primary'
                          }
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {member.totalMessages}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={member.averageQualityScore} 
                            sx={{ 
                              width: 60,
                              height: 6, 
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.grey[300], 0.3),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: member.averageQualityScore >= 80 ? theme.palette.success.main :
                                        member.averageQualityScore >= 60 ? theme.palette.warning.main : theme.palette.error.main,
                              },
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 35 }}>
                            {Math.round(member.averageQualityScore)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {Math.round(member.averageResponseTime / (1000 * 60))}m
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </DashboardContent>
  );
}

export function SuperAdminAnalyticsPage() {
  const theme = useTheme();
  const { getAllWorkersPerformance, getRolePerformance, performanceStats } = useMessageQuality();
  const [selectedRole, setSelectedRole] = useState<'associate' | 'supervisor' | 'manager' | 'all'>('all');
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  const allWorkers = getAllWorkersPerformance();
  const associates = getRolePerformance('associate');
  const supervisors = getRolePerformance('supervisor');
  const managers = getRolePerformance('manager');

  const getCurrentWorkers = () => {
    switch (selectedRole) {
      case 'associate': return associates;
      case 'supervisor': return supervisors;
      case 'manager': return managers;
      default: return allWorkers;
    }
  };

  const currentWorkers = getCurrentWorkers();

  // Calculate performance metrics
  const totalWorkers = allWorkers.length;
  const avgResponseTime = Math.round(performanceStats.averageResponseTime / (1000 * 60));
  const avgQualityScore = Math.round(performanceStats.averageQualityScore);
  const totalMessages = performanceStats.totalMessages;

  // Calculate quality distribution
  const qualityDistribution = allWorkers.reduce((acc, worker) => {
    acc.excellent += worker.excellentResponses;
    acc.good += worker.goodResponses;
    acc.average += worker.averageResponses;
    acc.poor += worker.poorResponses;
    return acc;
  }, { excellent: 0, good: 0, average: 0, poor: 0 });

  const totalQualityResponses = qualityDistribution.excellent + qualityDistribution.good + 
                               qualityDistribution.average + qualityDistribution.poor;

  // Chart options
  const qualityDistributionChartOptions = useChart({
    colors: ['#4caf50', '#8bc34a', '#ff9800', '#f44336'],
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 500,
      markers: {
        size: 12,
      },
      itemMargin: {
        horizontal: 12,
        vertical: 8,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Responses',
              fontSize: '16px',
              fontWeight: 600,
              color: theme.palette.text.primary,
              formatter: () => totalQualityResponses.toLocaleString(),
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: theme.palette.text.primary,
              formatter: (val: string) => val,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value: number, { seriesIndex }: any) => {
          const labels = ['Excellent', 'Good', 'Average', 'Poor'];
          const percentage = Math.round((value / totalQualityResponses) * 100);
          return `${labels[seriesIndex]}: ${value} (${percentage}%)`;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  const rolePerformanceChartOptions = useChart({
    colors: [theme.palette.primary.main, theme.palette.warning.main],
    xaxis: {
      categories: ['Associates', 'Supervisors', 'Managers'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: [
      {
        title: {
          text: 'Quality Score (%)',
          style: {
            fontSize: '12px',
            fontWeight: 600,
          },
        },
        min: 0,
        max: 100,
      },
      {
        opposite: true,
        title: {
          text: 'Response Time (min)',
          style: {
            fontSize: '12px',
            fontWeight: 600,
          },
        },
      },
    ],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      fontWeight: 500,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (value: number) => `${value}%`,
          title: {
            formatter: () => 'Quality Score: ',
          },
        },
        {
          formatter: (value: number) => `${value} min`,
          title: {
            formatter: () => 'Response Time: ',
          },
        },
      ],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  const responseTimeTrendsChartOptions = useChart({
    colors: [theme.palette.primary.main, theme.palette.error.main],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Response Time (minutes)',
        style: {
          fontSize: '12px',
          fontWeight: 600,
        },
      },
      min: 0,
      max: 30,
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      fontWeight: 500,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} min`,
      },
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    markers: {
      size: 6,
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
  });

  if (selectedWorker) {
    return <WorkerDetailView worker={selectedWorker} onBack={() => setSelectedWorker(null)} />;
  }

  return (
    <DashboardContent maxWidth="xl">
      {/* Professional Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              Performance Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor team performance and message quality metrics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Timeframe:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['daily', 'weekly', 'monthly'].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  sx={{ 
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    minWidth: 80
                  }}
                >
                  {timeframe}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Professional Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Messages
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 1 }}>
                  <MessageSquare size={20} color={theme.palette.primary.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                {totalMessages.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp size={16} color={theme.palette.success.main} />
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Avg Quality Score
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1 }}>
                  <Target size={20} color={theme.palette.success.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {avgQualityScore}%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle size={16} color={theme.palette.success.main} />
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                  Excellent performance
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Avg Response Time
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 1 }}>
                  <Clock size={20} color={theme.palette.warning.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {avgResponseTime}m
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Zap size={16} color={theme.palette.warning.main} />
                <Typography variant="caption" color="warning.main" sx={{ fontWeight: 600 }}>
                  Fast response time
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Active Workers
                </Typography>
                <Box sx={{ p: 1, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 1 }}>
                  <Users size={20} color={theme.palette.info.main} />
                </Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'info.main', mb: 1 }}>
                {totalWorkers}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Activity size={16} color={theme.palette.info.main} />
                <Typography variant="caption" color="info.main" sx={{ fontWeight: 600 }}>
                  All systems active
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Professional Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Quality Distribution Donut Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Message Quality Distribution
                </Typography>
              }
              subheader="Quality breakdown by response type"
            />
            <CardContent sx={{ p: 3 }}>
              <Chart
                type="donut"
                series={[
                  qualityDistribution.excellent,
                  qualityDistribution.good,
                  qualityDistribution.average,
                  qualityDistribution.poor
                ]}
                options={qualityDistributionChartOptions}
                sx={{ height: 400 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Role Performance Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Role Performance Overview
                </Typography>
              }
              subheader="Performance metrics by team role"
            />
            <CardContent sx={{ p: 3 }}>
              <Chart
                type="bar"
                series={[
                  {
                    name: 'Average Quality Score',
                    data: [
                      associates.length > 0 ? Math.round(associates.reduce((sum, w) => sum + w.averageQualityScore, 0) / associates.length) : 0,
                      supervisors.length > 0 ? Math.round(supervisors.reduce((sum, w) => sum + w.averageQualityScore, 0) / supervisors.length) : 0,
                      managers.length > 0 ? Math.round(managers.reduce((sum, w) => sum + w.averageQualityScore, 0) / managers.length) : 0,
                    ]
                  },
                  {
                    name: 'Average Response Time (min)',
                    data: [
                      associates.length > 0 ? Math.round(associates.reduce((sum, w) => sum + w.averageResponseTime, 0) / associates.length / (1000 * 60)) : 0,
                      supervisors.length > 0 ? Math.round(supervisors.reduce((sum, w) => sum + w.averageResponseTime, 0) / supervisors.length / (1000 * 60)) : 0,
                      managers.length > 0 ? Math.round(managers.reduce((sum, w) => sum + w.averageResponseTime, 0) / managers.length / (1000 * 60)) : 0,
                    ]
                  }
                ]}
                options={rolePerformanceChartOptions}
                sx={{ height: 400 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Response Time Trends Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Response Time Trends
                </Typography>
              }
              subheader="Daily response time performance over the last 7 days"
            />
            <CardContent sx={{ p: 3 }}>
              <Chart
                type="line"
                series={[
                  {
                    name: 'Average Response Time (min)',
                    data: [12, 15, 18, 14, 16, 13, 11], // Mock data for last 7 days
                  },
                  {
                    name: 'Target Response Time (min)',
                    data: [15, 15, 15, 15, 15, 15, 15], // Target line
                  }
                ]}
                options={responseTimeTrendsChartOptions}
                sx={{ height: 350 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Professional Worker Performance Table */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Worker Performance Details
            </Typography>
          }
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { key: 'all', label: 'All Workers' },
                { key: 'associate', label: 'Associates' },
                { key: 'supervisor', label: 'Supervisors' },
                { key: 'manager', label: 'Managers' },
              ].map((role) => (
                <Button
                  key={role.key}
                  variant={selectedRole === role.key ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedRole(role.key as any)}
                  sx={{ 
                    fontWeight: 600,
                    textTransform: 'none',
                    minWidth: 100
                  }}
                >
                  {role.label}
                </Button>
              ))}
            </Box>
          }
        />
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: alpha(theme.palette.grey[500], 0.04) }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Worker</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Quality Score</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Response Time</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Messages</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Quality Breakdown</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentWorkers.map((worker, index) => (
                  <TableRow 
                    key={worker.workerId} 
                    hover
                    sx={{ 
                      '&:nth-of-type(even)': { 
                        backgroundColor: alpha(theme.palette.grey[500], 0.02) 
                      },
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      }
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40,
                            bgcolor: theme.palette.primary.main,
                            fontWeight: 600,
                            fontSize: '1rem'
                          }}
                        >
                          {worker.workerName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {worker.workerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last active: {worker.lastActive.toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip 
                        label={worker.role.charAt(0).toUpperCase() + worker.role.slice(1)} 
                        size="small" 
                        color={
                          worker.role === 'manager' ? 'success' :
                          worker.role === 'supervisor' ? 'secondary' : 'primary'
                        }
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 80 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={worker.averageQualityScore} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: alpha(theme.palette.grey[300], 0.3),
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: worker.averageQualityScore >= 80 ? theme.palette.success.main :
                                                worker.averageQualityScore >= 60 ? theme.palette.warning.main : theme.palette.error.main,
                              },
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                          {Math.round(worker.averageQualityScore)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <ResponseTimeIndicator 
                        responseTimeMs={worker.averageResponseTime} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {worker.totalMessages}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        <Chip 
                          label={worker.excellentResponses} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#4caf50', 
                            color: 'white', 
                            fontSize: '0.7rem', 
                            height: 24,
                            fontWeight: 600
                          }}
                        />
                        <Chip 
                          label={worker.goodResponses} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#8bc34a', 
                            color: 'white', 
                            fontSize: '0.7rem', 
                            height: 24,
                            fontWeight: 600
                          }}
                        />
                        <Chip 
                          label={worker.averageResponses} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#ff9800', 
                            color: 'white', 
                            fontSize: '0.7rem', 
                            height: 24,
                            fontWeight: 600
                          }}
                        />
                        <Chip 
                          label={worker.poorResponses} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#f44336', 
                            color: 'white', 
                            fontSize: '0.7rem', 
                            height: 24,
                            fontWeight: 600
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => setSelectedWorker(worker)}
                        sx={{ 
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            borderColor: theme.palette.primary.main,
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </DashboardContent>
  );
}
