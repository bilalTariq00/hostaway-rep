import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
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
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: icon('ic-message'),
  },
  {
    title: 'Reservation',
    path: '/reservation',
    icon: icon('ic-cart'),
  },
  {
    title: 'Listings',
    path: '/listings',
    icon: icon('ic-user'),
  },
  {
    title: 'Financial Reportings',
    path: '/financial-reportings',
    icon: icon('ic-reports'),
  },
  {
    title: 'Expenses and Extras',
    path: '/expenses-extras',
    icon: icon('ic-blog'),
  },
  {
    title: 'Owner Statements',
    path: '/owner-statements',
    icon: icon('ic-settings'),
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: icon('ic-lock'),
  },
  {
    title: 'Reviews',
    path: '/reviews',
    icon: icon('ic-disabled'),
  },
  {
    title: 'Guest Payments',
    path: '/guest-payments',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Smart Locks',
    path: '/smart-locks',
    icon: icon('ic-chart'),
  },
  {
    title: 'Channel Manager',
    path: '/channel-manager',
    icon: icon('ic-message'),
  },
  {
    title: 'Booking Engine',
    path: '/booking-engine',
    icon: icon('ic-cart'),
  },
];
