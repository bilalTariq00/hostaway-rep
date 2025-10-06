import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const SettingsPage = lazy(() => import('src/pages/settings'));
export const ReportsPage = lazy(() => import('src/pages/reports'));
export const AnalyticsPage = lazy(() => import('src/pages/analytics'));
export const MessagesPage = lazy(() => import('src/pages/messages'));
export const CalendarMultiPage = lazy(() => import('src/sections/calendar/view/calendar-multi-view').then(module => ({ default: module.CalendarMultiView })));
export const CalendarMonthlyPage = lazy(() => import('src/sections/calendar/view/calendar-monthly-view').then(module => ({ default: module.CalendarMonthlyView })));
export const CalendarYearlyPage = lazy(() => import('src/sections/calendar/view/calendar-yearly-view').then(module => ({ default: module.CalendarYearlyView })));
export const ReservationsPage = lazy(() => import('src/sections/reservations/view/reservations-view').then(module => ({ default: module.ReservationsView })));
export const CustomFieldsPage = lazy(() => import('src/sections/reservations/view/custom-fields-view').then(module => ({ default: module.CustomFieldsView })));
export const GuestbookPage = lazy(() => import('src/sections/reservations/view/guestbook-view').then(module => ({ default: module.GuestbookView })));
export const CouponsPage = lazy(() => import('src/sections/reservations/view/coupons-view').then(module => ({ default: module.CouponsView })));
export const ListingsPage = lazy(() => import('src/sections/listings/view/listings-view').then(module => ({ default: module.ListingsView })));
export const ListingsCustomFieldsPage = lazy(() => import('src/sections/listings/view/listings-custom-fields-view').then(module => ({ default: module.ListingsCustomFieldsView })));
export const FinancialAnalyticsPage = lazy(() => import('src/sections/financial-reporting/view/analytics-view').then(module => ({ default: module.AnalyticsView })));
export const RentalActivityPage = lazy(() => import('src/sections/financial-reporting/view/rental-activity-view').then(module => ({ default: module.RentalActivityView })));
export const OccupancyReportPage = lazy(() => import('src/sections/financial-reporting/view/occupancy-report-view').then(module => ({ default: module.OccupancyReportView })));
export const QuickBooksPage = lazy(() => import('src/sections/financial-reporting/view/quickbooks-view').then(module => ({ default: module.QuickBooksView })));
export const ExpensesPage = lazy(() => import('src/sections/expenses/view/expenses-view').then(module => ({ default: module.ExpensesView })));
export const ExtrasPage = lazy(() => import('src/sections/expenses/view/extras-view').then(module => ({ default: module.ExtrasView })));
export const CategoriesPage = lazy(() => import('src/sections/expenses/view/categories-view').then(module => ({ default: module.CategoriesView })));
export const AutomationsPage = lazy(() => import('src/sections/expenses/view/automations-view').then(module => ({ default: module.AutomationsView })));
export const StatementsPage = lazy(() => import('src/sections/statements/view/statements-view').then(module => ({ default: module.StatementsView })));
export const AutoStatementsPage = lazy(() => import('src/sections/statements/view/auto-statements-view').then(module => ({ default: module.AutoStatementsView })));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'calendar', element: <CalendarMultiPage /> },
      { path: 'calendar/multi', element: <CalendarMultiPage /> },
      { path: 'calendar/monthly', element: <CalendarMonthlyPage /> },
      { path: 'calendar/yearly', element: <CalendarYearlyPage /> },
      { path: 'reservations', element: <ReservationsPage /> },
      { path: 'reservations/custom-fields', element: <CustomFieldsPage /> },
      { path: 'reservations/guestbook', element: <GuestbookPage /> },
      { path: 'reservations/coupons', element: <CouponsPage /> },
      { path: 'listings', element: <ListingsPage /> },
      { path: 'listings/custom-fields', element: <ListingsCustomFieldsPage /> },
      { path: 'financial-reportings', element: <FinancialAnalyticsPage /> },
      { path: 'financial-reportings/analytics', element: <FinancialAnalyticsPage /> },
      { path: 'financial-reportings/rental-activity', element: <RentalActivityPage /> },
      { path: 'financial-reportings/occupancy-report', element: <OccupancyReportPage /> },
      { path: 'financial-reportings/quickbooks', element: <QuickBooksPage /> },
      { path: 'expenses-extras', element: <ExpensesPage /> },
      { path: 'expenses-extras/expenses', element: <ExpensesPage /> },
      { path: 'expenses-extras/extras', element: <ExtrasPage /> },
      { path: 'expenses-extras/categories', element: <CategoriesPage /> },
      { path: 'expenses-extras/automations', element: <AutomationsPage /> },
      { path: 'owner-statements', element: <StatementsPage /> },
      { path: 'owner-statements/statements', element: <StatementsPage /> },
      { path: 'owner-statements/auto', element: <AutoStatementsPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
