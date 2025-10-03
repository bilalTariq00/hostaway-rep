import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

export function QuickBooksView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(3);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/financial-reportings/analytics');
    if (newValue === 1) router.push('/financial-reportings/rental-activity');
    if (newValue === 2) router.push('/financial-reportings/occupancy-report');
  };

  const handlePricingModalOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingModalClose = () => {
    setPricingModalOpen(false);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: 'primary.main',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              bgcolor: 'primary.main',
            },
          }}
        >
          <Tab label="Analytics" />
          <Tab label="Rental Activity" />
          <Tab label="Occupancy Report" />
          <Tab label="QuickBooks" />
        </Tabs>
      </Box>

      {/* Title and Actions */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            QuickBooks Integration
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img 
                src="/assets/images/quickbooks-logo.png" 
                alt="QuickBooks" 
                style={{ height: 40 }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Typography variant="body2" color="text.secondary">
                QuickBooks Logo
              </Typography>
            </Box>
            <Button variant="outlined" onClick={handlePricingModalOpen}>
              Pricing Info
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Content Image Flex Combo */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Integration Image
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Seamless QuickBooks Integration
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Connect your property management system directly with QuickBooks for automated 
                financial reporting and streamlined accounting processes.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained">
                  Connect QuickBooks
                </Button>
                <Button variant="outlined">
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Save Time Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Save Time
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.light',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Iconify icon={"eva:clock-fill" as any} width={40} sx={{ color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Automated Sync
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Automatically sync your bookings and financial data with QuickBooks
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'success.light',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Iconify icon={"eva:checkmark-circle-2-fill" as any} width={40} sx={{ color: 'success.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Error Reduction
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Eliminate manual data entry errors with automated processes
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'warning.light',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Iconify icon={"eva:trending-up-fill" as any} width={40} sx={{ color: 'warning.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Real-time Reports
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generate up-to-date financial reports instantly
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'info.light',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Iconify icon={"eva:shield-fill" as any} width={40} sx={{ color: 'info.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Secure Connection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bank-level security for all your financial data
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Get More Done Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Get More Done with QuickBooks
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Automated Bookkeeping
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Automatically categorize income and expenses based on your booking data
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Income Tracking" size="small" />
                  <Chip label="Expense Management" size="small" />
                  <Chip label="Tax Preparation" size="small" />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Financial Insights
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get detailed insights into your property&apos;s financial performance
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Profit Analysis" size="small" />
                  <Chip label="Revenue Trends" size="small" />
                  <Chip label="Cost Tracking" size="small" />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Invoice Management
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Create and send professional invoices directly from your booking data
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Auto Invoicing" size="small" />
                  <Chip label="Payment Tracking" size="small" />
                  <Chip label="Receipt Management" size="small" />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Compliance & Reporting
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Stay compliant with automated tax calculations and reporting
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="Tax Calculations" size="small" />
                  <Chip label="Audit Trails" size="small" />
                  <Chip label="Regulatory Reports" size="small" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* FAQs Section */}
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Frequently Asked Questions
          </Typography>
          
          <Accordion>
            <AccordionSummary expandIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                How does the QuickBooks integration work?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Our integration automatically syncs your booking data, revenue, and expenses 
                with QuickBooks. You can set up automated rules for categorization and 
                generate reports directly from your property management system.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                What QuickBooks versions are supported?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                We support QuickBooks Online, QuickBooks Desktop (Pro, Premier, Enterprise), 
                and QuickBooks Self-Employed. The integration works seamlessly across all 
                versions with real-time data synchronization.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Is my financial data secure?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Yes, we use bank-level encryption and follow industry-standard security 
                protocols. Your data is encrypted in transit and at rest, and we never 
                store your QuickBooks credentials.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Can I customize the data mapping?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Absolutely! You can customize how your booking data maps to QuickBooks 
                accounts, set up automated categorization rules, and choose which data 
                fields to sync. This ensures the integration works perfectly with your 
                existing accounting setup.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<Iconify icon={"eva:arrow-down-fill" as any} />}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                What if I need help setting up the integration?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Our support team provides free setup assistance and training. We also offer 
                comprehensive documentation, video tutorials, and live chat support to help 
                you get the most out of your QuickBooks integration.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* Pricing Info Modal */}
      <Dialog open={pricingModalOpen} onClose={handlePricingModalClose} maxWidth="md" fullWidth>
        <DialogTitle>QuickBooks Integration Pricing</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Basic
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                  $29/month
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Perfect for small properties
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2">• Up to 5 properties</Typography>
                  <Typography variant="body2">• Basic sync</Typography>
                  <Typography variant="body2">• Email support</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ textAlign: 'center', p: 2, border: 2, borderColor: 'primary.main' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Professional
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                  $59/month
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Most popular choice
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2">• Up to 25 properties</Typography>
                  <Typography variant="body2">• Advanced sync</Typography>
                  <Typography variant="body2">• Priority support</Typography>
                  <Typography variant="body2">• Custom reports</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Enterprise
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                  $99/month
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  For large operations
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2">• Unlimited properties</Typography>
                  <Typography variant="body2">• Full sync</Typography>
                  <Typography variant="body2">• 24/7 support</Typography>
                  <Typography variant="body2">• API access</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePricingModalClose}>Close</Button>
          <Button variant="contained" onClick={handlePricingModalClose}>
            Start Free Trial
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}