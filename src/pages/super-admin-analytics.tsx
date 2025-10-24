import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Award,
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
  
  // Chart options for worker detail view
  const workerQualityChartOptions = useChart({
    colors: ['#4caf50', '#8bc34a', '#ff9800', '#f44336'],
    xaxis: {
      categories: ['Excellent', 'Good', 'Average', 'Poor'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Responses',
        style: {
          fontSize: '12px',
          fontWeight: 600,
        },
      },
      min: 0,
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} responses`,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontWeight: 600,
        colors: ['#4caf50', '#8bc34a', '#ff9800', '#f44336'],
      },
      formatter: (val: number) => val.toString(),
    },
  });
  
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

      {/* Professional Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Quality Breakdown Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Quality Breakdown
                </Typography>
              }
              subheader="Detailed performance metrics"
            />
            <CardContent sx={{ p: 3 }}>
              <Chart
                type="bar"
                series={[
                  {
                    name: 'Response Count',
                    data: [
                      worker.excellentResponses,
                      worker.goodResponses,
                      worker.averageResponses,
                      worker.poorResponses
                    ]
                  }
                ]}
                options={workerQualityChartOptions}
                sx={{ height: 350 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Insights */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Performance Insights
                </Typography>
              }
            />
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.success.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CheckCircle size={16} color={theme.palette.success.main} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                      Strengths
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {worker.averageQualityScore >= 80 ? 'Consistently high quality responses' :
                     worker.averageQualityScore >= 60 ? 'Good overall performance' : 'Room for improvement'}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.warning.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AlertTriangle size={16} color={theme.palette.warning.main} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                      Areas for Improvement
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {worker.averageResponseTime > 1800000 ? 'Response time could be faster' :
                     worker.averageQualityScore < 70 ? 'Focus on message quality' : 'Maintain current performance'}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.info.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TrendingUp size={16} color={theme.palette.info.main} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'info.main' }}>
                      Recommendations
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {worker.averageQualityScore >= 80 && worker.averageResponseTime < 900000 ? 
                      'Excellent performance! Consider mentoring others.' :
                      'Continue focusing on quality and response time balance.'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
