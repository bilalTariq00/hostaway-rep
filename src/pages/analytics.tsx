import { useState } from 'react';
import { Heart, Calendar, Download, MoreVertical, MessageSquare } from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { HeaderSection } from 'src/layouts/core';

// ----------------------------------------------------------------------

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(0);

  // Mock data for invoices
  const invoiceData = [
    {
      id: 'INV-1990',
      category: 'Android',
      price: '$83.74',
      status: 'Paid',
      statusColor: 'success',
    },
    {
      id: 'INV-1991',
      category: 'Mac',
      price: '$97.14',
      status: 'Out of date',
      statusColor: 'error',
    },
    {
      id: 'INV-1992',
      category: 'Windows',
      price: '$68.71',
      status: 'Progress',
      statusColor: 'warning',
    },
    {
      id: 'INV-1993',
      category: 'Android',
      price: '$85.21',
      status: 'Paid',
      statusColor: 'success',
    },
    { id: 'INV-1994', category: 'Mac', price: '$52.17', status: 'Paid', statusColor: 'success' },
  ];

  // Mock data for applications
  const applicationData = [
    {
      name: 'Microsoft office 365',
      icon: '📊',
      price: 'Free',
      downloads: '9.91k',
      size: '9.68 Mb',
      rating: '4.8',
    },
    {
      name: 'Opera',
      icon: '🔴',
      price: 'Free',
      downloads: '8.12k',
      size: '8.45 Mb',
      rating: '4.6',
    },
    {
      name: 'Adobe acrobat reader DC',
      icon: '🔴',
      price: '$68.71',
      downloads: '9.12k',
      size: '8.91 Mb',
      rating: '4.7',
    },
    {
      name: 'Joplin',
      icon: '🔵',
      price: 'Free',
      downloads: '6.98k',
      size: '6.82 Mb',
      rating: '4.5',
    },
    {
      name: 'Topaz photo AI',
      icon: '💎',
      price: '$52.17',
      downloads: '8.49k',
      size: '8.29 Mb',
      rating: '4.9',
    },
  ];

  // Mock data for countries
  const countryData = [
    { country: 'Germany', flag: '🇩🇪', mobile: '9.91k', desktop: '1.95k' },
    { country: 'England', flag: '🇬🇧', mobile: '1.95k', desktop: '9.12k' },
    { country: 'France', flag: '🇫🇷', mobile: '9.12k', desktop: '6.98k' },
    { country: 'Korean', flag: '🇰🇷', mobile: '6.98k', desktop: '8.49k' },
    { country: 'USA', flag: '🇺🇸', mobile: '8.49k', desktop: '2.03k' },
  ];

  // Mock data for authors
  const authorData = [
    { name: 'Jayvion Simon', avatar: '👤', likes: '9.91k', trophy: '🥇' },
    { name: 'Deja Brady', avatar: '👤', likes: '9.12k', trophy: '🥈' },
    { name: 'Lucian Obrien', avatar: '👤', likes: '1.95k', trophy: '🥉' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <HeaderSection>
        <Typography variant="h4">Analytics</Typography>
      </HeaderSection>

      <Box sx={{ p: 3 }}>
        {/* Top Row - Two main cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Left Card - New Invoices Table */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="New Invoices" />
              <CardContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice ID</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceData.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.category}</TableCell>
                        <TableCell>{invoice.price}</TableCell>
                        <TableCell>
                          <Chip
                            label={invoice.status}
                            color={invoice.statusColor as any}
                            size="small"
                            sx={{ borderRadius: 2 }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <MoreVertical size={16} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button variant="text" sx={{ textTransform: 'none' }}>
                    View all &gt;
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Card - Related Applications */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Related applications" />
              <CardContent>
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                  <Tab label="Top 7 days" />
                  <Tab label="Top 30 days" />
                  <Tab label="All times" />
                </Tabs>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {applicationData.map((app, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, fontSize: '1.2rem' }}>{app.icon}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {app.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {app.price}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Download size={12} />
                          <Typography variant="caption">{app.downloads}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              backgroundColor: 'grey.400',
                              borderRadius: 1,
                            }}
                          />
                          <Typography variant="caption">{app.size}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Heart size={12} />
                          <Typography variant="caption">{app.rating}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Bottom Row - Three cards */}
        <Grid container spacing={3}>
          {/* Top Installed Countries */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Top installed countries" />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {countryData.map((country, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ fontSize: '1.5rem' }}>{country.flag}</Typography>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {country.country}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="caption">{country.mobile}</Typography>
                        <Typography variant="caption">{country.desktop}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Authors */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Top authors" />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {authorData.map((author, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>{author.avatar}</Avatar>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {author.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Heart size={12} />
                        <Typography variant="caption">{author.likes}</Typography>
                        <Typography sx={{ fontSize: '1rem' }}>{author.trophy}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Conversion and Applications Cards */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              {/* Conversion Card */}
              <Card
                sx={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                  color: 'white',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
                    <Calendar size={40} />
                  </Box>
                  <CircularProgress
                    variant="determinate"
                    value={48}
                    size={80}
                    thickness={4}
                    sx={{
                      color: 'rgba(255,255,255,0.3)',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Typography variant="h3" sx={{ mt: 2, fontWeight: 700 }}>
                    38,566
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Conversion
                  </Typography>
                </CardContent>
              </Card>

              {/* Applications Card */}
              <Card
                sx={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #2196f3 0%, #1565c0 100%)',
                  color: 'white',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
                    <MessageSquare size={40} />
                  </Box>
                  <CircularProgress
                    variant="determinate"
                    value={75}
                    size={80}
                    thickness={4}
                    sx={{
                      color: 'rgba(255,255,255,0.3)',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Typography variant="h3" sx={{ mt: 2, fontWeight: 700 }}>
                    55,566
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Applications
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
