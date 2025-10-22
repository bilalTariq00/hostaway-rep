import { useState } from 'react';

import {
  Box,
  Grid,
  Button,
  Dialog,
  Accordion,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

type ManageDatesModalProps = {
  dates: {
    date: string;
    listingId: number;
  };
  open: boolean;
  onClose: () => void;
};

export function ManageDatesModal({ dates, open, onClose }: ManageDatesModalProps) {
  const [startDate, setStartDate] = useState(dates.date);
  const [endDate, setEndDate] = useState(dates.date);
  const [pricing, setPricing] = useState({
    basePrice: 120,
    weekendPrice: 150,
    monthlyDiscount: 10,
  });
  const [availability, setAvailability] = useState({
    minStay: 1,
    maxStay: 30,
    advanceNotice: 1,
  });
  const [ruleSets, setRuleSets] = useState({
    cancellationPolicy: 'moderate',
    houseRules: 'No smoking, No pets',
  });
  const [calendarNote, setCalendarNote] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving dates:', {
      startDate,
      endDate,
      pricing,
      availability,
      ruleSets,
      calendarNote,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Manage Dates</Typography>
          <IconButton onClick={onClose}>
            <Iconify icon={'eva:close-fill' as any} width={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Date Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Selected Date Range
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Collapsible Sections */}
        <Box sx={{ mb: 3 }}>
          {/* Pricing */}
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<Iconify icon={'eva:arrow-down-fill' as any} width={20} />}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Pricing
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Base Price"
                    type="number"
                    value={pricing.basePrice}
                    onChange={(e) => setPricing({ ...pricing, basePrice: Number(e.target.value) })}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Weekend Price"
                    type="number"
                    value={pricing.weekendPrice}
                    onChange={(e) =>
                      setPricing({ ...pricing, weekendPrice: Number(e.target.value) })
                    }
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Monthly Discount (%)"
                    type="number"
                    value={pricing.monthlyDiscount}
                    onChange={(e) =>
                      setPricing({ ...pricing, monthlyDiscount: Number(e.target.value) })
                    }
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>,
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Availability */}
          <Accordion>
            <AccordionSummary
              expandIcon={<Iconify icon={'eva:arrow-down-fill' as any} width={20} />}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Availability
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Minimum Stay"
                    type="number"
                    value={availability.minStay}
                    onChange={(e) =>
                      setAvailability({ ...availability, minStay: Number(e.target.value) })
                    }
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>nights</Typography>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Maximum Stay"
                    type="number"
                    value={availability.maxStay}
                    onChange={(e) =>
                      setAvailability({ ...availability, maxStay: Number(e.target.value) })
                    }
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>nights</Typography>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Advance Notice"
                    type="number"
                    value={availability.advanceNotice}
                    onChange={(e) =>
                      setAvailability({ ...availability, advanceNotice: Number(e.target.value) })
                    }
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 1 }}>days</Typography>,
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Rule Sets */}
          <Accordion>
            <AccordionSummary
              expandIcon={<Iconify icon={'eva:arrow-down-fill' as any} width={20} />}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Rule Sets
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label="Cancellation Policy"
                    value={ruleSets.cancellationPolicy}
                    onChange={(e) =>
                      setRuleSets({ ...ruleSets, cancellationPolicy: e.target.value })
                    }
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="flexible">Flexible</option>
                    <option value="moderate">Moderate</option>
                    <option value="strict">Strict</option>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="House Rules"
                    multiline
                    rows={2}
                    value={ruleSets.houseRules}
                    onChange={(e) => setRuleSets({ ...ruleSets, houseRules: e.target.value })}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Calendar Note */}
          <Accordion>
            <AccordionSummary
              expandIcon={<Iconify icon={'eva:arrow-down-fill' as any} width={20} />}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Calendar Note
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add a note for this date range..."
                value={calendarNote}
                onChange={(e) => setCalendarNote(e.target.value)}
              />
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
