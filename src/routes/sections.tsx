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
export const ManageTasksPage = lazy(() => import('src/sections/tasks/view/manage-tasks-view').then(module => ({ default: module.ManageTasksView })));
export const ManageAutoTasksPage = lazy(() => import('src/sections/tasks/view/manage-auto-tasks-view').then(module => ({ default: module.ManageAutoTasksView })));
export const ChecklistTemplatesPage = lazy(() => import('src/sections/tasks/view/checklist-templates-view').then(module => ({ default: module.ChecklistTemplatesView })));
export const ArchivePage = lazy(() => import('src/sections/tasks/view/archive-view').then(module => ({ default: module.ArchiveView })));
export const TasksCustomFieldsPage = lazy(() => import('src/sections/tasks/view/custom-fields-view').then(module => ({ default: module.CustomFieldsView })));
export const ManageReviewsPage = lazy(() => import('src/sections/reviews/view/manage-reviews-view').then(module => ({ default: module.ManageReviewsView })));
export const AutoReviewsPage = lazy(() => import('src/sections/reviews/view/auto-reviews-view').then(module => ({ default: module.AutoReviewsView })));
export const ReviewTemplatesPage = lazy(() => import('src/sections/reviews/view/review-templates-view').then(module => ({ default: module.ReviewTemplatesView })));
export const ChargesPage = lazy(() => import('src/sections/guest-payments/view/charges-view').then(module => ({ default: module.ChargesView })));
export const AutoPaymentsPage = lazy(() => import('src/sections/guest-payments/view/auto-payments-view').then(module => ({ default: module.AutoPaymentsView })));
export const DocumentTemplatesPage = lazy(() => import('src/sections/guest-payments/view/document-templates-view').then(module => ({ default: module.DocumentTemplatesView })));
export const SmartLocksPage = lazy(() => import('src/sections/smart-locks/view/smart-locks-view').then(module => ({ default: module.SmartLocksView })));
export const ListingMappingPage = lazy(() => import('src/sections/channel-manager/view/listing-mapping-view').then(module => ({ default: module.ListingMappingView })));
export const ChannelsPage = lazy(() => import('src/sections/channel-manager/view/channels-view').then(module => ({ default: module.ChannelsView })));
export const DesignPage = lazy(() => import('src/sections/booking-engine/view/design-view').then(module => ({ default: module.DesignView })));
export const BookingListingsPage = lazy(() => import('src/sections/booking-engine/view/listings-view').then(module => ({ default: module.ListingsView })));
export const BookingPagesPage = lazy(() => import('src/sections/booking-engine/view/pages-view').then(module => ({ default: module.PagesView })));
export const BookingSettingsPage = lazy(() => import('src/sections/booking-engine/view/settings-view').then(module => ({ default: module.SettingsView })));
export const TranslationsPage = lazy(() => import('src/sections/booking-engine/view/translations-view').then(module => ({ default: module.TranslationsView })));
export const InboxPage = lazy(() => import('src/sections/inbox/view/inbox-view').then(module => ({ default: module.InboxView })));
export const MessageTemplatesPage = lazy(() => import('src/sections/inbox/view/message-templates-view').then(module => ({ default: module.MessageTemplatesView })));
export const InboxAutomationsPage = lazy(() => import('src/sections/inbox/view/automations-view').then(module => ({ default: module.AutomationsView })));
export const ManageMessagesPage = lazy(() => import('src/sections/inbox/view/manage-messages-view').then(module => ({ default: module.ManageMessagesView })));
export const TemplateCreatePage = lazy(() => import('src/sections/inbox/view/template-create-view').then(module => ({ default: module.TemplateCreateView })));
export const TemplateEditPage = lazy(() => import('src/sections/inbox/view/template-edit-view').then(module => ({ default: module.TemplateEditView })));
export const TemplateGroupCreatePage = lazy(() => import('src/sections/inbox/view/template-group-create-view').then(module => ({ default: module.TemplateGroupCreateView })));
export const TemplateGroupEditPage = lazy(() => import('src/sections/inbox/view/template-group-edit-view').then(module => ({ default: module.TemplateGroupEditView })));
export const AutomationCreatePage = lazy(() => import('src/sections/inbox/view/automation-create-view').then(module => ({ default: module.AutomationCreateView })));
export const AutomationEditPage = lazy(() => import('src/sections/inbox/view/automation-edit-view').then(module => ({ default: module.AutomationEditView })));
export const MessageEditPage = lazy(() => import('src/sections/inbox/view/message-edit-view').then(module => ({ default: module.MessageEditView })));
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
      { path: 'tasks', element: <ManageTasksPage /> },
      { path: 'tasks/manage-tasks', element: <ManageTasksPage /> },
      { path: 'tasks/manage-auto-tasks', element: <ManageAutoTasksPage /> },
      { path: 'tasks/checklist-templates', element: <ChecklistTemplatesPage /> },
      { path: 'tasks/archive', element: <ArchivePage /> },
      { path: 'tasks/custom-fields', element: <TasksCustomFieldsPage /> },
      { path: 'reviews', element: <ManageReviewsPage /> },
      { path: 'reviews/manage-reviews', element: <ManageReviewsPage /> },
      { path: 'reviews/auto-reviews', element: <AutoReviewsPage /> },
      { path: 'reviews/templates', element: <ReviewTemplatesPage /> },
      { path: 'reviews/review-templates', element: <ReviewTemplatesPage /> },
      { path: 'guest-payments', element: <ChargesPage /> },
      { path: 'guest-payments/charges', element: <ChargesPage /> },
      { path: 'guest-payments/auto-payments', element: <AutoPaymentsPage /> },
      { path: 'guest-payments/document-templates', element: <DocumentTemplatesPage /> },
      { path: 'smart-locks', element: <SmartLocksPage /> },
      { path: 'channel-manager', element: <ListingMappingPage /> },
      { path: 'channel-manager/listing-mapping', element: <ListingMappingPage /> },
      { path: 'channel-manager/channels', element: <ChannelsPage /> },
      { path: 'booking-engine', element: <DesignPage /> },
      { path: 'booking-engine/design', element: <DesignPage /> },
      { path: 'booking-engine/listing', element: <BookingListingsPage /> },
      { path: 'booking-engine/listings', element: <BookingListingsPage /> },
      { path: 'booking-engine/pages', element: <BookingPagesPage /> },
      { path: 'booking-engine/settings', element: <BookingSettingsPage /> },
      { path: 'booking-engine/translations', element: <TranslationsPage /> },
      { path: 'inbox', element: <InboxPage /> },
      { path: 'inbox/templates', element: <MessageTemplatesPage /> },
      { path: 'inbox/message-templates', element: <MessageTemplatesPage /> },
      { path: 'inbox/automations', element: <InboxAutomationsPage /> },
      { path: 'inbox/manage', element: <ManageMessagesPage /> },
      { path: 'inbox/manage-messages', element: <ManageMessagesPage /> },
      { path: 'inbox/template-create', element: <TemplateCreatePage /> },
      { path: 'inbox/template-edit/:id', element: <TemplateEditPage /> },
      { path: 'inbox/template-group-create', element: <TemplateGroupCreatePage /> },
      { path: 'inbox/template-group-edit/:id', element: <TemplateGroupEditPage /> },
        { path: 'inbox/automation-create', element: <AutomationCreatePage /> },
        { path: 'inbox/automation-edit/:id', element: <AutomationEditPage /> },
        { path: 'inbox/message-edit/:id', element: <MessageEditPage /> },
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
