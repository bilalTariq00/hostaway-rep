import React, { useState, useEffect } from 'react';
import { Star, Clock, Users, MapPin, Target, Building2, TrendingUp } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { DashboardContent } from 'src/layouts/dashboard';
import { useRatings } from 'src/contexts/ratings-context';
import { useAuth, type User } from 'src/contexts/auth-context';
import { useNotifications } from 'src/contexts/notification-context';
import { useMessageQuality } from 'src/contexts/message-quality-context';

// Client interface
interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  status?: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

// Property interface
interface Property {
  id: string;
  name: string;
  location: string;
  clientId: string;
}

export function SupervisorDashboardPage() {
  const theme = useTheme();
  const { user } = useAuth();
  const { getAllWorkersPerformance } = useMessageQuality();
  const { addRating } = useRatings();
  const { sendPerformanceWarning } = useNotifications();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const [assignedClients, setAssignedClients] = useState<Client[]>([]);
  const [assignedProperties, setAssignedProperties] = useState<Property[]>([]);

  const handleRatingClick = (workerId: string, workerName: string, starValue: number) => {
    setRatings((prev) => ({ ...prev, [workerId]: starValue }));
    if (user) {
      addRating({
        workerId,
        workerName,
        ratedBy: user.id,
        ratedByName: user.name,
        rating: starValue,
        feedback: feedback[workerId],
      });
    }
  };

  const handleFeedbackChange = (workerId: string, value: string, workerName: string) => {
    setFeedback((prev) => ({ ...prev, [workerId]: value }));
    if (user && ratings[workerId]) {
      addRating({
        workerId,
        workerName,
        ratedBy: user.id,
        ratedByName: user.name,
        rating: ratings[workerId],
        feedback: value,
      });
    }
  };

  useEffect(() => {
    if (user?.assignedUsers) {
      // Load assigned users
      const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
      const users = createdUsers.filter((u: User) => user.assignedUsers?.includes(u.id));
      setAssignedUsers(users);

      // Load clients and properties from assigned users
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      const properties = [
        {
          id: '305034',
          name: 'La Dimora Del Cavaliere',
          location: 'Anguillara Sabazia, Italy',
          clientId: 'client1',
        },
        { id: '305035', name: 'Navigli', location: 'Milano, Italy', clientId: 'client1' },
        { id: '305225', name: 'Polacchi42', location: 'Roma, Italy', clientId: 'client2' },
        {
          id: '305421',
          name: 'Superattico - Via Del Corso 43',
          location: 'Roma, Italy',
          clientId: 'client2',
        },
        {
          id: '306532',
          name: 'Montecatini Terme',
          location: 'Montecatini Terme, Italy',
          clientId: 'client3',
        },
        { id: '306533', name: 'Tuscany Villa', location: 'Florence, Italy', clientId: 'client3' },
        { id: '306534', name: 'Coastal Retreat', location: 'Amalfi, Italy', clientId: 'client4' },
      ];

      // Get unique clients from assigned users
      const userClientIds = new Set<string>();
      users.forEach((u: User) => {
        u.assignedClients?.forEach((clientId) => userClientIds.add(clientId));
      });

      const userClients = clients.filter((c: Client) => userClientIds.has(c.id));
      setAssignedClients(userClients);

      // Get properties from assigned clients
      const userPropertyIds = new Set<string>();
      users.forEach((u: User) => {
        u.assignedProperties?.forEach((propertyId) => userPropertyIds.add(propertyId));
      });

      const userProperties = properties.filter((p: Property) => userPropertyIds.has(p.id));
      setAssignedProperties(userProperties);
    }
  }, [user]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'suspended':
        return 'Suspended';
      default:
        return 'Active';
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Supervisor Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back, {user?.name}! Here&apos;s an overview of your assigned resources and team
          performance.
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Users size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">{assignedUsers.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assigned Associates
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Building2 size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">{assignedClients.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Managed Clients
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <MapPin size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">{assignedProperties.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Properties
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <TrendingUp size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">94%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Response Rate
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Assigned Associates */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Assigned Associates" />
            <CardContent>
              {assignedUsers.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  No associates assigned yet
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {assignedUsers.map((associate) => (
                    <Box key={associate.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: associate.avatar ? 'transparent' : 'primary.main',
                          backgroundImage: associate.avatar ? `url(${associate.avatar})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        {!associate.avatar && associate.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{associate.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {associate.email}
                        </Typography>
                      </Box>
                      <Chip
                        label={getStatusLabel(associate.status)}
                        color={getStatusColor(associate.status) as any}
                        size="small"
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Managed Clients */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Managed Clients" />
            <CardContent>
              {assignedClients.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  No clients managed yet
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {assignedClients.map((client) => (
                    <Box key={client.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {client.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{client.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {client.email}
                        </Typography>
                      </Box>
                      <Chip
                        label={getStatusLabel(client.status)}
                        color={getStatusColor(client.status) as any}
                        size="small"
                      />
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Properties Overview */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title="Properties Overview" />
            <CardContent>
              {assignedProperties.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  No properties assigned yet
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {assignedProperties.map((property) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={property.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                            <MapPin size={16} color="#666" />
                            <Typography variant="subtitle2" sx={{ flex: 1 }}>
                              {property.name}
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary">
                            {property.location}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                          >
                            ID: {property.id}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Team Performance" />
            <CardContent>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Response Rate</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      94%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={94}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Task Completion</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      87%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={87}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Client Satisfaction</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      92%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={92}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Recent Activity" />
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                    <Clock size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Task completed by John Doe</Typography>
                    <Typography variant="caption" color="text.secondary">
                      2 hours ago
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>
                    <Star size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">New client assigned</Typography>
                    <Typography variant="caption" color="text.secondary">
                      4 hours ago
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                    <TrendingUp size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Performance report generated</Typography>
                    <Typography variant="caption" color="text.secondary">
                      1 day ago
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Overview & Rating */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Target size={20} color={theme.palette.primary.main} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Performance Overview & Rating
                  </Typography>
                </Box>
              }
              subheader="Rate your team members and provide feedback"
            />
            <CardContent sx={{ p: 3 }}>
              {assignedUsers.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', py: 4 }}
                >
                  No team members assigned yet. Contact an administrator to assign associates to your team.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {assignedUsers.map((member) => {
                  // Get performance data for this member
                  const allWorkers = getAllWorkersPerformance();
                  const teamMember = allWorkers.find(w => w.workerName === member.name);
                  
                  if (!teamMember) {
                    // No performance data yet
                    return (
                      <Grid size={{ xs: 12, md: 6 }} key={member.id}>
                        <Card
                          sx={{
                            border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                  sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: theme.palette.primary.main,
                                    fontWeight: 600,
                                  }}
                                >
                                  {member.name.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {member.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {member.email}
                                  </Typography>
                                </Box>
                              </Box>
                              <Chip label="No Data Yet" size="small" color="default" sx={{ fontWeight: 600 }} />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                              No performance data available
                            </Typography>
                            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.grey[500], 0.2)}` }}>
                              <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                                Your Rating
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <IconButton
                                    key={star}
                                    size="small"
                                    onClick={() => handleRatingClick(member.name, member.name, star)}
                                    sx={{
                                      color: ratings[member.name] >= star ? theme.palette.warning.main : theme.palette.grey[400],
                                      '&:hover': {
                                        color: theme.palette.warning.main,
                                      },
                                    }}
                                  >
                                    ★
                                  </IconButton>
                                ))}
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  }

                  const isBelowAverage = teamMember.averageQualityScore < 70;
                  const isAverage = teamMember.averageQualityScore >= 70 && teamMember.averageQualityScore < 80;
                  const isAboveAverage = teamMember.averageQualityScore >= 80;

                  return (
                    <Grid size={{ xs: 12, md: 6 }} key={member.id}>
                      <Card
                        sx={{
                          border: isBelowAverage
                            ? `2px solid ${theme.palette.error.main}`
                            : `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
                          bgcolor: isBelowAverage ? alpha(theme.palette.error.main, 0.05) : 'background.paper',
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  bgcolor: theme.palette.primary.main,
                                  fontWeight: 600,
                                }}
                              >
                                {member.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {member.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {teamMember.totalMessages} messages • Avg: {Math.round(teamMember.averageQualityScore)}%
                                </Typography>
                              </Box>
                            </Box>
                            <Chip
                              label={isAboveAverage ? 'Excellent' : isAverage ? 'Good' : 'Needs Improvement'}
                              size="small"
                              color={isAboveAverage ? 'success' : isAverage ? 'warning' : 'error'}
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>

                          {/* Performance Stats */}
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                Quality Score
                              </Typography>
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {Math.round(teamMember.averageQualityScore)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={teamMember.averageQualityScore}
                              sx={{
                                height: 8,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.grey[300], 0.3),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: isAboveAverage
                                    ? theme.palette.success.main
                                    : isAverage
                                    ? theme.palette.warning.main
                                    : theme.palette.error.main,
                                },
                              }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="caption" color="text.secondary">
                              Response Time: {Math.round(teamMember.averageResponseTime / (1000 * 60))}m
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Messages: {teamMember.totalMessages}
                            </Typography>
                          </Box>

                          {/* Rating Section */}
                          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.grey[500], 0.2)}` }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                              Your Rating
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <IconButton
                                  key={star}
                                  size="small"
                                  onClick={() => handleRatingClick(teamMember.workerId, teamMember.workerName, star)}
                                  sx={{
                                    color: ratings[teamMember.workerId] >= star ? theme.palette.warning.main : theme.palette.grey[400],
                                    '&:hover': {
                                      color: theme.palette.warning.main,
                                    },
                                  }}
                                >
                                  ★
                                </IconButton>
                              ))}
                            </Box>
                          </Box>

                          {/* Notes Section for Below Average Performance */}
                          {isBelowAverage && (
                            <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.error.main, 0.3)}` }}>
                              <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block', color: 'error.main' }}>
                                Improvement Notes (Required)
                              </Typography>
                              <Box sx={{ width: '100%' }}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={2}
                                  placeholder="Add notes for improvement..."
                                  size="small"
                                  value={feedback[teamMember.workerId] || ''}
                                  onChange={(e) => {
                                    handleFeedbackChange(teamMember.workerId, e.target.value, teamMember.workerName);
                                    // Send performance warning notification when feedback is added for below average performance
                                    if (e.target.value && user) {
                                      sendPerformanceWarning(
                                        teamMember.workerId,
                                        user.name,
                                        teamMember.averageQualityScore,
                                        e.target.value
                                      );
                                    }
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      fontSize: '0.875rem',
                                    },
                                  }}
                                />
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
