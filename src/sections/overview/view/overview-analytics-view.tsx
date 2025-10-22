import { useState, useEffect } from 'react';
import {
  Bot,
  Send,
  Star,
  Clock,
  Inbox,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

// Guest data
const guestData = [
  {
    id: '1',
    name: 'John Smith',
    status: 'Checking out',
    checkIn: 'Oct 25',
    checkOut: 'Oct 27',
    statusColor: 'success',
    hasCheckedOut: false,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    status: 'Checking out',
    checkIn: 'Oct 25',
    checkOut: 'Oct 27',
    statusColor: 'success',
    hasCheckedOut: false,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    status: 'Checking out',
    checkIn: 'Oct 25',
    checkOut: 'Oct 27',
    statusColor: 'success',
    hasCheckedOut: false,
  },
  {
    id: '4',
    name: 'Emily Davis',
    status: 'Arriving',
    checkIn: 'Oct 27',
    checkOut: 'Oct 29',
    statusColor: 'info',
    hasCheckedOut: false,
  },
  {
    id: '5',
    name: 'David Brown',
    status: 'Arriving',
    checkIn: 'Oct 27',
    checkOut: 'Oct 29',
    statusColor: 'info',
    hasCheckedOut: false,
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    status: 'Checked out',
    checkIn: 'Oct 20',
    checkOut: 'Oct 24',
    statusColor: 'default',
    hasCheckedOut: true,
  },
  {
    id: '7',
    name: 'Robert Taylor',
    status: 'Checked out',
    checkIn: 'Oct 18',
    checkOut: 'Oct 22',
    statusColor: 'default',
    hasCheckedOut: true,
  },
  {
    id: '8',
    name: 'Jennifer White',
    status: 'Checked out',
    checkIn: 'Oct 15',
    checkOut: 'Oct 19',
    statusColor: 'default',
    hasCheckedOut: true,
  },
  {
    id: '9',
    name: 'Michael Garcia',
    status: 'Checked out',
    checkIn: 'Oct 12',
    checkOut: 'Oct 16',
    statusColor: 'default',
    hasCheckedOut: true,
  },
  {
    id: '10',
    name: 'Amanda Martinez',
    status: 'Checked out',
    checkIn: 'Oct 10',
    checkOut: 'Oct 14',
    statusColor: 'default',
    hasCheckedOut: true,
  },
  {
    id: '11',
    name: 'Christopher Lee',
    status: 'Checked out',
    checkIn: 'Oct 8',
    checkOut: 'Oct 12',
    statusColor: 'default',
    hasCheckedOut: true,
  },
  {
    id: '12',
    name: 'Jessica Thompson',
    status: 'Checked out',
    checkIn: 'Oct 5',
    checkOut: 'Oct 9',
    statusColor: 'default',
    hasCheckedOut: true,
  },
];

export function OverviewAnalyticsView() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [guestPage, setGuestPage] = useState(1);
  const guestsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(guestData.length / guestsPerPage);
  const startIndex = (guestPage - 1) * guestsPerPage;
  const endIndex = startIndex + guestsPerPage;
  const currentGuests = guestData.slice(startIndex, endIndex);

  const handleGuestPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setGuestPage(value);
  };

  // Add CSS animations
  const animationStyles = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    @keyframes wiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-5deg); }
      75% { transform: rotate(5deg); }
    }
    @keyframes tick {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes sparkle {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
      25% { transform: scale(1.1) rotate(90deg); opacity: 0.8; }
      50% { transform: scale(1.2) rotate(180deg); opacity: 0.9; }
      75% { transform: scale(1.1) rotate(270deg); opacity: 0.8; }
    }
  `;

  // Mock data for carousel
  const featuredApps = [
    {
      id: 1,
      title: 'The Rise of Remote Work: Benefits and Challenges',
      description:
        'The aroma of freshly brewed coffee filled the air as Sarah sat down at her home office desk, ready to tackle another day of remote work.',
      category: 'FEATURED APP',
      image:
        'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp',
    },
    {
      id: 2,
      title: 'Understanding Blockchain Technology',
      description:
        'The children giggled with joy as they ran through the colorful playground, their laughter echoing across the park.',
      category: 'FEATURED APP',
      image:
        'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp',
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      description:
        'Discover the core concepts of machine learning and artificial intelligence in this comprehensive guide.',
      category: 'FEATURED APP',
      image:
        'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp',
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredApps.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredApps.length) % featuredApps.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredApps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredApps.length]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <DashboardContent maxWidth="xl">
      <style>{animationStyles}</style>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Dashboard Overview
      </Typography>

      {/* Top Row - Welcome Card and Featured App Side by Side */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left Card - Welcome Back */}
        <Grid size={{ xs: 12, md: 7.2 }}>
          <Card
            sx={{
              height: 280,
              background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/background/background-5.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <CardContent
              sx={{
                p: 3,
                position: 'relative',
                zIndex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, fontSize: '1.5rem' }}>
                    Welcome back 👋
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '2rem' }}>
                    Jaydon Frankie
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, maxWidth: 250, lineHeight: 1.5, fontSize: '0.9rem' }}
                  >
                    If you are going to use a passage of Lorem Ipsum, you need to be sure there
                    isn&apos;t anything embarrassing hidden in the middle of text.
                  </Typography>
                </Box>

                {/* SVG Illustration */}
                <Box sx={{ ml: 2, flexShrink: 0 }}>
                  <svg
                    width="250"
                    height="187"
                    viewBox="0 0 480 360"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ opacity: 0.8 }}
                  >
                    <path
                      fill="var(--primary-dark)"
                      fillRule="evenodd"
                      d="M109.224 97.41l.812 1.827-.02.009-.061.027-.248.112c-.219.1-.544.25-.968.449l-.849-1.811c.43-.202.762-.355.988-.457l.256-.117.066-.03.024-.01zm-6.771 3.278c.997-.507 1.901-.958 2.7-1.35l.882 1.795c-.791.388-1.687.835-2.675 1.337l-.907-1.782zm-5.356 2.808c.93-.502 1.82-.975 2.665-1.418l.929 1.771c-.838.439-1.72.909-2.644 1.407l-.95-1.76zm-5.274 2.927c.901-.513 1.779-1.007 2.63-1.479l.97 1.749c-.844.468-1.715.958-2.609 1.468l-.99-1.738zm-5.232 3.065c.887-.533 1.758-1.05 2.612-1.55l1.01 1.725c-.847.497-1.712 1.01-2.591 1.539l-1.03-1.714zm-5.117 3.16c.861-.546 1.713-1.079 2.555-1.599l1.05 1.702c-.834.516-1.68 1.044-2.534 1.586l-1.071-1.689zm-5.065 3.301a242.86 242.86 0 012.515-1.661l1.092 1.675a236.91 236.91 0 00-2.494 1.648l-1.113-1.662zm-4.978 3.431c.83-.589 1.66-1.168 2.484-1.736l1.134 1.646c-.817.564-1.638 1.137-2.461 1.721l-1.157-1.631zm-4.873 3.56a197.5 197.5 0 012.427-1.8l1.18 1.615c-.8.585-1.602 1.179-2.404 1.782l-1.203-1.597zm-4.771 3.71c.787-.632 1.576-1.256 2.366-1.87l1.228 1.579c-.782.608-1.563 1.225-2.342 1.85l-1.252-1.559zm-4.651 3.867c.765-.659 1.534-1.31 2.307-1.952l1.279 1.538c-.764.635-1.525 1.278-2.281 1.929l-1.305-1.515zm-4.51 4.035c.739-.688 1.485-1.368 2.236-2.04l1.333 1.491c-.742.664-1.478 1.335-2.208 2.013l-1.362-1.464zm-4.347 4.215a136.43 136.43 0 012.151-2.132l1.392 1.437c-.715.692-1.422 1.392-2.12 2.1l-1.423-1.405zm-4.157 4.411c.674-.751 1.359-1.495 2.053-2.231l1.455 1.371c-.683.725-1.356 1.457-2.019 2.196l-1.489-1.336zm-3.929 4.623c.633-.788 1.279-1.568 1.936-2.341l1.524 1.295a105.43 105.43 0 00-1.9 2.298l-1.56-1.252zm-3.657 4.848a94.278 94.278 0 011.793-2.455l1.596 1.205c-.6.794-1.185 1.595-1.754 2.403l-1.635-1.153zm-3.328 5.084a83.294 83.294 0 011.617-2.57l1.673 1.097a80.437 80.437 0 00-1.578 2.507l-1.712-1.034zm-2.94 5.341c.45-.907.922-1.806 1.414-2.698l1.752.965a69.62 69.62 0 00-1.375 2.623l-1.791-.89zm-2.465 5.583c.366-.948.755-1.889 1.168-2.823l1.83.808c-.4.906-.778 1.817-1.132 2.735l-1.866-.72zm-1.903 5.808c.265-.984.558-1.962.876-2.932l1.9.624a54.83 54.83 0 00-.845 2.828l-1.93-.52zm-1.253 5.993c.15-1.012.331-2.018.54-3.017l1.958.41a50.126 50.126 0 00-.52 2.901l-1.978-.294zm-.467 4.577c.028-.513.065-1.024.109-1.535l1.992.174c-.042.489-.077.98-.104 1.472-.028.496-.04.986-.037 1.469l-2 .014c-.003-.526.01-1.057.04-1.594zm.822 7.749a22.495 22.495 0 01-.643-3.074l1.982-.272c.131.959.328 1.892.585 2.801l-1.924.545zm2.498 5.699a23.889 23.889 0 01-1.444-2.77l1.83-.805c.382.867.824 1.713 1.324 2.538l-1.71 1.037zm3.777 4.87a30.2 30.2 0 01-2.019-2.327l1.578-1.23a28.113 28.113 0 001.885 2.173l-1.444 1.384zm4.602 4.048a41.441 41.441 0 01-2.349-1.902l1.316-1.506c.706.617 1.452 1.22 2.235 1.809l-1.202 1.599zm5.09 3.361a56.872 56.872 0 01-2.58-1.598l1.1-1.671a54.91 54.91 0 002.488 1.542l-1.008 1.727zm5.371 2.823a75.691 75.691 0 01-2.716-1.355l.929-1.771c.857.449 1.74.889 2.645 1.319l-.858 1.807zm5.542 2.408c-.95-.379-1.882-.766-2.794-1.162l.795-1.834c.894.387 1.807.767 2.74 1.138l-.741 1.858zm294.857-2.594c.244.101.598.253 1.048.457l-.828 1.821a31.67 31.67 0 00-1.241-.534l-.061-.025-.014-.005-.003-.001.357-.934.356-.934h.001l.002.001.006.002.021.008.075.03c.065.025.159.063.281.114zm-289.206 4.68c-.96-.329-1.906-.664-2.837-1.007l.692-1.877c.915.337 1.846.668 2.793.992l-.648 1.892zm293.015-2.865c.807.425 1.708.923 2.682 1.497l-1.016 1.723a62.506 62.506 0 00-2.598-1.45l.932-1.77zm-287.286 4.698c-.965-.289-1.918-.583-2.859-.884l.609-1.905c.928.296 1.87.587 2.824.873l-.574 1.916zm292.565-1.59a69.641 69.641 0 012.522 1.724l-1.165 1.626a66.44 66.44 0 00-2.449-1.674l1.092-1.676zM69.05 221.541c-.967-.256-1.924-.517-2.87-.783l.54-1.926c.938.264 1.885.522 2.842.776l-.512 1.933zm5.833 1.464c-.977-.233-1.945-.469-2.905-.709l.486-1.94c.952.238 1.912.472 2.881.703l-.462 1.946zm5.867 1.326c-.988-.213-1.97-.429-2.944-.649l.44-1.951c.968.219 1.943.434 2.925.645l-.42 1.955zm280.057-2.439a67.422 67.422 0 012.356 1.94l-1.306 1.515a65.709 65.709 0 00-2.286-1.883l1.236-1.572zM86.623 225.54a333.57 333.57 0 01-2.954-.595l.403-1.959c.973.201 1.952.398 2.937.591l-.386 1.963zm5.88 1.112c-.985-.179-1.967-.361-2.944-.546l.371-1.965c.973.184 1.95.365 2.931.543l-.357 1.968zm5.904 1.035c-.983-.167-1.963-.335-2.94-.506l.345-1.97c.973.17 1.95.338 2.93.504l-.335 1.972zm267.031-1.801a64.195 64.195 0 012.181 2.162l-1.442 1.386a63.013 63.013 0 00-2.113-2.095l1.374-1.453zm-261.112 2.771c-.989-.157-1.976-.316-2.959-.477l.323-1.974c.981.161 1.964.319 2.95.476l-.314 1.975zm5.919.916c-.99-.149-1.978-.3-2.965-.453l.306-1.976c.984.152 1.969.302 2.957.451l-.298 1.978zm5.92.873c-.987-.143-1.975-.287-2.961-.432l.292-1.979c.984.145 1.969.289 2.955.431l-.286 1.98zm5.929.84a781.94 781.94 0 01-2.965-.417l.281-1.98 2.96.417-.276 1.98zm5.927.818c-.987-.135-1.976-.27-2.965-.407l.273-1.981c.988.136 1.976.272 2.962.406l-.27 1.982zm241.664-1.8a62.33 62.33 0 011.957 2.359l-1.571 1.238a58.92 58.92 0 00-1.893-2.282l1.507-1.315zm-235.74 2.603l-2.957-.4.269-1.982 2.956.4-.268 1.982zm5.935.801l-2.964-.4.267-1.982 2.965.4-.268 1.982zm5.928.805l-2.977-.406.269-1.982 2.98.407-.272 1.981zm5.915.821l-2.962-.414.275-1.981c.993.138 1.982.276 2.966.415l-.279 1.98zm5.896.848c-.971-.143-1.948-.285-2.93-.426l.284-1.98c.985.142 1.964.284 2.937.427l-.291 1.979zm5.922.895c-.972-.151-1.952-.302-2.94-.451l.299-1.977c.99.149 1.973.3 2.949.452l-.308 1.976zm209.938-1.957a59.573 59.573 0 011.709 2.551l-1.69 1.069a56.139 56.139 0 00-1.651-2.463l1.632-1.157zm-204.034 2.911c-.974-.163-1.958-.325-2.952-.486l.319-1.974c.998.161 1.986.324 2.965.488l-.332 1.972zm5.881 1.035a369.37 369.37 0 00-2.965-.534l.346-1.97c1.006.177 2 .356 2.982.537l-.363 1.967zm5.85 1.143c-.972-.201-1.959-.399-2.961-.595l.383-1.963c1.009.197 2.004.397 2.984.6l-.406 1.958zm5.81 1.291c-.958-.228-1.935-.453-2.932-.674l.433-1.953c1.006.223 1.995.451 2.964.682l-.465 1.945zm5.75 1.497a126.97 126.97 0 00-2.901-.788l.502-1.936c1.006.261 1.988.527 2.947.8l-.548 1.924zm184.026-2.689c.494.881.972 1.787 1.431 2.718l-1.794.884a54.93 54.93 0 00-1.381-2.623l1.744-.979zm-178.387 4.477a83.817 83.817 0 00-2.858-.956l.602-1.907c1.007.317 1.983.643 2.926.978l-.67 1.885zm5.402 2.214a50.388 50.388 0 00-2.665-1.174l.755-1.852a52.08 52.08 0 012.773 1.222l-.863 1.804zm175.7-1.183c.397.928.775 1.88 1.132 2.854l-1.878.687a55.769 55.769 0 00-1.093-2.754l1.839-.787zm-171.918 3.282a27.52 27.52 0 00-1.18-.728l1.008-1.727c.438.255.86.515 1.266.781.386.252.788.506 1.206.763l-1.045 1.705a54.43 54.43 0 01-1.255-.794zm6.674 3.795a88.769 88.769 0 01-2.71-1.43l.964-1.752c.839.462 1.723.928 2.65 1.398l-.904 1.784zm167.354-1.314c.295.964.57 1.949.822 2.955l-1.94.486a56.86 56.86 0 00-.794-2.854l1.912-.587zm-161.766 3.964c-.978-.436-1.926-.872-2.842-1.305l.856-1.808c.902.427 1.836.856 2.801 1.287l-.815 1.826zm5.624 2.389c-.977-.396-1.932-.792-2.864-1.188l.781-1.841c.922.391 1.867.783 2.834 1.175l-.751 1.854zm5.702 2.219c-.979-.366-1.942-.734-2.887-1.101l.726-1.864c.936.364 1.891.728 2.863 1.092l-.702 1.873zm151.931-2.627c.195.988.367 1.994.517 3.019l-1.979.289a60 60 0 00-.5-2.921l1.962-.387zm-146.173 4.709a282.93 282.93 0 01-2.913-1.035l.68-1.881c.95.343 1.915.686 2.893 1.028l-.66 1.888zm5.793 1.961c-.989-.325-1.966-.651-2.932-.977l.642-1.895c.959.325 1.931.649 2.913.971l-.623 1.901zm5.808 1.851a366.91 366.91 0 01-2.928-.92l.607-1.905c.961.306 1.932.611 2.912.915l-.591 1.91zm135.458-2.462c.049.509.093 1.023.131 1.542a15.1 15.1 0 01.032 1.682l-1.998-.075c.017-.471.008-.958-.029-1.461a59 59 0 00-.127-1.495l1.991-.193zm-129.616 4.222a452.59 452.59 0 01-2.926-.869l.577-1.915c.963.29 1.934.578 2.911.864l-.562 1.92zm5.875 1.674c-.982-.272-1.957-.546-2.927-.823l.548-1.923c.965.275 1.936.548 2.913.819l-.534 1.927zm5.902 1.593a521.99 521.99 0 01-2.943-.783l.521-1.931c.972.262 1.949.522 2.93.779l-.508 1.935zm117.481-1.038a12.02 12.02 0 01-1.365 2.996l-1.691-1.069a9.965 9.965 0 001.139-2.499l1.917.572zm-111.556 2.55c-.993-.246-1.982-.495-2.968-.747l.495-1.938c.981.251 1.966.499 2.955.744l-.482 1.941zm5.937 1.432c-.995-.233-1.987-.469-2.977-.708l.469-1.944c.985.238 1.973.472 2.964.704l-.456 1.948zm5.954 1.352a461.96 461.96 0 01-2.98-.667l.443-1.95c.987.224 1.976.445 2.967.663l-.43 1.954zm5.976 1.272a440.55 440.55 0 01-2.989-.626l.416-1.956c.992.211 1.984.419 2.976.623l-.403 1.959zm90.244-1.087a17.352 17.352 0 01-2.54 1.996l-1.091-1.676a15.272 15.272 0 002.247-1.764l1.384 1.444zm-84.25 2.277c-1-.191-2.001-.386-3.002-.585l.39-1.962c.996.198 1.992.392 2.987.582l-.375 1.965zm6.003 1.101c-.999-.175-1.999-.355-3.001-.539l.361-1.967c.997.183 1.993.362 2.987.537l-.347 1.969zm72.9.168c-.911.427-1.878.819-2.897 1.178l-.663-1.887a29.338 29.338 0 002.71-1.102l.85 1.811zm-66.872.844c-1-.16-2.003-.324-3.007-.493l.33-1.972c1 .168 1.997.331 2.992.49l-.315 1.975zm6.051.913a350.993 350.993 0 01-3.025-.444l.299-1.977c1.006.152 2.009.299 3.007.441l-.281 1.98zm54.962.332c-.979.263-1.996.501-3.05.716l-.4-1.96a50.079 50.079 0 002.932-.688l.518 1.932zm-48.896.472a292.674 292.674 0 01-3.049-.39l.263-1.982c1.015.135 2.025.264 3.03.387l-.244 1.985zm6.076.684a273.234 273.234 0 01-3.058-.328l.224-1.987c1.019.115 2.031.223 3.037.325l-.203 1.99zm36.729.101c-.989.152-2.005.287-3.047.406l-.226-1.988a74.52 74.52 0 002.968-.395l.305 1.977zm-30.642.446a247.153 247.153 0 01-3.048-.255l.18-1.992c1.015.091 2.023.176 3.023.253l-.155 1.994zm6.099.39a193.964 193.964 0 01-3.036-.173l.128-1.995c1.012.064 2.015.122 3.007.171l-.099 1.997zm18.393-.133c-.991.079-2.002.144-3.032.196l-.101-1.997a107.33 107.33 0 002.975-.193l.158 1.994zm-12.279.337a175.75 175.75 0 01-3.028-.075l.067-1.999c1.01.034 2.008.059 2.993.075l-.032 1.999zm6.131-.023c-.993.025-2.002.039-3.025.043l-.007-2c1.009-.004 2.003-.018 2.981-.043l.051 2z"
                      clipRule="evenodd"
                      opacity="0.24"
                    />
                    <path
                      fill="#fff"
                      d="M47.943 122.571L96.231 273.55a11.4 11.4 0 0011.786 7.805l63.326-5.36 148.013-12.644a11.316 11.316 0 009.904-7.823c.456-1.421.627-2.918.503-4.405a12.314 12.314 0 00-.729-3.122l-11.838-31.221-21.412-57.238-16.599-44.23a11.37 11.37 0 00-10.641-7.362H58.741a11.345 11.345 0 00-11.344 11.343c.016 1.114.2 2.219.546 3.278z"
                    />
                    <path
                      fill="#fff"
                      d="M47.943 122.571L96.231 273.55a11.4 11.4 0 0011.786 7.805l63.326-5.36 148.013-12.644a11.316 11.316 0 009.904-7.823c.456-1.421.627-2.918.503-4.405a12.314 12.314 0 00-.729-3.122l-11.838-31.221-21.412-57.238-16.599-44.23a11.37 11.37 0 00-10.641-7.362H58.741a11.345 11.345 0 00-11.344 11.343c.016 1.114.2 2.219.546 3.278z"
                    />
                    <path
                      fill="url(#paint0_linear_1_51)"
                      d="M170.575 276.06l-62.558 5.295a11.4 11.4 0 01-11.785-7.805L47.942 122.571a11.028 11.028 0 01-.546-3.278A11.34 11.34 0 0158.74 107.95h57.453l54.382 168.11z"
                    />
                    <path
                      fill="#F4F6F8"
                      d="M227.879 191.221c2.613-.162 4.368-2.749 3.553-5.237l-8.483-25.895a4.002 4.002 0 00-3.993-2.75l-61.621 2.961c-2.666.128-4.461 2.782-3.588 5.304l9.248 26.717a3.999 3.999 0 004.028 2.683l60.856-3.783z"
                    />
                    <path
                      fill="#DFE3E8"
                      d="M244.879 239.221c2.613-.162 4.368-2.749 3.553-5.237l-8.483-25.895a4.002 4.002 0 00-3.993-2.75l-61.621 2.961c-2.666.128-4.461 2.782-3.588 5.304l9.248 26.717a3.999 3.999 0 004.028 2.683l60.856-3.783z"
                    />
                    <g filter="url(#filter0_f_1_51)" opacity="0.4">
                      <path
                        fill="#919EAB"
                        d="M253.012 134.539l15.948 52.893a4.007 4.007 0 003.903 2.94l39.559-1.142a2 2 0 001.816-2.7l-20.001-53.4a2 2 0 00-1.755-1.295l-35.906-2.109a3.612 3.612 0 00-3.059 1.461 3.614 3.614 0 00-.505 3.352z"
                      />
                    </g>
                    <path
                      fill="#fff"
                      d="M330.082 174.424l-16.495-46.701a4.03 4.03 0 00-3.512-2.732l-69.518-4.111a3.676 3.676 0 00-3.061 1.481 3.663 3.663 0 00-.53 3.358l15.949 52.92a4.057 4.057 0 003.902 2.966l70.091-2.108a3.663 3.663 0 002.898-1.716 3.667 3.667 0 00.276-3.357z"
                    />
                    <path
                      fill="var(--primary-dark)"
                      d="M295.375 166.976c.478 1.237.718 1.856 1.229 2.206.511.351 1.174.351 2.501.351h.32c2.648 0 3.972 0 4.568-.87.596-.869.118-2.104-.837-4.574l-6.427-16.612c-.479-1.238-.719-1.856-1.23-2.207-.511-.35-1.174-.35-2.501-.35h-.32c-2.648 0-3.972 0-4.568.87-.596.869-.118 2.104.837 4.573l6.428 16.613z"
                    />
                    <g opacity="0.48">
                      <path
                        fill="url(#paint1_linear_1_51)"
                        d="M306.33 166.969c.478 1.241.717 1.861 1.228 2.212.512.351 1.176.351 2.505.351h.314c2.649 0 3.973 0 4.569-.869.596-.87.118-2.105-.839-4.574l-1.586-4.099c-.479-1.237-.718-1.855-1.229-2.205-.511-.351-1.175-.351-2.501-.351h-.305c-2.644 0-3.966 0-4.562.868-.596.868-.121 2.102.829 4.569l1.577 4.098z"
                      />
                      <path
                        fill="url(#paint2_linear_1_51)"
                        d="M284.397 166.971c.478 1.24.717 1.86 1.228 2.211.512.351 1.176.351 2.505.351h.315c2.648 0 3.973 0 4.568-.87.596-.87.118-2.105-.838-4.575l-2.705-6.986c-.479-1.237-.718-1.855-1.229-2.205-.511-.35-1.175-.35-2.501-.35h-.303c-2.645 0-3.967 0-4.563.868-.596.868-.12 2.102.831 4.57l2.692 6.986z"
                      />
                      <path
                        fill="url(#paint3_linear_1_51)"
                        d="M273.442 166.976c.479 1.237.718 1.856 1.229 2.206.511.351 1.175.351 2.502.351h.32c2.648 0 3.972 0 4.568-.87.596-.869.118-2.104-.838-4.574l-9.445-24.417c-.479-1.238-.718-1.856-1.229-2.207-.511-.35-1.175-.35-2.502-.35h-.32c-2.648 0-3.972 0-4.568.869-.596.87-.118 2.104.837 4.574l9.446 24.418z"
                      />
                      <path
                        fill="url(#paint4_linear_1_51)"
                        d="M262.463 166.974c.479 1.239.718 1.858 1.229 2.208.511.351 1.175.351 2.502.351h.322c2.647 0 3.97 0 4.566-.869.596-.869.119-2.104-.835-4.573l-12.935-33.472c-.479-1.238-.718-1.857-1.229-2.207-.511-.351-1.175-.351-2.502-.351h-.322c-2.647 0-3.97 0-4.566.869-.596.869-.119 2.104.835 4.573l12.935 33.471z"
                      />
                    </g>
                    <g fill="#fff" fillRule="evenodd" clipRule="evenodd" opacity="0.4">
                      <path d="M78.02 155.171a15.22 15.22 0 11.312 1.015l-.156-.495-.157-.52zm15.194-4.189l-3.59-11.525a12.641 12.641 0 013.121-.547 12.102 12.102 0 0111.994 8.456c.312 1.014.496 2.062.546 3.122a13.006 13.006 0 01-.286 3.148 11.815 11.815 0 01-2.914 5.516 11.914 11.914 0 01-11.525 3.59 13.21 13.21 0 01-2.94-1.067 12.76 12.76 0 01-2.602-1.821 12.257 12.257 0 01-3.33-5.203l11.526-3.669zM111.296 251.773a15.298 15.298 0 0129.321-8.429v.494c0 .156 0 .338.182.494a15.272 15.272 0 01-28.619 10.407c-.078-.247-.149-.495-.221-.742a28.499 28.499 0 00-.221-.741 16.041 16.041 0 01-.171-.595 10.734 10.734 0 00-.271-.888zm11.187-14.7l3.746 11.474.079-.026 3.746 11.5a11.965 11.965 0 006.921-6.01 11.83 11.83 0 001.04-2.966c.23-1.024.317-2.075.26-3.122a12.07 12.07 0 00-9.548-11.188 12.42 12.42 0 00-6.244.338zM100.21 187.509a15.272 15.272 0 00-4.473 10.799v1.066a15.272 15.272 0 1030.544 0v-1.066a15.271 15.271 0 00-26.071-10.799zm10.591 11.293V186.73c2.112.016 4.183.581 6.01 1.639a11.366 11.366 0 012.602 1.925 12.027 12.027 0 01-.005 17.068 12.022 12.022 0 01-5.433 3.096 11.575 11.575 0 01-6.244 0 12.202 12.202 0 01-2.914-1.171l5.984-10.485z" />
                    </g>
                    <path
                      fill="url(#paint5_linear_1_51)"
                      d="M151.154 76h-41.55l12.645 7.727L151.154 76z"
                    />
                    <path
                      fill="url(#paint6_linear_1_51)"
                      d="M151.154 76l-26.668 12.332 4.501 15.715L151.154 76z"
                    />
                    <path
                      fill="url(#paint7_linear_1_51)"
                      d="M117.435 95.279l7.051-6.947L151.154 76 117.435 95.28z"
                    />
                    <path
                      fill="var(--primary-dark)"
                      d="M117.435 95.279l7.051-6.947L151.154 76l-28.905 7.727-4.814 11.552z"
                    />
                    <defs>
                      <filter
                        id="filter0_f_1_51"
                        width="101.56"
                        height="100.65"
                        x="232.807"
                        y="109.722"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_1_51" stdDeviation="10" />
                      </filter>
                      <linearGradient
                        id="paint0_linear_1_51"
                        x1="47.397"
                        x2="47.397"
                        y1="107.95"
                        y2="281.395"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1_51"
                        x1="248.43"
                        x2="248.43"
                        y1="128.061"
                        y2="169.533"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_1_51"
                        x1="248.43"
                        x2="248.43"
                        y1="128.061"
                        y2="169.533"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_1_51"
                        x1="248.43"
                        x2="248.43"
                        y1="128.061"
                        y2="169.533"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_1_51"
                        x1="248.43"
                        x2="248.43"
                        y1="128.061"
                        y2="169.533"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_1_51"
                        x1="109.604"
                        x2="109.604"
                        y1="76"
                        y2="104.047"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_1_51"
                        x1="109.604"
                        x2="109.604"
                        y1="76"
                        y2="104.047"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_1_51"
                        x1="109.604"
                        x2="109.604"
                        y1="76"
                        y2="104.047"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="var(--primary-light)" />
                        <stop offset="1" stopColor="var(--primary-dark)" />
                      </linearGradient>
                    </defs>
                    <image
                      href="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/illustrations/characters/character-present.webp"
                      height="280"
                      x="320"
                      y="40"
                    />
                  </svg>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 16px rgba(76,175,80,0.4)',
                    '&:hover': {
                      backgroundColor: '#45a049',
                      boxShadow: '0 6px 20px rgba(76,175,80,0.5)',
                    },
                  }}
                >
                  Go now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Card - Featured App */}
        <Grid size={{ xs: 12, md: 4.8 }}>
          <Card
            sx={{
              height: 280,
              background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${featuredApps[currentSlide]?.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              transition: 'background-image 0.5s ease-in-out',
            }}
          >
            <CardContent
              sx={{
                p: 3,
                position: 'relative',
                zIndex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Top section - Navigation dots on the left */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
                  {featuredApps.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => handleDotClick(index)}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor:
                          currentSlide === index ? '#4caf50' : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor:
                            currentSlide === index ? '#4caf50' : 'rgba(255,255,255,0.5)',
                          transform: 'scale(1.2)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Bottom section - Text on left, arrows on right */}
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
              >
                {/* Content on the left */}
                <Box sx={{ flex: 1, maxWidth: '70%' }}>
                  <Chip
                    label={featuredApps[currentSlide]?.category}
                    sx={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.65rem',
                      mb: 1.5,
                      height: 20,
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ mb: 1.5, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2 }}
                  >
                    {featuredApps[currentSlide]?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, lineHeight: 1.4, fontSize: '0.8rem' }}
                  >
                    {featuredApps[currentSlide]?.description}
                  </Typography>
                </Box>

                {/* Navigation arrows on the right */}
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton
                    onClick={handlePrevSlide}
                    size="small"
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      width: 28,
                      height: 28,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                    }}
                  >
                    <ChevronLeft size={16} />
                  </IconButton>
                  <IconButton
                    onClick={handleNextSlide}
                    size="small"
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      width: 28,
                      height: 28,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                    }}
                  >
                    <ChevronRight size={16} />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Row - Two main cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Left Card - Recent Reservations Table */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader title="Recent Reservations" />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
              <Box
                sx={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  flex: 1,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '3px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '3px',
                    '&:hover': {
                      background: '#a8a8a8',
                    },
                  },
                }}
              >
                <Table>
                  <TableHead
                    sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}
                  >
                    <TableRow>
                      <TableCell>Guest Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Check-in</TableCell>
                      <TableCell>Check-out</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentGuests.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                fontWeight: 600,
                              }}
                            >
                              {reservation.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {reservation.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={reservation.status}
                            color={reservation.statusColor as any}
                            size="small"
                            sx={{ borderRadius: 2 }}
                          />
                        </TableCell>
                        <TableCell>{reservation.checkIn}</TableCell>
                        <TableCell>
                          {reservation.hasCheckedOut ? reservation.checkOut : 'Staying'}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <MoreVertical size={16} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Showing {startIndex + 1}-{Math.min(endIndex, guestData.length)} of{' '}
                  {guestData.length} guests
                </Typography>
                <Pagination
                  count={totalPages}
                  page={guestPage}
                  onChange={handleGuestPageChange}
                  size="small"
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Card - Message Analytics */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardHeader title="Message Analytics" />
            <CardContent>
              <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="Today" />
                <Tab label="Week" />
                <Tab label="Month" />
              </Tabs>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {(() => {
                  // Dynamic data based on selected tab
                  const messageAnalyticsData = {
                    0: {
                      // Today
                      sent: { value: '156', trend: '+12%', trendColor: '#4caf50' },
                      received: { value: '89', trend: '-3%', trendColor: '#f44336' },
                      automation: { value: '67%', trend: '+10%', trendColor: '#4caf50' },
                      responseTime: { value: '2.3h', trend: '-15%', trendColor: '#4caf50' },
                      satisfaction: { value: '4.8', trend: '+5%', trendColor: '#4caf50' },
                    },
                    1: {
                      // Week
                      sent: { value: '1,247', trend: '+18%', trendColor: '#4caf50' },
                      received: { value: '892', trend: '+8%', trendColor: '#4caf50' },
                      automation: { value: '72%', trend: '+15%', trendColor: '#4caf50' },
                      responseTime: { value: '1.8h', trend: '-22%', trendColor: '#4caf50' },
                      satisfaction: { value: '4.9', trend: '+8%', trendColor: '#4caf50' },
                    },
                    2: {
                      // Month
                      sent: { value: '5,234', trend: '+25%', trendColor: '#4caf50' },
                      received: { value: '3,891', trend: '+12%', trendColor: '#4caf50' },
                      automation: { value: '78%', trend: '+20%', trendColor: '#4caf50' },
                      responseTime: { value: '1.5h', trend: '-30%', trendColor: '#4caf50' },
                      satisfaction: { value: '4.9', trend: '+12%', trendColor: '#4caf50' },
                    },
                  };

                  const currentData =
                    messageAnalyticsData[activeTab as keyof typeof messageAnalyticsData];

                  return [
                    {
                      name: 'Messages Sent',
                      icon: <Send size={20} style={{ animation: 'pulse 2s infinite' }} />,
                      value: currentData.sent.value,
                      trend: currentData.sent.trend,
                      trendColor: currentData.sent.trendColor,
                    },
                    {
                      name: 'Messages Received',
                      icon: <Inbox size={20} style={{ animation: 'bounce 2s infinite' }} />,
                      value: currentData.received.value,
                      trend: currentData.received.trend,
                      trendColor: currentData.received.trendColor,
                    },
                    {
                      name: 'Automation Rate',
                      icon: <Bot size={20} style={{ animation: 'wiggle 3s infinite' }} />,
                      value: currentData.automation.value,
                      trend: currentData.automation.trend,
                      trendColor: currentData.automation.trendColor,
                    },
                    {
                      name: 'Response Time',
                      icon: <Clock size={20} style={{ animation: 'tick 1s infinite' }} />,
                      value: currentData.responseTime.value,
                      trend: currentData.responseTime.trend,
                      trendColor: currentData.responseTime.trendColor,
                    },
                    {
                      name: 'Satisfaction',
                      icon: <Star size={20} style={{ animation: 'sparkle 2s infinite' }} />,
                      value: currentData.satisfaction.value,
                      trend: currentData.satisfaction.trend,
                      trendColor: currentData.satisfaction.trendColor,
                    },
                  ];
                })().map((metric, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>{metric.icon}</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {metric.name}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {metric.value}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TrendingUp size={12} color={metric.trendColor} />
                      <Typography
                        variant="caption"
                        sx={{ color: metric.trendColor, fontWeight: 500 }}
                      >
                        {metric.trend}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row - Three cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Top Performing Properties */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardHeader title="Top Performing Properties" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  {
                    name: 'Luxury Villa Rome',
                    image:
                      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp',
                    revenue: '$12,450',
                    bookings: '24',
                  },
                  {
                    name: 'Modern Apartment Milan',
                    image:
                      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp',
                    revenue: '$8,920',
                    bookings: '18',
                  },
                  {
                    name: 'Cozy Studio Florence',
                    image:
                      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp',
                    revenue: '$6,750',
                    bookings: '15',
                  },
                  {
                    name: 'Beach House Naples',
                    image:
                      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-5.webp',
                    revenue: '$5,680',
                    bookings: '12',
                  },
                  {
                    name: 'Mountain Cabin Turin',
                    image:
                      'https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-6.webp',
                    revenue: '$4,320',
                    bookings: '9',
                  },
                ].map((property, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundImage: `url('${property.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: '2px solid #e0e0e0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {property.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {property.bookings} bookings
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#4caf50' }}>
                      {property.revenue}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Guest Reviews */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
              backgroundColor: '#ffffff',
            }}
          >
            <CardHeader
              title="Top reviewers"
              sx={{
                pb: 2,
                px: 3,
                pt: 3,
                '& .MuiCardHeader-title': {
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  letterSpacing: '-0.01em',
                },
              }}
            />
            <CardContent sx={{ px: 3, py: 0 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {[
                  {
                    name: 'Alexandra Kirkland',
                    avatar: 'AK',
                    rating: 5,
                    reviews: '12',
                    avatarColor: '#667eea',
                  },
                  {
                    name: 'Monica Dovarch',
                    avatar: 'MD',
                    rating: 5,
                    reviews: '8',
                    avatarColor: '#f093fb',
                  },
                  {
                    name: 'Yury Burman',
                    avatar: 'YB',
                    rating: 4,
                    reviews: '6',
                    avatarColor: '#4facfe',
                  },
                ].map((reviewer, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        background: reviewer.avatarColor,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      {reviewer.avatar}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: '#1a1a1a',
                          fontSize: '0.95rem',
                          mb: 0.5,
                        }}
                      >
                        {reviewer.name}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography sx={{ fontSize: '0.8rem', color: '#ffc107' }}>⭐</Typography>
                          <Typography variant="caption" sx={{ color: '#666', fontSize: '0.8rem' }}>
                            {reviewer.rating}/5
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#ccc', fontSize: '0.8rem' }}>•</Typography>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.8rem' }}>
                          {reviewer.reviews} reviews
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            {/* Check-in Card */}
            <Card
              sx={{
                background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage:
                    'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  opacity: 0.3,
                }}
              />

              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  p: 3,
                }}
              >
                {/* Left Side - Circular Progress */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={33} // 33% Guest Check-ins
                    size={80}
                    thickness={4}
                    sx={{
                      color: '#4caf50',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      33%
                    </Typography>
                  </Box>
                </Box>

                {/* Right Side - Data */}
                <Box sx={{ textAlign: 'right', flex: 1, ml: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '2.2rem', mb: 0.5 }}>
                    138
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.9, fontSize: '1rem', fontWeight: 500 }}
                  >
                    Guest Check-ins
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Revenue Card */}
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage:
                    'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  opacity: 0.3,
                }}
              />

              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  p: 3,
                }}
              >
                {/* Left Side - Circular Progress */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={32} // 32% Total Revenue
                    size={80}
                    thickness={4}
                    sx={{
                      color: '#2196f3',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      32%
                    </Typography>
                  </Box>
                </Box>

                {/* Right Side - Data */}
                <Box sx={{ textAlign: 'right', flex: 1, ml: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '2.2rem', mb: 0.5 }}>
                    $89,183.86
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.9, fontSize: '1rem', fontWeight: 500 }}
                  >
                    Total Revenue
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Confirmed Card */}
            <Card
              sx={{
                background: 'linear-gradient(135deg, #f57c00 0%, #e65100 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage:
                    'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  opacity: 0.3,
                }}
              />

              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  p: 3,
                }}
              >
                {/* Left Side - Circular Progress */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={11} // 11% Confirmed reservations
                    size={80}
                    thickness={4}
                    sx={{
                      color: '#ff9800',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      11%
                    </Typography>
                  </Box>
                </Box>

                {/* Right Side - Data */}
                <Box sx={{ textAlign: 'right', flex: 1, ml: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '2.2rem', mb: 0.5 }}>
                    101
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.9, fontSize: '1rem', fontWeight: 500 }}
                  >
                    Confirmed reservations
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Avg Revenue Card */}
            <Card
              sx={{
                background: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage:
                    'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  opacity: 0.3,
                }}
              />

              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  position: 'relative',
                  p: 3,
                }}
              >
                {/* Left Side - Circular Progress */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={0} // 0% Avg. revenue per guest
                    size={80}
                    thickness={4}
                    sx={{
                      color: '#9c27b0',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      0%
                    </Typography>
                  </Box>
                </Box>

                {/* Right Side - Data */}
                <Box sx={{ textAlign: 'right', flex: 1, ml: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '2.2rem', mb: 0.5 }}>
                    $646.26
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.9, fontSize: '1rem', fontWeight: 500 }}
                  >
                    Avg. revenue per guest
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
