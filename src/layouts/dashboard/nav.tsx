import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { RouterLink } from 'src/routes/components';
import { useRouter, usePathname } from 'src/routes/hooks';

import { useSidebar } from 'src/contexts/sidebar-context';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { WorkspacesPopover } from '../components/workspaces-popover';

import type { NavItem } from '../nav-config-dashboard';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  collapsed?: boolean;
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();
  const { collapsed } = useSidebar();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: collapsed ? 1.5 : 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: collapsed ? 'var(--layout-nav-vertical-width-collapsed)' : 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        transition: theme.transitions.create(['width', 'padding'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} collapsed={collapsed} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, collapsed = false, sx }: NavContentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Auto-expand sections when current path matches a child
  useEffect(() => {
    const newExpanded = new Set<string>();
    data.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => child.path === pathname);
        if (hasActiveChild) {
          newExpanded.add(item.title);
        }
      }
    });
    setExpandedItems(newExpanded);
  }, [pathname, data]);

  const toggleExpanded = (itemTitle: string, item: NavItem) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemTitle)) {
      newExpanded.delete(itemTitle);
    } else {
      newExpanded.add(itemTitle);
      // If expanding and has children, navigate to the first child
      if (item.children && item.children.length > 0) {
        router.push(item.children[0].path);
      }
    }
    setExpandedItems(newExpanded);
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActived = item.path === pathname;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.title);

    return (
      <ListItem disableGutters disablePadding key={item.title}>
        <Box sx={{ width: '100%' }}>
          <ListItemButton
            disableGutters
            component={hasChildren ? 'div' : RouterLink}
            href={hasChildren ? undefined : item.path}
            onClick={hasChildren ? () => toggleExpanded(item.title, item) : undefined}
            sx={[
              (theme) => ({
                pl: collapsed ? 1.5 : 2 + level * 1.5,
                py: 1,
                gap: collapsed ? 0 : 2,
                pr: collapsed ? 1.5 : 1.5,
                borderRadius: 0.75,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: theme.vars.palette.text.secondary,
                minHeight: 44,
                justifyContent: collapsed ? 'center' : 'flex-start',
                ...(isActived && {
                  fontWeight: 'fontWeightSemiBold',
                  color: theme.vars.palette.primary.main,
                  bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                  '&:hover': {
                    bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                  },
                }),
              }),
            ]}
          >
            <Box component="span" sx={{ width: 24, height: 24 }}>
              {item.icon}
            </Box>

            {!collapsed && (
              <>
                <Box component="span" sx={{ flexGrow: 1 }}>
                  {item.title}
                </Box>

                {item.badge && (
                  <Chip
                    label={item.badge.text}
                    size="small"
                    sx={{
                      bgcolor: item.badge.color,
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      height: 20,
                      minWidth: 20,
                    }}
                  />
                )}

                {hasChildren && (
                  <IconButton
                    size="small"
                    sx={{
                      p: 0.5,
                      ml: 1,
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  >
                    <Iconify icon={"eva:arrow-right-fill" as any} width={16} />
                  </IconButton>
                )}

                {item.info && item.info}
              </>
            )}
          </ListItemButton>

          {hasChildren && !collapsed && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box
                component="ul"
                sx={{
                  gap: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  pl: 2,
                }}
              >
                {item.children?.map((child) => renderNavItem(child, level + 1))}
              </Box>
            </Collapse>
          )}
        </Box>
      </ListItem>
    );
  };

  return (
    <>
      <Logo collapsed={collapsed} />

      {slots?.topArea}

      {!collapsed && <WorkspacesPopover data={workspaces} sx={{ my: 2 }} />}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.map((item) => renderNavItem(item))}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      {/* Footer Social Media Icons */}
      {!collapsed && (
        <Box
          sx={{
            mt: 'auto',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Box
            component="a"
            href="#"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            <Iconify icon={"logos:apple" as any} width={20} />
          </Box>
          <Box
            component="a"
            href="#"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            <Iconify icon={"logos:google-play-icon" as any} width={20} />
          </Box>
          <Box
            component="a"
            href="#"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            <Iconify icon={"logos:twitter" as any} width={20} />
          </Box>
          <Box
            component="a"
            href="#"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            <Iconify icon={"logos:facebook" as any} width={20} />
          </Box>
          <Box
            component="a"
            href="#"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            <Iconify icon={"logos:linkedin-icon" as any} width={20} />
          </Box>
          <Box
            component="a"
            href="#"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            <Iconify icon={"logos:instagram-icon" as any} width={20} />
          </Box>
        </Box>
      )}
    </>
  );
}
