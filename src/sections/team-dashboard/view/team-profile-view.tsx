import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Mail,
  User,
  Heart,
  Share,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Briefcase,
  Instagram,
  MoreVertical,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { _myAccount } from 'src/_mock';

// ----------------------------------------------------------------------

// Mock team member data
const teamMembers = [
  {
    id: '1',
    name: 'Jaydon Frankie',
    role: 'CTO',
    email: 'jaydon.frankie@hostaway.com',
    phone: '+1 (555) 123-4567',
    location: 'United Kingdom',
    company: 'Gleichner, Mueller and Tromp',
    education: 'Studied at Nikolaus - Leuschke',
    avatar: 'JF',
    bannerColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    about:
      'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
    social: {
      facebook: 'https://www.facebook.com/frankie',
      instagram: 'https://www.instagram.com/frankie',
      linkedin: 'https://www.linkedin.com/in/frankie',
      twitter: 'https://www.twitter.com/frankie',
    },
    stats: {
      followers: 1947,
      following: 9124,
      posts: 156,
    },
    recentPost: {
      content:
        'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
      image: '/assets/team-post-image.jpg',
      likes: 20,
      comments: 5,
      date: '15 Oct 2025',
    },
  },
  {
    id: '2',
    name: 'Harrison Stein',
    role: 'Team Leader',
    email: 'harrison.stein@hostaway.com',
    phone: '+1 (555) 234-5678',
    location: 'United States',
    company: 'Tech Innovations Inc',
    education: 'Studied at MIT',
    avatar: 'HS',
    bannerColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    about:
      'Passionate about technology and innovation. Leading teams to create amazing products that make a difference.',
    social: {
      facebook: 'https://www.facebook.com/harrison',
      instagram: 'https://www.instagram.com/harrison',
      linkedin: 'https://www.linkedin.com/in/harrison',
      twitter: 'https://www.twitter.com/harrison',
    },
    stats: {
      followers: 6980,
      following: 8490,
      posts: 203,
    },
    recentPost: {
      content:
        'Just finished an amazing project with the team! The collaboration and creativity were incredible.',
      image: '/assets/team-post-image2.jpg',
      likes: 45,
      comments: 12,
      date: '12 Oct 2025',
    },
  },
  {
    id: '3',
    name: 'Reece Chung',
    role: 'Software Developer',
    email: 'reece.chung@hostaway.com',
    phone: '+1 (555) 345-6789',
    location: 'Canada',
    company: 'Digital Solutions Ltd',
    education: 'Studied at University of Toronto',
    avatar: 'RC',
    bannerColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    about:
      'Full-stack developer with a passion for clean code and user experience. Always learning new technologies.',
    social: {
      facebook: 'https://www.facebook.com/reece',
      instagram: 'https://www.instagram.com/reece',
      linkedin: 'https://www.linkedin.com/in/reece',
      twitter: 'https://www.twitter.com/reece',
    },
    stats: {
      followers: 8490,
      following: 2030,
      posts: 336,
    },
    recentPost: {
      content:
        'Debugging is like being a detective in a crime movie where you are also the murderer.',
      image: '/assets/team-post-image3.jpg',
      likes: 67,
      comments: 23,
      date: '10 Oct 2025',
    },
  },
];

export function TeamProfileView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [newPost, setNewPost] = useState(''); // Post content state - updated

  // Find the team member by ID
  const member = teamMembers.find((m) => m.id === id) || teamMembers[0];

  const handleBack = () => {
    navigate('/team-dashboard/team');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePost = () => {
    if (newPost.trim()) {
      // Handle post submission
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  return (
    <Container maxWidth="xl">
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="#"
          onClick={() => navigate('/team-dashboard')}
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Dashboard
        </Link>
        <Link
          color="inherit"
          href="#"
          onClick={() => navigate('/team-dashboard/team')}
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          User
        </Link>
        <Typography color="text.primary">{member.name}</Typography>
      </Breadcrumbs>

      {/* Profile Header */}
      <Card sx={{ mb: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            height: 200,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            p: 3,
          }}
        >
          <img
            src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-4.webp"
            alt="Cover"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          <Avatar
            src={_myAccount.photoURL}
            alt={member.name}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
              mb: -6,
              ml: 2,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {member.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ ml: 3, mb: 2, flex: 1, position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
              {member.name}
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
              {member.role}
            </Typography>
          </Box>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ px: 3 }}>
            <Tab
              icon={<User size={20} />}
              label="Profile"
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
          </Tabs>
        </Box>
      </Card>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left Column - Profile Info */}
        <Box sx={{ flex: { xs: '1', md: '0 0 33.333%' } }}>
          {/* Stats Card */}
          <Card sx={{ mb: 3, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {member.stats.followers.toLocaleString()} Follower
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {member.stats.following.toLocaleString()} Following
              </Typography>
            </Box>
          </Card>

          {/* About Card */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              About
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {member.about}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MapPin size={16} color="#000" />
                <Typography variant="body2">Live at {member.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Mail size={16} color="#000" />
                <Typography variant="body2">{member.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Briefcase size={16} color="#000" />
                <Typography variant="body2">
                  {member.role} at {member.company}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <GraduationCap size={16} color="#000" />
                <Typography variant="body2">{member.education}</Typography>
              </Box>
            </Box>
          </Card>

          {/* Social Card */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Social
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Facebook size={16} color="#1877F2" />
                <Typography variant="body2" sx={{ color: '#1877F2' }}>
                  {member.social.facebook}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Instagram size={16} color="#E4405F" />
                <Typography variant="body2" sx={{ color: '#E4405F' }}>
                  {member.social.instagram}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Linkedin size={16} color="#0A66C2" />
                <Typography variant="body2" sx={{ color: '#0A66C2' }}>
                  {member.social.linkedin}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Twitter size={16} color="#000000" />
                <Typography variant="body2" sx={{ color: '#000000' }}>
                  {member.social.twitter}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Right Column - Posts and Activity */}
        <Box sx={{ flex: { xs: '1', md: '0 0 66.666%' } }}>
          {/* Create Post Card */}
          <Card sx={{ p: 3, mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share what you are thinking here..."
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: '#4CAF50',
                    '&:hover': { bgcolor: '#45a049' },
                    textTransform: 'none',
                  }}
                >
                  Image/Video
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: '#FF9800',
                    '&:hover': { bgcolor: '#f57c00' },
                    textTransform: 'none',
                  }}
                >
                  Streaming
                </Button>
              </Box>
              <Button
                variant="contained"
                onClick={handlePost}
                disabled={!newPost.trim()}
                sx={{
                  bgcolor: '#424242',
                  '&:hover': { bgcolor: '#303030' },
                  textTransform: 'none',
                }}
              >
                Post
              </Button>
            </Box>
          </Card>

          {/* Recent Post Card */}
          <Card sx={{ p: 3 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={_myAccount.photoURL} alt={member.name} sx={{ width: 40, height: 40 }}>
                  {member.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {member.recentPost.date}
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small">
                <MoreVertical size={16} />
              </IconButton>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {member.recentPost.content}
            </Typography>

            {/* Post Image */}
            <Box
              sx={{
                height: 200,
                borderRadius: 1,
                mb: 2,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
              }}
            >
              <img
                src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-1.webp"
                alt="Post"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>

            {/* Engagement */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Heart size={16} color="#e74c3c" />
                <Typography variant="body2" color="text.secondary">
                  {member.recentPost.likes}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MessageCircle size={16} color="#666" />
                <Typography variant="body2" color="text.secondary">
                  {member.recentPost.comments}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
                <Share size={16} color="#666" />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Comments */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>LD</Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Lainey Davidson
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Praesent venenatis metus at
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  13 Oct 2025
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
