import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

// Function to filter navigation items based on user role
export const filterNavItemsByRole = (items: NavItem[], userRole: string): NavItem[] =>
  items.filter((item) => {
    // If no roles specified, item is visible to all
    if (!item.roles || item.roles.length === 0) {
      return true;
    }

    // Check if user role is in the allowed roles
    const hasAccess = item.roles.includes(userRole);

    // If item has children, filter them too
    if (hasAccess && item.children) {
      item.children = filterNavItemsByRole(item.children, userRole);
    }

    return hasAccess;
  });

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  badge?: {
    text: string;
    color: string;
  };
  children?: NavItem[];
  roles?: string[]; // Array of roles that can access this item
};

export const navData = [
  {
    title: 'Overview',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: icon('ic-chart'),
    children: [
      {
        title: 'Multi',
        path: '/calendar/multi',
        icon: icon('ic-chart'),
      },
      {
        title: 'Monthly',
        path: '/calendar/monthly',
        icon: icon('ic-chart'),
      },
      {
        title: 'Yearly',
        path: '/calendar/yearly',
        icon: icon('ic-chart'),
      },
    ],
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: icon('ic-message'),
    badge: {
      text: '3',
      color: '#FF8537',
    },
    children: [
      {
        title: 'Inbox',
        path: '/inbox',
        icon: icon('ic-message'),
      },
      {
        title: 'Message Templates',
        path: '/inbox/templates',
        icon: icon('ic-message'),
      },
      {
        title: 'Automations',
        path: '/inbox/automations',
        icon: icon('ic-message'),
      },
      {
        title: 'Manage Messages',
        path: '/inbox/manage',
        icon: icon('ic-message'),
      },
    ],
  },
  {
    title: 'Reservation',
    path: '/reservations',
    icon: icon('ic-cart'),
    children: [
      {
        title: 'Reservations',
        path: '/reservations',
        icon: icon('ic-cart'),
      },
      {
        title: 'Custom Fields',
        path: '/reservations/custom-fields',
        icon: icon('ic-cart'),
      },
      {
        title: 'Guestbook',
        path: '/reservations/guestbook',
        icon: icon('ic-cart'),
      },
      {
        title: 'Coupons',
        path: '/reservations/coupons',
        icon: icon('ic-cart'),
      },
    ],
  },
  {
    title: 'Listings',
    path: '/listings',
    icon: icon('ic-user'),
    children: [
      {
        title: 'Listings',
        path: '/listings',
        icon: icon('ic-user'),
      },
      {
        title: 'Custom Fields',
        path: '/listings/custom-fields',
        icon: icon('ic-user'),
      },
    ],
  },
  {
    title: 'Financial Reportings',
    path: '/financial-reportings',
    icon: icon('ic-reports'),
    children: [
      {
        title: 'Analytics',
        path: '/financial-reportings/analytics',
        icon: icon('ic-reports'),
      },
      {
        title: 'Rental Activity',
        path: '/financial-reportings/rental-activity',
        icon: icon('ic-reports'),
      },
      {
        title: 'Occupancy Report',
        path: '/financial-reportings/occupancy-report',
        icon: icon('ic-reports'),
      },
      {
        title: 'QuickBooks',
        path: '/financial-reportings/quickbooks',
        icon: icon('ic-reports'),
      },
    ],
  },
  {
    title: 'Expenses and Extras',
    path: '/expenses-extras',
    icon: icon('ic-blog'),
    badge: {
      text: 'New',
      color: '#FF8537',
    },
    children: [
      {
        title: 'Expenses',
        path: '/expenses-extras/expenses',
        icon: icon('ic-blog'),
      },
      {
        title: 'Extras',
        path: '/expenses-extras/extras',
        icon: icon('ic-blog'),
      },
      {
        title: 'Categories',
        path: '/expenses-extras/categories',
        icon: icon('ic-blog'),
      },
      {
        title: 'Automations',
        path: '/expenses-extras/automations',
        icon: icon('ic-blog'),
      },
    ],
  },
  {
    title: 'Owner Statements',
    path: '/owner-statements',
    icon: icon('ic-settings'),
    children: [
      {
        title: 'Statements',
        path: '/owner-statements',
        icon: icon('ic-settings'),
      },
      {
        title: 'Auto Statements',
        path: '/owner-statements/auto',
        icon: icon('ic-settings'),
      },
    ],
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: icon('ic-lock'),
    children: [
      {
        title: 'Manage Tasks',
        path: '/tasks',
        icon: icon('ic-lock'),
      },
      {
        title: 'Manage Auto-tasks',
        path: '/tasks/manage-auto-tasks',
        icon: icon('ic-lock'),
      },
      {
        title: 'Checklist Templates',
        path: '/tasks/checklist-templates',
        icon: icon('ic-lock'),
      },
      {
        title: 'Archive',
        path: '/tasks/archive',
        icon: icon('ic-lock'),
      },
      {
        title: 'Custom Fields',
        path: '/tasks/custom-fields',
        icon: icon('ic-lock'),
      },
    ],
  },
  {
    title: 'Reviews',
    path: '/reviews',
    icon: icon('ic-disabled'),
    children: [
      {
        title: 'Manage Reviews',
        path: '/reviews',
        icon: icon('ic-disabled'),
      },
      {
        title: 'Auto-reviews',
        path: '/reviews/auto-reviews',
        icon: icon('ic-disabled'),
        badge: {
          text: 'New',
          color: '#FF8537',
        },
      },
      {
        title: 'Review Templates',
        path: '/reviews/templates',
        icon: icon('ic-disabled'),
      },
    ],
  },
  {
    title: 'Guest Payments',
    path: '/guest-payments',
    icon: icon('ic-analytics'),
    children: [
      {
        title: 'Charges',
        path: '/guest-payments/charges',
        icon: icon('ic-analytics'),
      },
      {
        title: 'Auto-payments',
        path: '/guest-payments/auto-payments',
        icon: icon('ic-analytics'),
      },
      {
        title: 'Document Templates',
        path: '/guest-payments/document-templates',
        icon: icon('ic-analytics'),
      },
    ],
  },
  {
    title: 'Smart Locks',
    path: '/smart-locks',
    icon: icon('ic-chart'),
  },
  {
    title: 'Create Account',
    path: '/create-account',
    icon: icon('ic-user'),
    roles: ['user'], // Only super admin (user role) can see this
    badge: {
      text: 'New',
      color: '#FF8537',
    },
  },
  {
    title: 'User Management',
    path: '/user-management',
    icon: icon('ic-user'),
    roles: ['user'], // Only super admin (user role) can see this
  },
  {
    title: 'Client Management',
    path: '/client-management',
    icon: icon('ic-user'),
    roles: ['user'], // Only super admin (user role) can see this
  },
  {
    title: 'Supervisor Dashboard',
    path: '/supervisor-dashboard',
    icon: icon('ic-user'),
    roles: ['supervisor'], // Only Supervisors can see this
  },
  {
    title: 'Manager Dashboard',
    path: '/manager-dashboard',
    icon: icon('ic-user'),
    roles: ['manager'], // Only Managers can see this
  },
  {
    title: 'Associate Dashboard',
    path: '/associate-dashboard',
    icon: icon('ic-user'),
    roles: ['associate'], // Only Associates can see this
  },
  {
    title: 'Channel Manager',
    path: '/channel-manager',
    icon: icon('ic-message'),
    children: [
      {
        title: 'Listing Mapping',
        path: '/channel-manager/listing-mapping',
        icon: icon('ic-message'),
      },
      {
        title: 'Channels',
        path: '/channel-manager/channels',
        icon: icon('ic-message'),
      },
    ],
  },
  // {
  //   title: 'Booking Engine',
  //   path: '/booking-engine',
  //   icon: icon('ic-cart'),
  //   children: [
  //     {
  //       title: 'Design',
  //       path: '/booking-engine/design',
  //       icon: icon('ic-cart'),
  //     },
  //     {
  //       title: 'Listing',
  //       path: '/booking-engine/listing',
  //       icon: icon('ic-cart'),
  //     },
  //     {
  //       title: 'Pages',
  //       path: '/booking-engine/pages',
  //       icon: icon('ic-cart'),
  //     },
  //     {
  //       title: 'Settings',
  //       path: '/booking-engine/settings',
  //       icon: icon('ic-cart'),
  //     },
  //     {
  //       title: 'Translations',
  //       path: '/booking-engine/translations',
  //       icon: icon('ic-cart'),
  //     },
  //   ],
  // },
];
