import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { HeaderSection } from 'src/layouts/core';

// ----------------------------------------------------------------------

export default function AnalyticsPage() {
  return (
    <>
      <HeaderSection>
        <Typography variant="h4">Analytics</Typography>
      </HeaderSection>

      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          <Card>
            <CardHeader title="Traffic Overview" />
            <Box sx={{ p: 3 }}>
              <Typography variant="h3" color="primary.main">
                12,345
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total visitors this month
              </Typography>
            </Box>
          </Card>

          <Card>
            <CardHeader title="Conversion Rate" />
            <Box sx={{ p: 3 }}>
              <Typography variant="h3" color="success.main">
                3.2%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average conversion rate
              </Typography>
            </Box>
          </Card>

          <Card>
            <CardHeader title="Revenue" />
            <Box sx={{ p: 3 }}>
              <Typography variant="h3" color="info.main">
                $45,678
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total revenue this month
              </Typography>
            </Box>
          </Card>

          <Card>
            <CardHeader title="Active Users" />
            <Box sx={{ p: 3 }}>
              <Typography variant="h3" color="warning.main">
                8,901
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Currently active users
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}
