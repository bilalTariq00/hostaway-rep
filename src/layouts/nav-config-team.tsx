import { SvgColor } from 'src/components/svg-color';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: icon('ic-analytics'),
  analytics: icon('ic-analytics'),
  team: icon('ic-user'),
};

export const teamNavData = [
  { title: 'Dashboard', path: '/team-dashboard', icon: ICONS.dashboard },
  { title: 'Analytics', path: '/team-dashboard/analytics', icon: ICONS.analytics },
  { title: 'Team Management', path: '/team-dashboard/team', icon: ICONS.team },
];