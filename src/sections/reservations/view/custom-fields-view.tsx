
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// Mock data for custom fields
const mockCustomFields = [
  {
    id: 1,
    name: 'Guest ID Number',
    type: 'Text',
    publicVariable: 'guest_id_number',
  },
  {
    id: 2,
    name: 'Special Requests',
    type: 'Text Area',
    publicVariable: 'special_requests',
  },
  {
    id: 3,
    name: 'Emergency Contact',
    type: 'Text',
    publicVariable: 'emergency_contact',
  },
  {
    id: 4,
    name: 'Dietary Restrictions',
    type: 'Dropdown',
    publicVariable: 'dietary_restrictions',
  },
  {
    id: 5,
    name: 'Check-in Time Preference',
    type: 'Time',
    publicVariable: 'checkin_time_preference',
  },
];

export function CustomFieldsView() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/reservations');
  };

  const handleEdit = (id: number) => {
    console.log('Edit custom field:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete custom field:', id);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
            <Iconify icon={"eva:arrow-left-fill" as any} />
          </IconButton>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Reservations
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Custom Fields
          </Typography>
          <Button variant="contained">
            Add Custom Field
          </Button>
        </Box>
      </Box>

      {/* Custom Fields Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Public Variable</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockCustomFields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {field.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {field.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 0.5 }}>
                      {field.publicVariable}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => handleEdit(field.id)}>
                        <Iconify icon={"eva:edit-fill" as any} width={16} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(field.id)}>
                        <Iconify icon={"eva:close-fill" as any} width={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </DashboardContent>
  );
}
