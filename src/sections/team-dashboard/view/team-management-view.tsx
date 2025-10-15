import { useNavigate } from 'react-router';
import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { _myAccount } from 'src/_mock';

// ----------------------------------------------------------------------

export function TeamManagementView() {
  const navigate = useNavigate();

  const handleCardClick = (memberId: string) => {
    navigate(`/team-dashboard/team/${memberId}`);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Typography variant="h4">
          Team Management
        </Typography>
        <Button variant="contained">
          Add Team Member
        </Button>
      </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 3 }}>
              {[
                {
                  id: '1',
                  name: 'Jayvion Simon',
                  role: 'CEO',
                  email: 'jayvion.simon@hostaway.com',
                  status: 'Active',
                  followers: '9.91k',
                  following: '1.95k',
                  totalPosts: '9.12k',
                },
                {
                  id: '2',
                  name: 'Harrison Stein',
                  role: 'CTO',
                  email: 'harrison.stein@hostaway.com',
                  status: 'Active',
                  followers: '8.45k',
                  following: '2.1k',
                  totalPosts: '7.8k',
                },
                {
                  id: '3',
                  name: 'Reece Chung',
                  role: 'Team Leader',
                  email: 'reece.chung@hostaway.com',
                  status: 'Active',
                  followers: '6.2k',
                  following: '1.8k',
                  totalPosts: '5.9k',
                },
                {
                  id: '4',
                  name: 'Lainey Davidson',
                  role: 'Marketing Strategist',
                  email: 'lainey.davidson@hostaway.com',
                  status: 'Active',
                  followers: '12.3k',
                  following: '3.2k',
                  totalPosts: '11.7k',
                },
                {
                  id: '5',
                  name: 'David Brown',
                  role: 'Backend Developer',
                  email: 'david.brown@hostaway.com',
                  status: 'On Leave',
                  followers: '4.1k',
                  following: '1.2k',
                  totalPosts: '3.8k',
                },
                {
                  id: '6',
                  name: 'Lisa Garcia',
                  role: 'QA Engineer',
                  email: 'lisa.garcia@hostaway.com',
                  status: 'Active',
                  followers: '7.6k',
                  following: '2.4k',
                  totalPosts: '6.9k',
                },
              ].map((member, index) => (
                <Card 
                  key={index} 
                  sx={{ 
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                  onClick={() => handleCardClick(member.id)}
                >
                  {/* Header Image */}
                  <Box sx={{ 
                    height: 120, 
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={index % 2 === 0 
                        ? "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-1.webp"
                        : "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/images/mock/cover/cover-2.webp"
                      }
                      alt="Cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                    />
                  </Box>

                  {/* Profile Avatar */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    position: 'relative',
                    mb: 2
                  }}>
                    <Avatar 
                      src={_myAccount.photoURL} 
                      alt={member.name}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        border: '4px solid white',
                        mt: -4,
                        boxShadow: 2
                      }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>

                  {/* Profile Details */}
                  <Box sx={{ px: 3, pb: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {member.role}
                    </Typography>

                    {/* Social Media Icons */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 1, 
                          bgcolor: '#1877F2',
                          '&:hover': { bgcolor: '#166FE5' }
                        }}
                      >
                        <Facebook size={16} color="white" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 1, 
                          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                          '&:hover': { 
                            background: 'linear-gradient(45deg, #e0852e 0%, #d55a31 25%, #d11d3a 50%, #b91f5a 75%, #a6167a 100%)' 
                          }
                        }}
                      >
                        <Instagram size={16} color="white" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 1, 
                          bgcolor: '#0077B5',
                          '&:hover': { bgcolor: '#005885' }
                        }}
                      >
                        <Linkedin size={16} color="white" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 1, 
                          bgcolor: '#000000',
                          '&:hover': { bgcolor: '#333333' }
                        }}
                      >
                        <Twitter size={16} color="white" />
                      </IconButton>
                    </Box>

                    {/* Divider */}
                    <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                    {/* Statistics */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {member.followers}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Follower
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {member.following}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Following
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {member.totalPosts}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total post
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              ))}
        </Box>
      </Container>
    );
  }
