import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { HeaderSection } from 'src/layouts/core';

// ----------------------------------------------------------------------

export default function ReportsPage() {
  return (
    <>
      <HeaderSection>
        <Typography variant="h4">Reports</Typography>
      </HeaderSection>

      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Card>
          <CardHeader 
            title="Sales Report" 
            action={
              <Button variant="contained" size="small">
                Generate
              </Button>
            }
          />
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              View detailed sales analytics and performance metrics.
            </Typography>
          </Box>
        </Card>

        <Card>
          <CardHeader 
            title="User Activity Report" 
            action={
              <Button variant="contained" size="small">
                Generate
              </Button>
            }
          />
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Track user engagement and activity patterns.
            </Typography>
          </Box>
        </Card>

        <Card>
          <CardHeader 
            title="Financial Report" 
            action={
              <Button variant="contained" size="small">
                Generate
              </Button>
            }
          />
          <Box sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Comprehensive financial overview and analysis.
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}
