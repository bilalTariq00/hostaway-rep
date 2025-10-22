import type { Theme, SxProps } from '@mui/material/styles';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { useSidebar } from 'src/contexts/sidebar-context';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type SidebarToggleProps = {
  sx?: SxProps<Theme>;
};

export function SidebarToggle({ sx }: SidebarToggleProps) {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
      <IconButton
        onClick={toggleSidebar}
        sx={[
          {
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'grey.300',
            color: 'grey.600',
            position: 'absolute',
            zIndex: 99999,
            transition: 'all 0.2s ease-in-out',
            // Position the button exactly on the sidebar border
            left: -39, // Custom positioning as requested
            top: '50%',
            transform: 'translateY(-50%)',
            '&:hover': {
              backgroundColor: 'grey.50',
              borderColor: 'grey.400',
              color: 'grey.800',
              transform: 'translateY(-50%) scale(1.05)',
            },
            '&:active': {
              transform: 'translateY(-50%) scale(0.95)',
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Iconify
          icon={(collapsed ? 'solar:arrow-right-bold' : 'solar:arrow-left-bold') as any}
          width={16}
        />
      </IconButton>
    </Tooltip>
  );
}
