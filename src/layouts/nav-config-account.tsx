import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Home',
    href: '/',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'Profile',
    href: '#',
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  },
];

// Function to filter account menu items based on user role
export const filterAccountItemsByRole = (items: AccountPopoverProps['data'], userRole?: string): AccountPopoverProps['data'] => {
  if (!userRole || !items) return items || [];
  
  return items.filter((item) => {
    // Show all items for super admin
    if (userRole === 'super-admin') {
      return true;
    }
    
    // For regular users, hide certain items if needed
    // For now, show all items to all users
    return true;
  });
};
