import { useState } from 'react';
import {
  BarChart3,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Receipt,
  Scale,
  Shield,
  TrendingUp,
} from 'lucide-react';

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
            
            </Box>
            <Button variant="outlined" onClick={handlePricingModalOpen}>
              Pricing Info
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Content Image Flex Combo */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                  
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img 
                    src="https://dashboard.hostaway.com/v3-widget-bundle/649712b9a1f363df.png" 
                    alt="QuickBooks Integration" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                 
                </Box>
                
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Seamless QuickBooks Integration
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                Connect your property management system directly with QuickBooks for automated 
                financial reporting and streamlined accounting processes.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Connect QuickBooks
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': { 
                      borderColor: 'primary.dark',
                      bgcolor: 'primary.lighter',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Save Time Section */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
            Save Time & Increase Efficiency
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img 
                    src="/assets/images/automated-sync.png" 
                    alt="Automated Sync" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={32} color="#00A76F" />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Automated Sync
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Automatically sync your bookings and financial data with QuickBooks
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img 
                    src="/assets/images/error-reduction.png" 
                    alt="Error Reduction" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle size={32} color="#00A76F" />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Error Reduction
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Eliminate manual data entry errors with automated processes
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img 
                    src="/assets/images/real-time-reports.png" 
                    alt="Real-time Reports" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUp size={32} color="#00A76F" />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Real-time Reports
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Generate up-to-date financial reports instantly
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img 
                    src="/assets/images/secure-connection.png" 
                    alt="Secure Connection" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Shield size={32} color="#00A76F" />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Secure Connection
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  Bank-level security for all your financial data
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Get More Done Section */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
            Get More Done with QuickBooks
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img 
                      src="/assets/images/automated-bookkeeping.png" 
                      alt="Automated Bookkeeping" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={20} color="#00A76F" />
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Automated Bookkeeping
                </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  Automatically categorize income and expenses based on your booking data
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Income Tracking" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Expense Management" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Tax Preparation" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img 
                      src="/assets/images/financial-insights.png" 
                      alt="Financial Insights" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BarChart3 size={20} color="#00A76F" />
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Financial Insights
                </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  Get detailed insights into your property&apos;s financial performance
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Profit Analysis" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Revenue Trends" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Cost Tracking" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img 
                      src="/assets/images/invoice-management.png" 
                      alt="Invoice Management" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Receipt size={20} color="#00A76F" />
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Invoice Management
                </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  Create and send professional invoices directly from your booking data
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Auto Invoicing" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Payment Tracking" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Receipt Management" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img 
                      src="/assets/images/compliance-reporting.png" 
                      alt="Compliance & Reporting" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Scale size={20} color="#00A76F" />
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Compliance & Reporting
                </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  Stay compliant with automated tax calculations and reporting
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Tax Calculations" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Audit Trails" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                  <Chip 
                    label="Regulatory Reports" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      fontWeight: 500,
                    }} 
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* FAQs Section */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
            Frequently Asked Questions
          </Typography>
          
          <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary 
              expandIcon={<ChevronDown size={20} color="#00A76F" />}
              sx={{ 
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderRadius: '8px 8px 0 0',
                },
                '&:hover': {
                  bgcolor: 'primary.lighter',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                How does the QuickBooks integration work?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'grey.50', borderRadius: '0 0 8px 8px' }}>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                Our integration automatically syncs your booking data, revenue, and expenses 
                with QuickBooks. You can set up automated rules for categorization and 
                generate reports directly from your property management system.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary 
              expandIcon={<ChevronDown size={20} color="#00A76F" />}
              sx={{ 
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderRadius: '8px 8px 0 0',
                },
                '&:hover': {
                  bgcolor: 'primary.lighter',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                What QuickBooks versions are supported?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'grey.50', borderRadius: '0 0 8px 8px' }}>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                We support QuickBooks Online, QuickBooks Desktop (Pro, Premier, Enterprise), 
                and QuickBooks Self-Employed. The integration works seamlessly across all 
                versions with real-time data synchronization.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary 
              expandIcon={<ChevronDown size={20} color="#00A76F" />}
              sx={{ 
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderRadius: '8px 8px 0 0',
                },
                '&:hover': {
                  bgcolor: 'primary.lighter',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Is my financial data secure?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'grey.50', borderRadius: '0 0 8px 8px' }}>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                Yes, we use bank-level encryption and follow industry-standard security 
                protocols. Your data is encrypted in transit and at rest, and we never 
                store your QuickBooks credentials.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary 
              expandIcon={<ChevronDown size={20} color="#00A76F" />}
              sx={{ 
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderRadius: '8px 8px 0 0',
                },
                '&:hover': {
                  bgcolor: 'primary.lighter',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Can I customize the data mapping?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'grey.50', borderRadius: '0 0 8px 8px' }}>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                Absolutely! You can customize how your booking data maps to QuickBooks 
                accounts, set up automated categorization rules, and choose which data 
                fields to sync. This ensures the integration works perfectly with your 
                existing accounting setup.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary 
              expandIcon={<ChevronDown size={20} color="#00A76F" />}
              sx={{ 
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderRadius: '8px 8px 0 0',
                },
                '&:hover': {
                  bgcolor: 'primary.lighter',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                What if I need help setting up the integration?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'grey.50', borderRadius: '0 0 8px 8px' }}>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                Our support team provides free setup assistance and training. We also offer 
                comprehensive documentation, video tutorials, and live chat support to help 
                you get the most out of your QuickBooks integration.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* Pricing Info Modal */}
      <Dialog 
        open={pricingModalOpen} 
        onClose={handlePricingModalClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 700, 
          fontSize: '1.5rem',
          color: 'text.primary',
          pb: 2,
        }}>
          QuickBooks Integration Pricing
        </DialogTitle>
        <DialogContent sx={{ px: 4 }}>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 3, 
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'grey.200',
                height: '100%',
                '&:hover': {
                  borderColor: 'primary.light',
                  boxShadow: '0 4px 20px rgba(0, 167, 111, 0.1)',
                },
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Basic
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  $29
                  <Typography component="span" variant="h6" sx={{ color: 'text.secondary', ml: 1 }}>
                    /month
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Perfect for small properties
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Up to 5 properties</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Basic sync</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Email support</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 3, 
                borderRadius: 2,
                border: '3px solid',
                borderColor: 'primary.main',
                height: '100%',
                position: 'relative',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(0, 167, 111, 0.2)',
                },
              }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  Most Popular
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Professional
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  $59
                  <Typography component="span" variant="h6" sx={{ color: 'text.secondary', ml: 1 }}>
                    /month
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Most popular choice
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Up to 25 properties</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Advanced sync</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Priority support</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Custom reports</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 3, 
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'grey.200',
                height: '100%',
                '&:hover': {
                  borderColor: 'primary.light',
                  boxShadow: '0 4px 20px rgba(0, 167, 111, 0.1)',
                },
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Enterprise
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  $99
                  <Typography component="span" variant="h6" sx={{ color: 'text.secondary', ml: 1 }}>
                    /month
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  For large operations
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Unlimited properties</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• Full sync</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• 24/7 support</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>• API access</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 3, gap: 2 }}>
          <Button 
            onClick={handlePricingModalClose}
            variant="outlined"
            sx={{ 
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                bgcolor: 'grey.50',
              },
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            onClick={handlePricingModalClose}
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              px: 4,
              fontWeight: 600,
            }}
          >
            Start Free Trial
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}