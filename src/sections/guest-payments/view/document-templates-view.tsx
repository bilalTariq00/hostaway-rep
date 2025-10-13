import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

export function DocumentTemplatesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [templateType, setTemplateType] = useState('invoice');
  const [showSuccess, setShowSuccess] = useState(false);
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [currentColorType, setCurrentColorType] = useState<'background' | 'accent' | null>(null);
  
  // Compact color palette - most commonly used colors
  const colorPalette = [
    '#1976d2', '#f44336', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4',
    '#795548', '#607d8b', '#e91e63', '#3f51b5', '#8bc34a', '#ffc107',
    '#673ab7', '#009688', '#ff5722', '#2196f3', '#cddc39', '#ffeb3b',
    '#9e9e9e', '#000000', '#ffffff'
  ];
  
  const [templateSettings, setTemplateSettings] = useState({
    logo: '',
    backgroundColor: '#1976d2',
    accentColor: '#f44336',
    invoiceTitle: 'Invoice',
    hostName: true,
    hostNameType: 'manual',
    customName: '',
    phone: true,
    phoneType: 'listing-specific',
    phoneNumber: '+39 351 4882766',
    email: true,
    emailAddress: 'info@domusferiae.com',
    additionalInfo: '',
    taxId: true,
    taxIdType: 'listing-specific',
    customTaxId: '20291698',
    showPaymentStatus: true,
    showCharges: true,
    showPaid: true,
    showDue: true,
    showFailed: true,
    showRefunded: true,
    customFields: [],
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/guest-payments/charges');
    if (newValue === 1) router.push('/guest-payments/auto-payments');
  };

  const handleTemplateTypeChange = (type: string) => {
    setTemplateType(type);
  };

  const handleSettingChange = (field: string, value: any) => {
    setTemplateSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleColorPickerOpen = (event: React.MouseEvent<HTMLElement>, colorType: 'background' | 'accent') => {
    setColorPickerAnchor(event.currentTarget);
    setCurrentColorType(colorType);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
    setCurrentColorType(null);
  };

  const handleColorSelect = (color: string) => {
    if (currentColorType) {
      const field = currentColorType === 'background' ? 'backgroundColor' : 'accentColor';
      handleSettingChange(field, color);
    }
    handleColorPickerClose();
  };

  const handleHexColorChange = (color: string) => {
    if (currentColorType && /^#[0-9A-F]{6}$/i.test(color)) {
      const field = currentColorType === 'background' ? 'backgroundColor' : 'accentColor';
      handleSettingChange(field, color);
    }
  };

  const handleSave = () => {
    // Save template settings to localStorage or API
    localStorage.setItem(`template_${templateType}`, JSON.stringify(templateSettings));
    setShowSuccess(true);
  };

  const handleReset = () => {
    setTemplateSettings({
      logo: '',
      backgroundColor: '#1976d2',
      accentColor: '#f44336',
      invoiceTitle: 'Invoice',
      hostName: true,
      hostNameType: 'manual',
      customName: '',
      phone: true,
      phoneType: 'listing-specific',
      phoneNumber: '+39 351 4882766',
      email: true,
      emailAddress: 'info@domusferiae.com',
      additionalInfo: '',
      taxId: true,
      taxIdType: 'listing-specific',
      customTaxId: '20291698',
      showPaymentStatus: true,
      showCharges: true,
      showPaid: true,
      showDue: true,
      showFailed: true,
      showRefunded: true,
      customFields: [],
    });
  };

  const renderColorPicker = () => (
    <Popover
      open={Boolean(colorPickerAnchor)}
      anchorEl={colorPickerAnchor}
      onClose={handleColorPickerClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          minWidth: 240,
          maxWidth: 280,
        },
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.9rem' }}>
        {currentColorType === 'background' ? 'Background' : 'Accent'} Color
      </Typography>
      
      {/* Compact Color Grid */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={0.5}>
          {colorPalette.map((color) => (
            <Grid key={color} size={2.4}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 1,
                  bgcolor: color,
                  border: '2px solid',
                  borderColor: color === (currentColorType === 'background' ? templateSettings.backgroundColor : templateSettings.accentColor) ? 'primary.main' : 'grey.200',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.15)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    zIndex: 1,
                    position: 'relative',
                  },
                }}
                onClick={() => handleColorSelect(color)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Compact Manual Hex Input */}
      <Box>
        <TextField
          fullWidth
          placeholder="#000000"
          size="small"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.8rem',
              height: 32,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: currentColorType === 'background' ? templateSettings.backgroundColor : templateSettings.accentColor,
                    border: '1px solid',
                    borderColor: 'grey.300',
                  }}
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleHexColorChange(e.target.value)}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontSize: '0.7rem' }}>
          Enter hex code
        </Typography>
      </Box>
    </Popover>
  );

  const renderPreview = () => {
    const isInvoice = templateType === 'invoice';
    const isCharge = templateType === 'charge';
    const isRefund = templateType === 'refund';

    return (
      <Box sx={{ 
        bgcolor: 'white', 
        borderRadius: 3, 
        overflow: 'hidden', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(0,0,0,0.16)',
        }
      }}>
        {/* Header with curved bottom */}
        <Box
          sx={{
            bgcolor: templateSettings.backgroundColor,
            color: 'white',
            p: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -1,
              left: 0,
              right: 0,
              height: 30,
              background: templateSettings.backgroundColor,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: -1,
              left: 0,
              right: 0,
              height: 30,
              background: 'white',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, position: 'relative', zIndex: 2 }}>
          <Box>
              {templateSettings.logo ? (
              <Box sx={{ mb: 2 }}>
                  <img src={templateSettings.logo} alt="Logo" style={{ height: 50, borderRadius: 8 }} />
                </Box>
              ) : (
                <Box sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 2,
                  border: '2px dashed rgba(255,255,255,0.3)',
                  textAlign: 'center',
                  minHeight: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 500 }}>
                    Your logo here
                  </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                Issue date: 5 April 2023
            </Typography>
              {templateSettings.taxId && (
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Tax ID: {templateSettings.taxIdType === 'listing-specific' ? 'Listing Tax ID will be here' : templateSettings.customTaxId}
            </Typography>
              )}
          </Box>
        </Box>

          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            textAlign: 'center', 
            mb: 0,
            position: 'relative',
            zIndex: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {isInvoice ? 'Invoice #0134524' : isCharge ? 'Receipt #0134524' : 'Refund receipt #0134524'}
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ p: 4 }}>
          {/* Property Info */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
              Little House on the Prairie with community pool
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
              555 Main St., Norton, Indiana
            </Typography>
          </Box>

          {/* Reservation Details */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid size={6}>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                Reservation ID: 123123123
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Iconify icon={"eva:calendar-fill" as any} width={18} color={templateSettings.accentColor} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Mon, 4 April - Fri, 8 April, 2024 • 4 Nights
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Iconify icon={"eva:people-fill" as any} width={18} color={templateSettings.accentColor} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Guests: 2 Adults
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Iconify icon={"eva:person-fill" as any} width={18} color={templateSettings.accentColor} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Guest name: John Doe
                </Typography>
              </Box>
            </Grid>
            <Grid size={6}>
              {templateSettings.hostName && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Iconify icon={"eva:person-fill" as any} width={18} color={templateSettings.accentColor} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Host name: {templateSettings.hostNameType === 'manual' ? 'Manuel Sciarria' : 'Listing contact person\'s name will be here'}
                  </Typography>
                </Box>
              )}
              {templateSettings.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Iconify icon={"eva:phone-fill" as any} width={18} color={templateSettings.accentColor} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Phone: {templateSettings.phoneNumber}
            </Typography>
                </Box>
              )}
              {templateSettings.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Iconify icon={"eva:email-fill" as any} width={18} color={templateSettings.accentColor} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Email: {templateSettings.emailAddress}
            </Typography>
                </Box>
              )}
            </Grid>
          </Grid>

          <Divider sx={{ mb: 4, borderColor: 'grey.200' }} />

          {/* Financial Details */}
          <Grid container spacing={4}>
            <Grid size={6}>
              {/* Price Breakdown */}
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                Price breakdown
            </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Base rate</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>$500</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Cleaning fee</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>$60</Typography>
                </Box>
                {isInvoice && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>VAT / GST 10%</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>$40</Typography>
                  </Box>
                )}
                {isRefund && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Refund</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>-$50</Typography>
                  </Box>
          )}
        </Box>

              <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
              
              {/* Add-ons */}
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                Add-ons
              </Typography>
        <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Extra parking</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>$50</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Pet fee</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>$50</Typography>
        </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Fresh flowers</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>$20</Typography>
            </Box>
              </Box>
              
              <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 2,
                border: '2px solid',
                borderColor: templateSettings.accentColor,
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {isInvoice ? 'Total' : isCharge ? 'Total price' : 'Total'}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: templateSettings.accentColor }}>
                  $720
                </Typography>
              </Box>
            </Grid>
            
            <Grid size={6}>
              {/* Payment Details */}
              {isInvoice && templateSettings.showPaymentStatus && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                    Payment status
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                      Partially paid
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Total paid</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>$600</Typography>
            </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Balance due</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>$120</Typography>
              </Box>
            </Box>
                  <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
                </>
              )}
              
              {/* Payment Method */}
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                Payment method
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Iconify icon={"eva:credit-card-fill" as any} width={20} color={templateSettings.accentColor} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Card ending in 5523</Typography>
          </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  22 Apr 22, 10:24 AM
                </Typography>
        </Box>

              {isCharge && (
                <>
                  <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mb: 3,
                    p: 2,
                    bgcolor: 'success.50',
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'success.main',
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Amount paid
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                      $340
                    </Typography>
                  </Box>
                </>
              )}
              
              {isRefund && (
                <>
                  <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mb: 3,
                    p: 2,
                    bgcolor: 'warning.50',
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'warning.main',
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Charged amount
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      $300
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mb: 3,
                    p: 2,
                    bgcolor: 'error.50',
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'error.main',
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      Amount refunded
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>
                      -$50
            </Typography>
          </Box>
                </>
              )}
              
              <Divider sx={{ mb: 3, borderColor: 'grey.200' }} />
              
              {/* Cancellation Policy */}
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Cancellation Policy
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                According to cancellation policy on Booking.com
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Guest Payments
        </Typography>

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
          <Tab label="Charges" />
          <Tab label="Auto Payment" />
          <Tab label="Document Templates" />
        </Tabs>
      </Box>

      {/* Template Type Tabs */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                bgcolor: templateType === 'invoice' ? 'primary.main' : 'white',
                color: templateType === 'invoice' ? 'white' : 'text.primary',
                border: templateType === 'invoice' ? 2 : 1,
                borderColor: templateType === 'invoice' ? 'primary.main' : 'grey.200',
                borderRadius: 2,
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': { 
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={() => handleTemplateTypeChange('invoice')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Iconify icon={"eva:file-text-fill" as any} width={28} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Invoice
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.4 }}>
                Generated upon reservation and reservation alterations
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                bgcolor: templateType === 'charge' ? 'primary.main' : 'white',
                color: templateType === 'charge' ? 'white' : 'text.primary',
                border: templateType === 'charge' ? 2 : 1,
                borderColor: templateType === 'charge' ? 'primary.main' : 'grey.200',
                borderRadius: 2,
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': { 
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={() => handleTemplateTypeChange('charge')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Iconify icon={"eva:credit-card-fill" as any} width={28} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Charge receipt
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.4 }}>
                Generated upon transaction
              </Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 3,
                cursor: 'pointer',
                bgcolor: templateType === 'refund' ? 'primary.main' : 'white',
                color: templateType === 'refund' ? 'white' : 'text.primary',
                border: templateType === 'refund' ? 2 : 1,
                borderColor: templateType === 'refund' ? 'primary.main' : 'grey.200',
                borderRadius: 2,
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': { 
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={() => handleTemplateTypeChange('refund')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Iconify icon={"eva:undo-fill" as any} width={28} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Refund receipt
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.4 }}>
                Generated upon refund
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button 
          variant="outlined" 
          color="error"
          startIcon={<Iconify icon={"eva:refresh-fill" as any} />}
          onClick={handleReset}
        >
          Reset template
        </Button>
        <Button 
          variant="contained" 
          color="success"
          startIcon={<Iconify icon="eva:checkmark-fill" />}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Side - Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Template Settings
            </Typography>

            {/* Logo */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Logo
              </Typography>
              <Button
                variant="outlined"
                color="success"
                startIcon={<Iconify icon={"eva:plus-fill" as any} />}
                sx={{ mb: 1 }}
              >
                + Add logo
              </Button>
            </Box>

            {/* Colors */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Colors
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: templateSettings.backgroundColor,
                      border: '3px solid',
                      borderColor: 'grey.200',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      },
                    }}
                    onClick={(e) => handleColorPickerOpen(e, 'background')}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Background color</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: templateSettings.accentColor,
                      border: '3px solid',
                      borderColor: 'grey.200',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      },
                    }}
                    onClick={(e) => handleColorPickerOpen(e, 'accent')}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>Accent color</Typography>
                </Box>
              </Stack>
            </Box>

            {/* Invoice Title */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Invoice title
              </Typography>
              <TextField
                fullWidth
                value={templateSettings.invoiceTitle}
                onChange={(e) => handleSettingChange('invoiceTitle', e.target.value)}
                placeholder="Invoice"
                size="small"
              />
            </Box>

            {/* Host Name */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={templateSettings.hostName}
                    onChange={(e) => handleSettingChange('hostName', e.target.checked)}
                    color="success"
                  />
                }
                label="Host name"
              />
              {templateSettings.hostName && (
                <Box sx={{ mt: 2 }}>
                  <RadioGroup
                    value={templateSettings.hostNameType}
                    onChange={(e) => handleSettingChange('hostNameType', e.target.value)}
                  >
                    <FormControlLabel 
                      value="manual" 
                      control={<Radio color="success" />} 
                      label="Manuel Sciarria" 
                    />
                    <FormControlLabel 
                      value="listing-specific" 
                      control={<Radio color="success" />} 
                      label="Listing specific (contact person and invoicing)" 
                    />
                  </RadioGroup>
                  <TextField
                    fullWidth
                    value={templateSettings.customName}
                    onChange={(e) => handleSettingChange('customName', e.target.value)}
                    placeholder="Custom name"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              )}
            </Box>

            {/* Phone */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={templateSettings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.checked)}
                    color="success"
                  />
                }
                label="Phone"
              />
              {templateSettings.phone && (
                <Box sx={{ mt: 2 }}>
                  <RadioGroup
                    value={templateSettings.phoneType}
                    onChange={(e) => handleSettingChange('phoneType', e.target.value)}
                  >
                    <FormControlLabel 
                      value="manual" 
                      control={<Radio color="success" />} 
                      label={templateSettings.phoneNumber}
                    />
                    <FormControlLabel 
                      value="listing-specific" 
                      control={<Radio color="success" />} 
                      label="Listing specific (contact person and invoicing)" 
                    />
                  </RadioGroup>
                </Box>
              )}
            </Box>

            {/* Email */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={templateSettings.email}
                    onChange={(e) => handleSettingChange('email', e.target.checked)}
                    color="success"
                  />
                }
                label="Email"
              />
              {templateSettings.email && (
                <Box sx={{ mt: 2 }}>
                  <RadioGroup
                    value={templateSettings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                  >
                    <FormControlLabel 
                      value="manual" 
                      control={<Radio color="success" />} 
                      label={templateSettings.emailAddress}
                    />
                    <FormControlLabel 
                      value="listing-specific" 
                      control={<Radio color="success" />} 
                      label="Listing specific (contact person and invoicing)" 
                    />
                    <FormControlLabel 
                      value="custom" 
                      control={<Radio color="success" />} 
                      label="Custom email" 
                    />
                  </RadioGroup>
                </Box>
              )}
            </Box>

            {/* Additional Information */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!templateSettings.additionalInfo}
                    onChange={(e) => handleSettingChange('additionalInfo', e.target.checked ? '' : '')}
                    color="success"
                  />
                }
                label="Additional information"
              />
              {templateSettings.additionalInfo && (
              <TextField
                fullWidth
                multiline
                  rows={4}
                  value={templateSettings.additionalInfo}
                  onChange={(e) => handleSettingChange('additionalInfo', e.target.value)}
                  placeholder="Additional information"
                  sx={{ mt: 2 }}
                />
              )}
            </Box>

            {/* Tax ID */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={templateSettings.taxId}
                    onChange={(e) => handleSettingChange('taxId', e.target.checked)}
                    color="success"
                  />
                }
                label="Tax ID"
              />
              {templateSettings.taxId && (
                <Box sx={{ mt: 2 }}>
                  <RadioGroup
                    value={templateSettings.taxIdType}
                    onChange={(e) => handleSettingChange('taxIdType', e.target.value)}
                  >
                    <FormControlLabel 
                      value="listing-specific" 
                      control={<Radio color="success" />} 
                      label="Listing specific (contact person and invoicing)" 
                    />
                    <FormControlLabel 
                      value="custom" 
                      control={<Radio color="success" />} 
                      label="Custom Tax ID" 
                    />
                  </RadioGroup>
              <TextField
                fullWidth
                    value={templateSettings.customTaxId}
                    onChange={(e) => handleSettingChange('customTaxId', e.target.value)}
                    placeholder="20291698"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              )}
            </Box>

            {/* Payment Status and Balance */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={templateSettings.showPaymentStatus}
                    onChange={(e) => handleSettingChange('showPaymentStatus', e.target.checked)}
                    color="success"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">Show payment status and balance</Typography>
                    <Iconify icon={"eva:info-fill" as any} width={16} />
                  </Box>
                }
              />
            </Box>

            {/* Charges */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={templateSettings.showCharges}
                    onChange={(e) => handleSettingChange('showCharges', e.target.checked)}
                    color="success"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">Show charges</Typography>
                    <Iconify icon={"eva:info-fill" as any} width={16} />
                  </Box>
                }
              />
              {templateSettings.showCharges && (
                <Box sx={{ mt: 2, ml: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={templateSettings.showPaid}
                        onChange={(e) => handleSettingChange('showPaid', e.target.checked)}
                        color="success"
                        size="small"
                      />
                    }
                    label="Paid"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={templateSettings.showDue}
                        onChange={(e) => handleSettingChange('showDue', e.target.checked)}
                        color="success"
                        size="small"
                      />
                    }
                    label="Due"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={templateSettings.showFailed}
                        onChange={(e) => handleSettingChange('showFailed', e.target.checked)}
                        color="success"
                        size="small"
                      />
                    }
                    label="Failed"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={templateSettings.showRefunded}
                        onChange={(e) => handleSettingChange('showRefunded', e.target.checked)}
                        color="success"
                        size="small"
                      />
                    }
                    label="Refunded"
                  />
                </Box>
              )}
            </Box>

            {/* Custom Fields */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Custom fields
              </Typography>
            <Button
              variant="outlined"
                color="success"
              startIcon={<Iconify icon={"eva:plus-fill" as any} />}
              fullWidth
            >
                + Add custom field
            </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side - Preview */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Preview
            </Typography>
            {renderPreview()}
          </Paper>
        </Grid>
      </Grid>

      {/* Color Picker */}
      {renderColorPicker()}

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Template saved successfully!
        </Alert>
      </Snackbar>
    </DashboardContent>
  );
}
