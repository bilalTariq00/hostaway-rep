import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, Calendar, Building2, CheckCircle, AlertCircle } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import { DashboardContent } from 'src/layouts/dashboard';
import { useAuth, type User } from 'src/contexts/auth-context';

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

export function AssociateDashboardPage() {
  const { user } = useAuth();
  const [assignedClients, setAssignedClients] = useState<Client[]>([]);
  const [assignedProperties, setAssignedProperties] = useState<Property[]>([]);
  const [manager, setManager] = useState<User | null>(null);
  const [supervisor, setSupervisor] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      // Load assigned clients
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      const userClients = clients.filter((c: Client) => user.assignedClients?.includes(c.id));
      setAssignedClients(userClients);

      // Load assigned properties
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

      const userProperties = properties.filter((p: Property) =>
        user.assignedProperties?.includes(p.id)
      );
      setAssignedProperties(userProperties);

      // Load manager and supervisor
      const createdUsers = JSON.parse(localStorage.getItem('createdUsers') || '[]');
      if (user.assignedManager) {
        const managerUser = createdUsers.find((u: User) => u.id === user.assignedManager);
        setManager(managerUser || null);
      }
      if (user.assignedSupervisor) {
        const supervisorUser = createdUsers.find((u: User) => u.id === user.assignedSupervisor);
        setSupervisor(supervisorUser || null);
      }
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
          Associate Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back, {user?.name}! Here&apos;s your assigned clients, properties, and current
          tasks.
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Building2 size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">{assignedClients.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assigned Clients
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
                  <MapPin size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">{assignedProperties.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Properties
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
                  <CheckCircle size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">12</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tasks Completed
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
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Star size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h4">4.7</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Rating
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Assigned Clients */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Assigned Clients" />
            <CardContent>
              {assignedClients.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', py: 2 }}
                >
                  No clients assigned yet
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {assignedClients.map((client) => (
                    <Box key={client.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
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

        {/* Assigned Properties */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Assigned Properties" />
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
                <Stack spacing={2}>
                  {assignedProperties.map((property) => (
                    <Box key={property.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <MapPin size={16} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{property.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {property.location}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        ID: {property.id}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Management Team */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Management Team" />
            <CardContent>
              <Stack spacing={2}>
                {manager && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: manager.avatar ? 'transparent' : 'info.main',
                        backgroundImage: manager.avatar ? `url(${manager.avatar})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      {!manager.avatar && manager.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">{manager.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Manager • {manager.email}
                      </Typography>
                    </Box>
                    <Chip label="Manager" color="info" size="small" />
                  </Box>
                )}

                {supervisor && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: supervisor.avatar ? 'transparent' : 'warning.main',
                        backgroundImage: supervisor.avatar ? `url(${supervisor.avatar})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      {!supervisor.avatar && supervisor.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">{supervisor.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Supervisor • {supervisor.email}
                      </Typography>
                    </Box>
                    <Chip label="Supervisor" color="warning" size="small" />
                  </Box>
                )}

                {!manager && !supervisor && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', py: 2 }}
                  >
                    No manager or supervisor assigned
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Performance Metrics" />
            <CardContent>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Task Completion</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      85%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Response Time</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      2.3 hrs
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Client Satisfaction</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      4.7/5
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={94}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Tasks */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader title="Current Tasks" />
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                    <CheckCircle size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">
                      Property inspection - La Dimora Del Cavaliere
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Due: Today, 3:00 PM
                    </Typography>
                  </Box>
                  <Chip label="High Priority" color="error" size="small" />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                    <AlertCircle size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Client meeting - Luxury Rentals LLC</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Due: Tomorrow, 10:00 AM
                    </Typography>
                  </Box>
                  <Chip label="Medium Priority" color="warning" size="small" />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>
                    <Calendar size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Weekly report submission</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Due: Friday, 5:00 PM
                    </Typography>
                  </Box>
                  <Chip label="Low Priority" color="info" size="small" />
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
                    <CheckCircle size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Completed property maintenance check</Typography>
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
                    <Typography variant="body2">Received 5-star client review</Typography>
                    <Typography variant="caption" color="text.secondary">
                      1 day ago
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                    <Clock size={16} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">Scheduled client meeting</Typography>
                    <Typography variant="caption" color="text.secondary">
                      3 days ago
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
