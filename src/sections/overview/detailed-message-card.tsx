import type { CardProps } from '@mui/material/Card';
import type { PaletteColorKey } from 'src/theme/core';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

type MessageData = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: string;
};

type DetailedMessageCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  badgeText: string;
  badgeColor: string;
  data?: MessageData[];
  variant: 'first6' | 'last1';
  color?: PaletteColorKey;
  profitLoss?: {
    value: number;
    isPositive: boolean;
  };
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  sx?: CardProps['sx'];
} & Omit<CardProps, 'sx' | 'variant'>;

export function DetailedMessageCard({
  title,
  value,
  subtitle,
  badgeText,
  badgeColor,
  data,
  variant,
  color = 'primary',
  profitLoss,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  sx,
  ...other
}: DetailedMessageCardProps) {
  const theme = useTheme();
  const renderDataList = () => {
    if (!data || data.length === 0) return null;

    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    return (
      <>
        <List sx={{ mt: 2 }}>
          {currentPageData.map((item, index) => (
            <ListItem key={item.id} sx={{ px: 0, cursor: 'pointer' }}>
              <ListItemAvatar>
                <Avatar src={item.avatar} sx={{ width: 32, height: 32 }}>
                  {item.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {item.lastMessage || item.timestamp || 'No recent messages'}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => onPageChange?.(page)}
              size="small"
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: variant === 'last1' ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
                  '&.Mui-selected': {
                    backgroundColor:
                      variant === 'last1' ? 'rgba(255, 255, 255, 0.2)' : 'primary.main',
                    color: variant === 'last1' ? 'white' : 'primary.contrastText',
                    '&:hover': {
                      backgroundColor:
                        variant === 'last1' ? 'rgba(255, 255, 255, 0.3)' : 'primary.dark',
                    },
                  },
                  '&:hover': {
                    backgroundColor:
                      variant === 'last1' ? 'rgba(255, 255, 255, 0.1)' : 'action.hover',
                  },
                },
              }}
            />
          </Box>
        )}
      </>
    );
  };

  const renderProfitLoss = () => {
    if (!profitLoss) return null;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
        <Iconify
          icon={profitLoss.isPositive ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
          width={16}
          sx={{ color: profitLoss.isPositive ? 'success.main' : 'error.main' }}
        />
        <Typography
          variant="caption"
          sx={{
            color: profitLoss.isPositive ? 'success.main' : 'error.main',
            fontWeight: 600,
          }}
        >
          {profitLoss.isPositive ? '+' : ''}
          {profitLoss.value}%
        </Typography>
      </Box>
    );
  };

  if (variant === 'last1') {
    return (
      <Card
        sx={[
          () => ({
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
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
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'inherit' }}>
              {title}
            </Typography>
            <Tooltip title={`Information about ${title}`}>
              <IconButton size="small" sx={{ p: 0.5, color: 'inherit' }}>
                <Iconify icon={'eva:info-outline' as any} width={16} />
              </IconButton>
            </Tooltip>
          </Box>
          <Chip
            label={badgeText}
            size="small"
            sx={{
              bgcolor: badgeColor,
              color: 'white',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Value */}
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'inherit', mb: 2 }}>
          {value}
        </Typography>

        {/* Data List */}
        {renderDataList()}

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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Tooltip title={`Information about ${title}`}>
            <IconButton size="small" sx={{ p: 0.5 }}>
              <Iconify icon={'eva:info-outline' as any} width={16} />
            </IconButton>
          </Tooltip>
        </Box>
        <Chip
          label={badgeText}
          size="small"
          sx={{
            bgcolor: badgeColor,
            color: 'white',
            fontWeight: 500,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      {/* Value and Subtitle */}
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
          {subtitle}
        </Typography>
        {renderProfitLoss()}
      </Box>

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
