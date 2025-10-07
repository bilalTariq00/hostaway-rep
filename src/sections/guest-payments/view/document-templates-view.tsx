import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

export function DocumentTemplatesView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(2);
  const [templateType, setTemplateType] = useState('invoice');
  const [invoiceSettings, setInvoiceSettings] = useState({
    logo: '',
    backgroundColor: '#ffffff',
    invoiceTitle: 'INVOICE',
    hostName: true,
    hostNameType: 'manual',
    customName: '',
    phone: true,
    phoneType: 'listing-specific',
    phoneOrigin: '',
    email: true,
    additionalInfo: '',
    taxId: '',
    paymentStatus: true,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 0) router.push('/guest-payments/charges');
    if (newValue === 1) router.push('/guest-payments/auto-payments');
  };

  const handleTemplateTypeChange = (type: string) => {
    setTemplateType(type);
  };

  const handleInvoiceSettingChange = (field: string, value: any) => {
    setInvoiceSettings(prev => ({ ...prev, [field]: value }));
  };

  const renderPreview = () => {
    const isInvoice = templateType === 'invoice';
    const isCharge = templateType === 'charge';
    const isRefund = templateType === 'refund';

    return (
      <Paper sx={{ p: 3, bgcolor: invoiceSettings.backgroundColor, minHeight: 400 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            {invoiceSettings.logo && (
              <Box sx={{ mb: 2 }}>
                <img src={invoiceSettings.logo} alt="Logo" style={{ height: 40 }} />
              </Box>
            )}
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {isInvoice ? 'INVOICE' : isCharge ? 'CHARGE RECEIPT' : 'REFUND RECEIPT'}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              Invoice #: INV-001
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Host Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            From:
          </Typography>
          {invoiceSettings.hostName && (
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {invoiceSettings.hostNameType === 'manual' ? 'John Doe' : 'Property Management Co.'}
            </Typography>
          )}
          {invoiceSettings.customName && (
            <Typography variant="body1">
              {invoiceSettings.customName}
            </Typography>
          )}
          {invoiceSettings.phone && (
            <Typography variant="body2" color="text.secondary">
              Phone: {invoiceSettings.phoneType === 'listing-specific' ? '+1 (555) 123-4567' : invoiceSettings.phoneOrigin}
            </Typography>
          )}
          {invoiceSettings.email && (
            <Typography variant="body2" color="text.secondary">
              Email: contact@example.com
            </Typography>
          )}
          {invoiceSettings.additionalInfo && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {invoiceSettings.additionalInfo}
            </Typography>
          )}
          {invoiceSettings.taxId && (
            <Typography variant="body2" color="text.secondary">
              Tax ID: {invoiceSettings.taxId}
            </Typography>
          )}
        </Box>

        {/* Guest Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            To:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Guest Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Guest Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Guest Phone
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Invoice Items */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {isInvoice ? 'Invoice Items' : isCharge ? 'Charge Details' : 'Refund Details'}
          </Typography>
          <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', bgcolor: 'grey.100', p: 2, fontWeight: 600 }}>
              <Box sx={{ flex: 2 }}>Description</Box>
              <Box sx={{ flex: 1, textAlign: 'center' }}>Qty</Box>
              <Box sx={{ flex: 1, textAlign: 'center' }}>Rate</Box>
              <Box sx={{ flex: 1, textAlign: 'right' }}>Amount</Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', mb: 1 }}>
                <Box sx={{ flex: 2 }}>Accommodation Fee</Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>1</Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>$250.00</Box>
                <Box sx={{ flex: 1, textAlign: 'right' }}>$250.00</Box>
              </Box>
              <Box sx={{ display: 'flex', mb: 1 }}>
                <Box sx={{ flex: 2 }}>Cleaning Fee</Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>1</Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>$50.00</Box>
                <Box sx={{ flex: 1, textAlign: 'right' }}>$50.00</Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">$300.00</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Payment Status */}
        {invoiceSettings.paymentStatus && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Payment Status: {isRefund ? 'Refunded' : 'Paid'}
            </Typography>
          </Box>
        )}
      </Paper>
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

      {/* Template Type Cards */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 2,
                cursor: 'pointer',
                border: templateType === 'invoice' ? 2 : 1,
                borderColor: templateType === 'invoice' ? 'primary.main' : 'grey.200',
                '&:hover': { boxShadow: 2 },
              }}
              onClick={() => handleTemplateTypeChange('invoice')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon={"eva:file-text-fill" as any} width={24} />
                <Typography variant="h6">Invoice Receipt</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 2,
                cursor: 'pointer',
                border: templateType === 'charge' ? 2 : 1,
                borderColor: templateType === 'charge' ? 'primary.main' : 'grey.200',
                '&:hover': { boxShadow: 2 },
              }}
              onClick={() => handleTemplateTypeChange('charge')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon={"eva:credit-card-fill" as any} width={24} />
                <Typography variant="h6">Charge Receipt</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 2,
                cursor: 'pointer',
                border: templateType === 'refund' ? 2 : 1,
                borderColor: templateType === 'refund' ? 'primary.main' : 'grey.200',
                '&:hover': { boxShadow: 2 },
              }}
              onClick={() => handleTemplateTypeChange('refund')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon={"eva:undo-fill" as any} width={24} />
                <Typography variant="h6">Refund Receipt</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button variant="outlined" startIcon={<Iconify icon={"eva:refresh-fill" as any} />}>
          Reset Template
        </Button>
        <Button variant="contained" startIcon={<Iconify icon={"eva:checkmark-fill" as any} />}>
          Save
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Side - Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
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
                startIcon={<Iconify icon={"eva:plus-fill" as any} />}
                sx={{ mb: 1 }}
              >
                Add Logo
              </Button>
              <Typography variant="caption" color="text.secondary" display="block">
                Upload your company logo
              </Typography>
            </Box>

            {/* Background Color */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Color
              </Typography>
              <TextField
                fullWidth
                type="color"
                value={invoiceSettings.backgroundColor}
                onChange={(e) => handleInvoiceSettingChange('backgroundColor', e.target.value)}
                size="small"
              />
              <Typography variant="caption" color="text.secondary" display="block">
                Choose background color
              </Typography>
            </Box>

            {/* Invoice Title */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Invoice Title
              </Typography>
              <TextField
                fullWidth
                value={invoiceSettings.invoiceTitle}
                onChange={(e) => handleInvoiceSettingChange('invoiceTitle', e.target.value)}
                placeholder="Enter invoice title..."
              />
            </Box>

            {/* Host Name */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={invoiceSettings.hostName}
                    onChange={(e) => handleInvoiceSettingChange('hostName', e.target.checked)}
                  />
                }
                label="Host Name"
              />
              {invoiceSettings.hostName && (
                <Box sx={{ mt: 2 }}>
                  <RadioGroup
                    value={invoiceSettings.hostNameType}
                    onChange={(e) => handleInvoiceSettingChange('hostNameType', e.target.value)}
                  >
                    <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                    <FormControlLabel value="listing-specific" control={<Radio />} label="Listing Specific" />
                  </RadioGroup>
                  <TextField
                    fullWidth
                    value={invoiceSettings.customName}
                    onChange={(e) => handleInvoiceSettingChange('customName', e.target.value)}
                    placeholder="Custom name..."
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
                    checked={invoiceSettings.phone}
                    onChange={(e) => handleInvoiceSettingChange('phone', e.target.checked)}
                  />
                }
                label="Phone"
              />
              {invoiceSettings.phone && (
                <Box sx={{ mt: 2 }}>
                  <RadioGroup
                    value={invoiceSettings.phoneType}
                    onChange={(e) => handleInvoiceSettingChange('phoneType', e.target.value)}
                  >
                    <FormControlLabel value="listing-specific" control={<Radio />} label="Listing Specific" />
                    <FormControlLabel value="origin" control={<Radio />} label="Origin" />
                  </RadioGroup>
                  <TextField
                    fullWidth
                    value={invoiceSettings.phoneOrigin}
                    onChange={(e) => handleInvoiceSettingChange('phoneOrigin', e.target.value)}
                    placeholder="Phone number..."
                    sx={{ mt: 1 }}
                  />
                </Box>
              )}
            </Box>

            {/* Email */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={invoiceSettings.email}
                    onChange={(e) => handleInvoiceSettingChange('email', e.target.checked)}
                  />
                }
                label="Email"
              />
            </Box>

            {/* Additional Info */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Additional Info
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={invoiceSettings.additionalInfo}
                onChange={(e) => handleInvoiceSettingChange('additionalInfo', e.target.value)}
                placeholder="Enter additional information..."
              />
            </Box>

            {/* Tax ID */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Tax ID
              </Typography>
              <TextField
                fullWidth
                value={invoiceSettings.taxId}
                onChange={(e) => handleInvoiceSettingChange('taxId', e.target.value)}
                placeholder="Enter tax ID..."
              />
            </Box>

            {/* Payment Status */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={invoiceSettings.paymentStatus}
                    onChange={(e) => handleInvoiceSettingChange('paymentStatus', e.target.checked)}
                  />
                }
                label="Payment Status"
              />
            </Box>

            {/* Add Custom Field Button */}
            <Button
              variant="outlined"
              startIcon={<Iconify icon={"eva:plus-fill" as any} />}
              fullWidth
            >
              Add Custom Field
            </Button>
          </Paper>
        </Grid>

        {/* Right Side - Preview */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Preview
            </Typography>
            {renderPreview()}
          </Paper>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
