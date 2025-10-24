import 'src/global.css';

import { useEffect } from 'react';

import Fab from '@mui/material/Fab';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';
import { SocketProvider } from 'src/contexts/socket-context';
import { HostawayProvider } from 'src/contexts/hostaway-context';
import { ReservationsProvider } from 'src/contexts/reservations-context';
import { MessageQualityProvider } from 'src/contexts/message-quality-context';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  const githubButton = () => (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 48,
        height: 48,
        position: 'fixed',
        bgcolor: 'grey.800',
      }}
    >
      <Iconify width={24} icon="socials:github" sx={{ '--color': 'white' }} />
    </Fab>
  );

  return (
    <ThemeProvider>
      <MessageQualityProvider>
        <SocketProvider>
          <HostawayProvider>
            <ReservationsProvider>
              {children}
              {githubButton()}
            </ReservationsProvider>
          </HostawayProvider>
        </SocketProvider>
      </MessageQualityProvider>
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
