import React, { useState } from 'react';
import {
  Plus,
  Link2,
  Trash2,
  Upload,
  Monitor,
  Calendar,
  Download,
  ArrowLeft,
  Building2,
  FileCheck,
  DollarSign,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

// Mock data for Airbnb users
const mockUsers = [
  {
    id: 1,
    name: 'Manuel Sciarria',
    email: 'manuelsciarria@gmail.com',
    propertyId: '203040869',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 2,
    name: 'Franca Albertini',
    email: 'franca.albertini@example.com',
    propertyId: '203040870',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 3,
    name: 'Christian Mariani',
    email: 'christian.mariani@example.com',
    propertyId: '203040871',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 4,
    name: 'Roni Efrati',
    email: 'roni.efrati@example.com',
    propertyId: '203040872',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 5,
    name: 'Andrea Baldi',
    email: 'andrea.baldi@example.com',
    propertyId: '203040873',
    avatar:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 6,
    name: 'Micol Misano',
    email: 'micol.misano@example.com',
    propertyId: '203040874',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 7,
    name: 'Addy Ferro',
    email: 'addy.ferro@example.com',
    propertyId: '203040875',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
];

export function AirbnbView() {
  const router = useRouter();
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [createListingModalOpen, setCreateListingModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleBack = () => {
    router.push('/channel-manager/channels');
  };

  const handleAction = (action: string, user: any) => {
    switch (action) {
      case 'Create new listing':
        setCreateListingModalOpen(true);
        break;
      case 'Export listings':
        console.log('Export listings for:', user.name);
        break;
      case 'Import & mapping':
        setTermsModalOpen(true);
        break;
      case 'Remove':
        console.log('Remove user:', user.name);
        break;
      default:
        console.log(`${action} for ${user.name}`);
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <IconButton onClick={handleBack} sx={{ color: 'text.secondary' }}>
            <ArrowLeft size={20} />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Channels
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: '#FF5A5F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                alt="Airbnb"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#FF5A5F' }}>
              Airbnb accounts
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => setTermsModalOpen(true)}
              sx={{ textTransform: 'none', bgcolor: '#00A699' }}
            >
              Connect existing Airbnb account
            </Button>
            <Button
              variant="outlined"
              disabled
              sx={{
                textTransform: 'none',
                borderColor: '#E0E0E0',
                color: '#BDBDBD',
                cursor: 'not-allowed',
              }}
            >
              Create new Airbnb account
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Accounts List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockUsers.map((user) => (
          <Card
            key={user.id}
            sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'grey.200' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 48, height: 48 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: '#4CAF50',
                      border: '2px solid white',
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ({user.propertyId})
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Plus size={14} />}
                  sx={{ textTransform: 'none', bgcolor: '#00A699', fontSize: '0.75rem' }}
                  onClick={() => handleAction('Create new listing', user)}
                >
                  Create new listing (beta)
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Download size={14} />}
                  sx={{ textTransform: 'none', bgcolor: '#00A699', fontSize: '0.75rem' }}
                  onClick={() => handleAction('Export listings', user)}
                >
                  Export listings
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Upload size={14} />}
                  sx={{ textTransform: 'none', bgcolor: '#00A699', fontSize: '0.75rem' }}
                  onClick={() => handleAction('Import & mapping', user)}
                >
                  Import & mapping
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Trash2 size={14} />}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#9E9E9E',
                    color: '#424242',
                    fontSize: '0.75rem',
                  }}
                  onClick={() => handleAction('Remove', user)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Terms Confirmation Modal */}
      <Dialog
        open={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            bgcolor: '#F8F9FA',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: 'center', mb: 2, color: '#333' }}
          >
            Please confirm the next statements to continue
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', lineHeight: 1.6 }}
          >
            The following Hostaway terms of services apply to the use of the Hostaway software
            including all channel connections and 3rd party connections.
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                <Monitor size={12} color="#666" />
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                Once Airbnb is connected, Hostaway is the Master Calendar for the property.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                <FileCheck size={12} color="#666" />
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                After importing my listings, I will check that the Hostaway calendar matches my
                Airbnb calendar.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                <Building2 size={12} color="#666" />
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                Only fully owned listings can be imported. Co-hosted listings will not show in the
                import menu.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                <Calendar size={12} color="#666" />
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                The Airbnb connection allows a maximum of 2 years of future updates to be set and
                synchronized.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                <Link2 size={12} color="#666" />
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                Internally in Airbnb linked listings will unlink during connection. I can use the
                Hostaway Cross Listings feature to link them in Hostaway after import.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                <DollarSign size={12} color="#666" />
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                Airbnb recommends the hosts to use the Host full commission fee model in the Airbnb
                accounts. After connection my account will be switched to this model. If I do not
                wish to be on this commission model, I will change this setting back in Airbnb under
                Account - payment - service fee settings.
              </Typography>
            </Box>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                sx={{
                  '&.Mui-checked': {
                    color: '#00A699',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                I agree to Hostaway{' '}
                <Typography
                  component="span"
                  sx={{
                    color: '#00A699',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  terms & conditions
                </Typography>
              </Typography>
            }
            sx={{ mt: 3, mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 4, gap: 2, justifyContent: 'center' }}>
          <Button
            onClick={() => setTermsModalOpen(false)}
            sx={{
              textTransform: 'none',
              color: '#666',
              bgcolor: '#E0E0E0',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#D0D0D0',
              },
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            disabled={!agreedToTerms}
            onClick={() => setTermsModalOpen(false)}
            sx={{
              textTransform: 'none',
              bgcolor: agreedToTerms ? '#FF5A5F' : '#E0E0E0',
              color: agreedToTerms ? 'white' : '#999',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: agreedToTerms ? '#E53E3E' : '#E0E0E0',
              },
            }}
          >
            Connect with Airbnb
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Listing Modal */}
      <Dialog
        open={createListingModalOpen}
        onClose={() => setCreateListingModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            bgcolor: 'white',
          },
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', color: '#333' }}>
            Please select a listing to create it on Airbnb
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 1 }}>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select listing or type to search</InputLabel>
              <Select
                value={selectedListing}
                label="Select listing or type to search"
                onChange={(e) => setSelectedListing(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF5A5F',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF5A5F',
                  },
                }}
              >
                <MenuItem value="listing1">La Dimora Del Cavaliere (305034)</MenuItem>
                <MenuItem value="listing2">Navigli (305035)</MenuItem>
                <MenuItem value="listing3">Polacchi42 (305225)</MenuItem>
                <MenuItem value="listing4">Superattico - Via Del Corso 43 (305421)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2, justifyContent: 'flex-end' }}>
          <Button
            onClick={() => setCreateListingModalOpen(false)}
            sx={{
              textTransform: 'none',
              color: '#00A699',
              bgcolor: '#F0F9F8',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#E0F2F1',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => setCreateListingModalOpen(false)}
            sx={{
              textTransform: 'none',
              bgcolor: '#FF5A5F',
              px: 3,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#E53E3E',
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
