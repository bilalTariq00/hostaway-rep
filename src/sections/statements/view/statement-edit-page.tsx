import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  X,
  Eye,
  Plus,
  Filter,
  Upload,
  Download,
  Settings,
  ArrowLeft,
  ChevronUp,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';

import {
  Box,
  Card,
  Chip,
  Paper,
  Table,
  Button,
  Select,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  Typography,
  CardContent,
  FormControl,
  InputAdornment,
  TableContainer,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for the statement
const mockStatement = {
  id: 1,
  statementName: 'Via matera, 39 - DF Method September [Da Pubblicare]',
  status: 'DRAFT',
  createdBy: 'Team | Domus',
  createdOn: 'Sep 30, 2025',
  lastSavedOn: 'Sep 30, 2025',
  dates: 'Sep 01, 2025 to Sep 30, 2025',
  grandTotal: 129.08,
  expensesAndExtras: -200.00,
  commissioniBookingConIVA: 0.00,
  commissioniOtaConIVAAirbnb: 165.91,
  rentalActivity: [
    {
      id: 1,
      listing: 'Stylish Roman Escape | Near Colosseum & Metro',
      channel: 'Airbnb',
      nights: 3,
      numberOfGuests: 2,
      checkInDate: '2025-09-27',
      checkOutDate: '2025-09-30',
      guest: 'Khade Hector',
      ricavoLordo: 366.60,
      commissioniBooki: 0.00,
    },
    {
      id: 2,
      listing: 'Stylish Roman Escape | Near Colosseum & Metro',
      channel: 'Airbnb',
      nights: 5,
      numberOfGuests: 2,
      checkInDate: '2025-09-21',
      checkOutDate: '2025-09-26',
      guest: 'Dominika Wąsiewicz',
      ricavoLordo: 540.00,
      commissioniBooki: 0.00,
    },
  ],
  expenses: [
    {
      id: 1,
      name: 'Leo',
      date: '2025-09-09',
      categories: '',
      listing: 'Stylish Roman Escape | Near Colosseum & Metro',
      reservation: '',
      amount: -200.00,
    },
  ],
  propertyOwner: {
    name: '',
    email: '',
    phone: '',
    address: '',
    taxNumber: '',
  },
  propertyManager: {
    name: 'Manuel Sciarria',
    email: 'info@domusferiae.com',
    phone: '+39 351 4882766',
    address: '',
    taxNumber: '',
  },
};

export default function StatementEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statement, setStatement] = useState(mockStatement);
  const [expensesExpanded, setExpensesExpanded] = useState(true);
  const [attachmentsExpanded, setAttachmentsExpanded] = useState(true);
  const [grandTotalExpanded, setGrandTotalExpanded] = useState(true);
  const [contactExpanded, setContactExpanded] = useState(true);
  const [propertyManagerExpanded, setPropertyManagerExpanded] = useState(true);

  const handleBack = () => {
    navigate('/owner-statements');
  };

  const handleSave = () => {
    console.log('Saving statement...');
  };

  const handlePublish = () => {
    console.log('Publishing statement...');
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setStatement(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as any),
        [field]: value,
      },
    }));
  };

  const totalNights = statement.rentalActivity.reduce((sum, activity) => sum + activity.nights, 0);
  const totalGuests = statement.rentalActivity.reduce((sum, activity) => sum + activity.numberOfGuests, 0);
  const totalRicavoLordo = statement.rentalActivity.reduce((sum, activity) => sum + activity.ricavoLordo, 0);
  const totalCommissioniBooki = statement.rentalActivity.reduce((sum, activity) => sum + activity.commissioniBooki, 0);

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowLeft size={24} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Statements
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <TextField
              value={statement.statementName}
              onChange={(e) => setStatement(prev => ({ ...prev, statementName: e.target.value }))}
              variant="outlined"
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  '& fieldset': { border: 'none' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Chip
                label={statement.status}
                size="small"
                sx={{ 
                  bgcolor: 'grey.300',
                  color: 'text.primary',
                  fontWeight: 600
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Created by: {statement.createdBy}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created on: {statement.createdOn}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last saved on: {statement.lastSavedOn}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton>
              <RefreshCw size={20} />
            </IconButton>
            <IconButton>
              <Settings size={20} />
            </IconButton>
            <Button variant="outlined" onClick={handleBack}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" onClick={handlePublish} startIcon={<Download size={16} />}>
              Publish
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<Filter size={16} />}>
            Filters
          </Button>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="1 listing" onDelete={() => {}} />
            <Chip label="From: 2025-09-01" onDelete={() => {}} />
            <Chip label="To: 2025-09-30" onDelete={() => {}} />
            <Chip label="Check-in" />
            <Chip label="14 channels" onDelete={() => {}} />
            <Chip label="3 reservation statuses" onDelete={() => {}} />
          </Box>
          <Typography variant="body2" color="error" sx={{ ml: 'auto', cursor: 'pointer' }}>
            Reset filters
          </Typography>
        </Box>
      </Paper>

      {/* Metrics */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Metrics
            </Typography>
            <IconButton>
              <Settings size={20} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                €{statement.grandTotal.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grand total
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main' }}>
                €{statement.expensesAndExtras.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Expenses & extras
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                €{statement.commissioniBookingConIVA.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Commissioni Booking Con IVA
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                €{statement.commissioniOtaConIVAAirbnb.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Commissioni Ota Con IVA Airbnb
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Rental Activity */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Rental activity
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button variant="contained" size="small">Per reservation</Button>
            <Button variant="outlined" size="small">Per listing</Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Listing</TableCell>
                  <TableCell>Channel</TableCell>
                  <TableCell>Nights</TableCell>
                  <TableCell>Number of guests</TableCell>
                  <TableCell>Check-in date</TableCell>
                  <TableCell>Check-out date</TableCell>
                  <TableCell>Guest</TableCell>
                  <TableCell>Ricavo Lordo</TableCell>
                  <TableCell>Commissioni Booki</TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <Settings size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statement.rentalActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                        {activity.listing}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, bgcolor: 'error.main', borderRadius: '50%' }} />
                        <Typography variant="body2">{activity.channel}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{activity.nights}</TableCell>
                    <TableCell>{activity.numberOfGuests}</TableCell>
                    <TableCell>{activity.checkInDate}</TableCell>
                    <TableCell>{activity.checkOutDate}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                        {activity.guest}
                      </Typography>
                    </TableCell>
                    <TableCell>€{activity.ricavoLordo.toFixed(2)}</TableCell>
                    <TableCell>€{activity.commissioniBooki.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <Eye size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell colSpan={2}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      TOTALS
                    </Typography>
                  </TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{totalGuests}</TableCell>
                  <TableCell colSpan={3} />
                  <TableCell>€{totalRicavoLordo.toFixed(2)}</TableCell>
                  <TableCell>€{totalCommissioniBooki.toFixed(2)}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Expenses and extras */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Expenses and extras
            </Typography>
            <IconButton onClick={() => setExpensesExpanded(!expensesExpanded)}>
              {expensesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          {expensesExpanded && (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Categories</TableCell>
                      <TableCell>Listing</TableCell>
                      <TableCell>Reservation</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <Settings size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statement.expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                            {expense.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>—</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                            {expense.listing}
                          </Typography>
                        </TableCell>
                        <TableCell>—</TableCell>
                        <TableCell sx={{ color: 'error.main' }}>
                          €{expense.amount.toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton size="small">
                              <Upload size={16} />
                            </IconButton>
                            <IconButton size="small">
                              <ChevronDown size={16} />
                            </IconButton>
                            <IconButton size="small">
                              <Settings size={16} />
                            </IconButton>
                            <IconButton size="small">
                              <Settings size={16} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell colSpan={5}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          TOTAL
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: 'error.main', fontWeight: 600 }}>
                        €{statement.expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" size="small">Hide all</Button>
                <Button variant="contained" size="small" startIcon={<Plus size={16} />}>
                  + Add expense
                </Button>
                <Button variant="contained" size="small" startIcon={<Plus size={16} />}>
                  + Add extra
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Attachments
            </Typography>
            <IconButton onClick={() => setAttachmentsExpanded(!attachmentsExpanded)}>
              {attachmentsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          {attachmentsExpanded && (
            <Box sx={{ 
              border: '2px dashed', 
              borderColor: 'grey.300', 
              borderRadius: 2, 
              p: 4, 
              textAlign: 'center' 
            }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Drop files to upload or
              </Typography>
              <Button variant="contained" sx={{ color: 'primary.main' }}>
                Browse
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Grand total */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Grand total
            </Typography>
            <IconButton onClick={() => setGrandTotalExpanded(!grandTotalExpanded)}>
              {grandTotalExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          {grandTotalExpanded && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: 'primary.main', borderRadius: '50%' }} />
                <FormControl sx={{ minWidth: 200 }}>
                  <Select value="guadagno-proprietario-dom">
                    <MenuItem value="guadagno-proprietario-dom">Guadagno Proprietario Dom</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  €329.08
                </Typography>
                <IconButton size="small">
                  <X size={16} color="#ef4444" />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: 'primary.main', borderRadius: '50%' }} />
                <Typography variant="body2">Expenses and Extras</Typography>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  -€200.00
                </Typography>
              </Box>
              <Typography variant="body2" color="primary.main" sx={{ cursor: 'pointer', mb: 2 }}>
                Apply % deduction
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  €129.08
                </Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      {/* Contact and statement details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Contact and statement details
            </Typography>
            <IconButton onClick={() => setContactExpanded(!contactExpanded)}>
              {contactExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          {contactExpanded && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Owners</Typography>
                <TextField
                  fullWidth
                  placeholder="Select owner..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2">▼</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                  Update
                </Button>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Owner name</Typography>
                <TextField fullWidth />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Owner email</Typography>
                <TextField fullWidth />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Owner phone</Typography>
                <TextField fullWidth />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Owner address</Typography>
                <TextField fullWidth />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Owner tax number/ID</Typography>
                <TextField fullWidth />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Property Manager Details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Property Manager Details
            </Typography>
            <IconButton onClick={() => setPropertyManagerExpanded(!propertyManagerExpanded)}>
              {propertyManagerExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Box>
          {propertyManagerExpanded && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Manager name</Typography>
                <TextField fullWidth value={statement.propertyManager.name} />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Manager email</Typography>
                <TextField fullWidth value={statement.propertyManager.email} />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Manager phone</Typography>
                <TextField fullWidth value={statement.propertyManager.phone} />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Manager address</Typography>
                <TextField fullWidth />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Property Manager tax number/ID</Typography>
                <TextField fullWidth />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Logo</Typography>
                <Button variant="contained" startIcon={<Upload size={16} />}>
                  Upload
                </Button>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <IconButton size="small">
                    <Settings size={16} />
                  </IconButton>
                  <IconButton size="small">
                    <X size={16} color="#ef4444" />
                  </IconButton>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Notes</Typography>
                <TextField fullWidth multiline rows={4} />
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>Invoice number</Typography>
                <TextField fullWidth />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </DashboardContent>
  );
}
