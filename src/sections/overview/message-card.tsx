import type { CardProps } from '@mui/material/Card';
import type { PaletteColorKey } from 'src/theme/core';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

type MessageCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: PaletteColorKey;
  variant?: 'default' | 'highlight';
  sx?: CardProps['sx'];
} & Omit<CardProps, 'sx' | 'variant'>;

export function MessageCard({ title, value, subtitle, icon, color = 'primary', variant = 'default', sx, ...other }: MessageCardProps) {
  const theme = useTheme();

  if (variant === 'highlight') {
    return (
      <Card
        sx={[
          () => ({
            p: 3,
            boxShadow: 'none',
            position: 'relative',
            color: 'primary.contrastText',
            backgroundColor: 'primary.main',
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box sx={{ width: 48, height: 48, mb: 3 }}>
          {icon || <Box sx={{ fontSize: 24 }}>💬</Box>}
        </Box>

        <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>
        
        <Box sx={{ typography: 'h4', mb: 1 }}>{value}</Box>
        
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {subtitle}
          </Typography>
        )}

        <SvgColor
          src="/assets/background/shape-square.svg"
          sx={{
            top: 0,
            left: -20,
            width: 240,
            zIndex: -1,
            height: 240,
            opacity: 0.24,
            position: 'absolute',
            color: 'primary.main',
          }}
        />
      </Card>
    );
  }

  return (
    <Card
      sx={[
        () => ({
          p: 3,
          boxShadow: 'none',
          position: 'relative',
          color: `${color}.darker`,
          backgroundColor: 'common.white',
          backgroundImage: `linear-gradient(135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)})`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>
        {icon || <Box sx={{ fontSize: 24 }}>📤</Box>}
      </Box>

      <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>
      
      <Box sx={{ typography: 'h4', mb: 1 }}>{value}</Box>
      
      {subtitle && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      )}

      <SvgColor
        src="/assets/background/shape-square.svg"
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}
