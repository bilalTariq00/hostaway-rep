import { useRef, useState, useEffect } from 'react';
import {
  X,
  Eye,
  Bed,
  Car,
  List,
  Lock,
  Star,
  Bath,
  Wifi,
  Home,
  Users,
  Filter,
  Search,
  EyeOff,
  MapPin,
  Coffee,
  Grid3X3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { ManageDatesModal } from '../components/manage-dates-modal';
import { BookingDetailsModal } from '../components/booking-details-modal';

// Simple mock data - just one property
const mockListings = [
  {
    id: 305034,
    name: 'La Dimora Del Cavaliere',
    price: 75,
    bookings: 8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    location: 'Milan, Italy',
    rating: 4.9,
    reviews: 89,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Balcony'],
    description: 'Modern loft in the trendy Navigli district with canal views.',
    status: 'active',
    lastBooking: '2024-12-10',
    revenue: 10800,
  },
  {
    id: 305225,
    name: 'Polacchi42',
    price: 120,
    bookings: 12,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    location: 'Florence, Italy',
    rating: 4.7,
    reviews: 156,
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking'],
    description: 'Charming apartment near the Duomo with traditional Italian architecture.',
    status: 'active',
    lastBooking: '2024-12-12',
    revenue: 14400,
  },
  {
    id: 305421,
    name: 'Superattico - Via Del Corso',
    price: 200,
    bookings: 20,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    location: 'Rome, Italy',
    rating: 4.9,
    reviews: 203,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Gym', 'Parking'],
    description: 'Luxury penthouse with panoramic views of Rome and modern amenities.',
    status: 'active',
    lastBooking: '2024-12-18',
    revenue: 40000,
  },
  {
    id: 306532,
    name: 'Montecatini Terme',
    price: 90,
    bookings: 10,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    location: 'Tuscany, Italy',
    rating: 4.6,
    reviews: 78,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Spa'],
    description: 'Peaceful retreat in the Tuscan countryside with thermal spa access.',
    status: 'active',
    lastBooking: '2024-12-08',
    revenue: 9000,
  },
  {
    id: 308582,
    name: 'Monteverde - Quattroventi',
    price: 150,
    bookings: 18,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    location: 'Rome, Italy',
    rating: 4.8,
    reviews: 134,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Parking'],
    description: 'Spacious apartment in Monteverde with beautiful garden views.',
    status: 'active',
    lastBooking: '2024-12-14',
    revenue: 27000,
  },
  {
    id: 310867,
    name: 'La Storta',
    price: 110,
    bookings: 5,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
    location: 'Rome, Italy',
    rating: 4.5,
    reviews: 45,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen'],
    description: 'Cozy studio apartment perfect for short stays in Rome.',
    status: 'maintenance',
    lastBooking: '2024-11-28',
    revenue: 5500,
  },
  {
    id: 317154,
    name: '[5 Min From Trastevere] Chic Apt',
    price: 180,
    bookings: 22,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    location: 'Rome, Italy',
    rating: 4.9,
    reviews: 189,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Coffee Machine'],
    description: 'Stylish apartment just minutes from Trastevere with modern design.',
    status: 'active',
    lastBooking: '2024-12-16',
    revenue: 39600,
  },
  {
    id: 332386,
    name: 'Via Poggio Tulliano',
    price: 160,
    bookings: 14,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    location: 'Rome, Italy',
    rating: 4.7,
    reviews: 98,
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Garden'],
    description: 'Elegant apartment in a quiet neighborhood with garden access.',
    status: 'active',
    lastBooking: '2024-12-11',
    revenue: 22400,
  },
  {
    id: 345603,
    name: 'Via Dei Marruccini | San Lorenzo',
    price: 140,
    bookings: 16,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    location: 'Rome, Italy',
    rating: 4.8,
    reviews: 112,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Balcony'],
    description: 'Modern apartment in San Lorenzo district with great transport links.',
    status: 'active',
    lastBooking: '2024-12-13',
    revenue: 22400,
  },
  {
    id: 363365,
    name: 'Via di Acqua Bullicante 113',
    price: 130,
    bookings: 11,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    location: 'Rome, Italy',
    rating: 4.6,
    reviews: 67,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Parking'],
    description: 'Comfortable apartment with parking space in residential area.',
    status: 'active',
    lastBooking: '2024-12-09',
    revenue: 14300,
  },
  {
    id: 363366,
    name: 'Via Matera 23A',
    price: 125,
    bookings: 9,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    location: 'Rome, Italy',
    rating: 4.5,
    reviews: 54,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen'],
    description: 'Compact apartment perfect for couples visiting Rome.',
    status: 'active',
    lastBooking: '2024-12-07',
    revenue: 11250,
  },
  {
    id: 372243,
    name: 'Luxury Stay in Rome – Steps from Metro A Cornelia',
    price: 220,
    bookings: 25,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    location: 'Rome, Italy',
    rating: 4.9,
    reviews: 245,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Gym', 'Parking', 'Concierge'],
    description: 'Premium apartment with metro access and luxury amenities.',
    status: 'active',
    lastBooking: '2024-12-17',
    revenue: 55000,
  },
];

// Mock data for calendar bookings with more realistic data
const mockBookings = [
  {
    id: 1,
    listingId: 305034,
    startDate: '2024-10-07',
    endDate: '2024-10-13',
    guests: 6,
    price: 75,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Zhanna Badytsia',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/d0d5acbd-64bc-4e35-a2a2-6c4065cb7bf4.jpeg?aki_policy=profile_x_medium',
    nights: 6,
    commission: 45,
    payout: 405,
  },
  {
    id: 2,
    listingId: 305035,
    startDate: '2024-10-10',
    endDate: '2024-10-14',
    guests: 2,
    price: 135,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Javier Merlo Vinas',
    nights: 4,
    commission: 54,
    payout: 486,
  },
  {
    id: 3,
    listingId: 305225,
    startDate: '2024-10-07',
    endDate: '2024-10-08',
    guests: 2,
    price: 120,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Fang Lin',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/14db9c42-856c-4984-a80b-9c08cbcec3a2.jpeg?aki_policy=profile_x_medium',
    nights: 1,
    commission: 12,
    payout: 108,
  },
  {
    id: 4,
    listingId: 305225,
    startDate: '2024-10-10',
    endDate: '2024-10-13',
    guests: 3,
    price: 120,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Andrzej Malecki',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/6797c219-e5e6-4033-9088-9449d53c9132.jpeg?aki_policy=profile_x_medium',
    nights: 3,
    commission: 36,
    payout: 324,
  },
  {
    id: 5,
    listingId: 305225,
    startDate: '2024-10-14',
    endDate: '2024-10-16',
    guests: 2,
    price: 120,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Lidia Kuszczak',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/02ee859b-d033-4492-9bea-3e4e9c0e1b39.jpeg?aki_policy=profile_x_medium',
    nights: 2,
    commission: 24,
    payout: 216,
  },
  {
    id: 6,
    listingId: 305421,
    startDate: '2024-10-07',
    endDate: '2024-10-09',
    guests: 3,
    price: 200,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Nader Thabet',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/6797c219-e5e6-4033-9088-9449d53c9132.jpeg?aki_policy=profile_x_medium',
    nights: 2,
    commission: 40,
    payout: 360,
  },
  {
    id: 7,
    listingId: 305421,
    startDate: '2024-10-14',
    endDate: '2024-10-16',
    guests: 4,
    price: 200,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Kara Maggiore',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/73671fee-536a-4e5b-afe6-c9a5160870cb.jpeg?aki_policy=profile_x_medium',
    nights: 2,
    commission: 40,
    payout: 360,
  },
  {
    id: 8,
    listingId: 306532,
    startDate: '2024-10-08',
    endDate: '2024-10-10',
    guests: 3,
    price: 90,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Maintenance',
    nights: 2,
  },
  {
    id: 9,
    listingId: 308582,
    startDate: '2024-10-07',
    endDate: '2024-10-13',
    guests: 4,
    price: 150,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Ana Evstatieva',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/02ee859b-d033-4492-9bea-3e4e9c0e1b39.jpeg?aki_policy=profile_x_medium',
    nights: 6,
    commission: 90,
    payout: 810,
  },
  {
    id: 10,
    listingId: 308582,
    startDate: '2024-10-14',
    endDate: '2024-10-16',
    guests: 4,
    price: 150,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Assel Sapasheva',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/6797c219-e5e6-4033-9088-9449d53c9132.jpeg?aki_policy=profile_x_medium',
    nights: 2,
    commission: 30,
    payout: 270,
  },
  {
    id: 11,
    listingId: 310867,
    startDate: '2024-10-09',
    endDate: '2024-10-11',
    guests: 2,
    price: 110,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Tania Blake',
    nights: 2,
    commission: 22,
    payout: 198,
  },
  {
    id: 12,
    listingId: 317154,
    startDate: '2024-10-08',
    endDate: '2024-10-12',
    guests: 2,
    price: 180,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Chris Allen',
    guestPhoto:
      'https://a0.muscache.com/im/pictures/user/User/original/73671fee-536a-4e5b-afe6-c9a5160870cb.jpeg?aki_policy=profile_x_medium',
    nights: 4,
    commission: 72,
    payout: 648,
  },
  // Additional bookings for better visualization with current dates
  {
    id: 11,
    listingId: 305034,
    startDate: '2024-12-15',
    endDate: '2024-12-20',
    guests: 4,
    price: 85,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Peter Van Der Krieke',
    nights: 5,
    commission: 51,
    payout: 459,
  },
  {
    id: 12,
    listingId: 305035,
    startDate: '2024-12-18',
    endDate: '2024-12-22',
    guests: 2,
    price: 140,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Ting Huang',
    nights: 4,
    commission: 56,
    payout: 504,
  },
  {
    id: 13,
    listingId: 305225,
    startDate: '2024-12-10',
    endDate: '2024-12-15',
    guests: 3,
    price: 120,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Maria Rodriguez',
    nights: 5,
    commission: 60,
    payout: 540,
  },
  {
    id: 14,
    listingId: 305421,
    startDate: '2024-12-25',
    endDate: '2024-12-30',
    guests: 6,
    price: 200,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'John Smith',
    nights: 5,
    commission: 100,
    payout: 900,
  },
  // More bookings for current month (December 2024)
  {
    id: 15,
    listingId: 305034,
    startDate: '2024-12-02',
    endDate: '2024-12-07',
    guests: 2,
    price: 90,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Sarah Johnson',
    nights: 5,
    commission: 45,
    payout: 405,
  },
  // Current week bookings (around today's date)
  {
    id: 29,
    listingId: 305034,
    startDate: '2024-12-16',
    endDate: '2024-12-20',
    guests: 3,
    price: 95,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Current Guest',
    nights: 4,
    commission: 47.5,
    payout: 427.5,
  },
  {
    id: 30,
    listingId: 305035,
    startDate: '2024-12-18',
    endDate: '2024-12-22',
    guests: 2,
    price: 150,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Recent Guest',
    nights: 4,
    commission: 60,
    payout: 540,
  },
  // More comprehensive dummy data for better visualization
  {
    id: 31,
    listingId: 305225,
    startDate: '2024-12-01',
    endDate: '2024-12-05',
    guests: 4,
    price: 125,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Alex Thompson',
    nights: 4,
    commission: 50,
    payout: 450,
  },
  {
    id: 32,
    listingId: 305421,
    startDate: '2024-12-08',
    endDate: '2024-12-12',
    guests: 6,
    price: 180,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Maria Santos',
    nights: 4,
    commission: 90,
    payout: 810,
  },
  {
    id: 33,
    listingId: 305034,
    startDate: '2024-12-23',
    endDate: '2024-12-28',
    guests: 2,
    price: 100,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'David Kim',
    nights: 5,
    commission: 50,
    payout: 450,
  },
  {
    id: 34,
    listingId: 305035,
    startDate: '2024-12-30',
    endDate: '2025-01-03',
    guests: 3,
    price: 160,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Sarah Wilson',
    nights: 4,
    commission: 80,
    payout: 720,
  },
  {
    id: 35,
    listingId: 305225,
    startDate: '2024-12-06',
    endDate: '2024-12-10',
    guests: 2,
    price: 110,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'James Brown',
    nights: 4,
    commission: 44,
    payout: 396,
  },
  {
    id: 36,
    listingId: 305421,
    startDate: '2024-12-13',
    endDate: '2024-12-17',
    guests: 5,
    price: 190,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Lisa Garcia',
    nights: 4,
    commission: 95,
    payout: 855,
  },
  // Some blocked dates for maintenance
  {
    id: 37,
    listingId: 305034,
    startDate: '2024-12-03',
    endDate: '2024-12-04',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Maintenance',
    nights: 1,
    commission: 0,
    payout: 0,
  },
  {
    id: 38,
    listingId: 305225,
    startDate: '2024-12-11',
    endDate: '2024-12-12',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Cleaning',
    nights: 1,
    commission: 0,
    payout: 0,
  },
  // October 2024 bookings around October 8th
  {
    id: 39,
    listingId: 305034,
    startDate: '2024-10-05',
    endDate: '2024-10-09',
    guests: 4,
    price: 85,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Emma Johnson',
    nights: 4,
    commission: 34,
    payout: 306,
  },
  // Current week bookings (December 2024)
  {
    id: 64,
    listingId: 305034,
    startDate: '2024-12-16',
    endDate: '2024-12-20',
    guests: 3,
    price: 95,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Jouko Orava',
    nights: 4,
    commission: 47.5,
    payout: 427.5,
  },
  {
    id: 65,
    listingId: 305225,
    startDate: '2024-12-18',
    endDate: '2024-12-22',
    guests: 2,
    price: 120,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Alex Parker',
    nights: 4,
    commission: 60,
    payout: 540,
  },
  {
    id: 66,
    listingId: 305421,
    startDate: '2024-12-15',
    endDate: '2024-12-19',
    guests: 4,
    price: 200,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Daniel Artame',
    nights: 4,
    commission: 100,
    payout: 900,
  },
  {
    id: 67,
    listingId: 305421,
    startDate: '2024-12-20',
    endDate: '2024-12-24',
    guests: 2,
    price: 200,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'María Cárdenas',
    nights: 4,
    commission: 100,
    payout: 900,
  },
  {
    id: 68,
    listingId: 305225,
    startDate: '2024-12-25',
    endDate: '2024-12-29',
    guests: 3,
    price: 120,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Maria Do Carmo',
    nights: 4,
    commission: 60,
    payout: 540,
  },
  {
    id: 69,
    listingId: 305034,
    startDate: '2024-12-30',
    endDate: '2025-01-03',
    guests: 4,
    price: 95,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Delice Préve Ribeiro',
    nights: 4,
    commission: 47.5,
    payout: 427.5,
  },
  {
    id: 40,
    listingId: 305035,
    startDate: '2024-10-07',
    endDate: '2024-10-11',
    guests: 2,
    price: 140,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Michael Chen',
    nights: 4,
    commission: 56,
    payout: 504,
  },
  {
    id: 41,
    listingId: 305225,
    startDate: '2024-10-08',
    endDate: '2024-10-12',
    guests: 3,
    price: 115,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Sarah Williams',
    nights: 4,
    commission: 46,
    payout: 414,
  },
  {
    id: 42,
    listingId: 305421,
    startDate: '2024-10-06',
    endDate: '2024-10-10',
    guests: 5,
    price: 185,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Robert Davis',
    nights: 4,
    commission: 92.5,
    payout: 832.5,
  },
  {
    id: 43,
    listingId: 305034,
    startDate: '2024-10-10',
    endDate: '2024-10-14',
    guests: 2,
    price: 90,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Lisa Anderson',
    nights: 4,
    commission: 36,
    payout: 324,
  },
  {
    id: 44,
    listingId: 305035,
    startDate: '2024-10-12',
    endDate: '2024-10-16',
    guests: 3,
    price: 155,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'James Wilson',
    nights: 4,
    commission: 62,
    payout: 558,
  },
  {
    id: 45,
    listingId: 305225,
    startDate: '2024-10-09',
    endDate: '2024-10-13',
    guests: 4,
    price: 125,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Maria Rodriguez',
    nights: 4,
    commission: 50,
    payout: 450,
  },
  {
    id: 46,
    listingId: 305421,
    startDate: '2024-10-11',
    endDate: '2024-10-15',
    guests: 6,
    price: 195,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'David Thompson',
    nights: 4,
    commission: 78,
    payout: 702,
  },
  // Some blocked dates around October 8th
  {
    id: 47,
    listingId: 305034,
    startDate: '2024-10-08',
    endDate: '2024-10-09',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Maintenance',
    nights: 1,
    commission: 0,
    payout: 0,
  },
  {
    id: 48,
    listingId: 305225,
    startDate: '2024-10-07',
    endDate: '2024-10-08',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Cleaning',
    nights: 1,
    commission: 0,
    payout: 0,
  },
  // 2025 bookings across different months
  {
    id: 49,
    listingId: 305034,
    startDate: '2025-01-15',
    endDate: '2025-01-20',
    guests: 3,
    price: 95,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Jennifer Martinez',
    nights: 5,
    commission: 47.5,
    payout: 427.5,
  },
  {
    id: 50,
    listingId: 305035,
    startDate: '2025-01-22',
    endDate: '2025-01-26',
    guests: 2,
    price: 145,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Thomas Brown',
    nights: 4,
    commission: 58,
    payout: 522,
  },
  {
    id: 51,
    listingId: 305225,
    startDate: '2025-02-10',
    endDate: '2025-02-15',
    guests: 4,
    price: 120,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Amanda Taylor',
    nights: 5,
    commission: 60,
    payout: 540,
  },
  {
    id: 52,
    listingId: 305421,
    startDate: '2025-02-18',
    endDate: '2025-02-22',
    guests: 6,
    price: 175,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Christopher Lee',
    nights: 4,
    commission: 87.5,
    payout: 787.5,
  },
  {
    id: 53,
    listingId: 305034,
    startDate: '2025-03-05',
    endDate: '2025-03-10',
    guests: 2,
    price: 100,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Nicole Garcia',
    nights: 5,
    commission: 50,
    payout: 450,
  },
  {
    id: 54,
    listingId: 305035,
    startDate: '2025-03-12',
    endDate: '2025-03-16',
    guests: 3,
    price: 160,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Kevin White',
    nights: 4,
    commission: 64,
    payout: 576,
  },
  {
    id: 55,
    listingId: 305225,
    startDate: '2025-04-08',
    endDate: '2025-04-12',
    guests: 5,
    price: 135,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Rachel Green',
    nights: 4,
    commission: 67.5,
    payout: 607.5,
  },
  {
    id: 56,
    listingId: 305421,
    startDate: '2025-04-15',
    endDate: '2025-04-20',
    guests: 4,
    price: 190,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Daniel Clark',
    nights: 5,
    commission: 95,
    payout: 855,
  },
  {
    id: 57,
    listingId: 305034,
    startDate: '2025-05-03',
    endDate: '2025-05-08',
    guests: 3,
    price: 110,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Michelle Adams',
    nights: 5,
    commission: 55,
    payout: 495,
  },
  {
    id: 58,
    listingId: 305035,
    startDate: '2025-05-10',
    endDate: '2025-05-14',
    guests: 2,
    price: 150,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Ryan Miller',
    nights: 4,
    commission: 60,
    payout: 540,
  },
  {
    id: 59,
    listingId: 305225,
    startDate: '2025-06-20',
    endDate: '2025-06-25',
    guests: 6,
    price: 200,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Stephanie Wilson',
    nights: 5,
    commission: 100,
    payout: 900,
  },
  {
    id: 60,
    listingId: 305421,
    startDate: '2025-06-28',
    endDate: '2025-07-03',
    guests: 4,
    price: 220,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Mark Thompson',
    nights: 5,
    commission: 110,
    payout: 990,
  },
  // Some blocked dates in 2025
  {
    id: 61,
    listingId: 305034,
    startDate: '2025-01-10',
    endDate: '2025-01-12',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Maintenance',
    nights: 2,
    commission: 0,
    payout: 0,
  },
  {
    id: 62,
    listingId: 305225,
    startDate: '2025-03-01',
    endDate: '2025-03-03',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Renovation',
    nights: 2,
    commission: 0,
    payout: 0,
  },
  {
    id: 63,
    listingId: 305421,
    startDate: '2025-05-20',
    endDate: '2025-05-22',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Deep Cleaning',
    nights: 2,
    commission: 0,
    payout: 0,
  },
  {
    id: 16,
    listingId: 305035,
    startDate: '2024-12-05',
    endDate: '2024-12-09',
    guests: 3,
    price: 150,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Michael Brown',
    nights: 4,
    commission: 60,
    payout: 540,
  },
  {
    id: 17,
    listingId: 305225,
    startDate: '2024-12-12',
    endDate: '2024-12-16',
    guests: 4,
    price: 130,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Emma Wilson',
    nights: 4,
    commission: 52,
    payout: 468,
  },
  {
    id: 18,
    listingId: 305421,
    startDate: '2024-12-20',
    endDate: '2024-12-25',
    guests: 5,
    price: 180,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'David Lee',
    nights: 5,
    commission: 90,
    payout: 810,
  },
  {
    id: 19,
    listingId: 305034,
    startDate: '2024-12-28',
    endDate: '2025-01-02',
    guests: 3,
    price: 95,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Lisa Garcia',
    nights: 5,
    commission: 47.5,
    payout: 427.5,
  },
  {
    id: 20,
    listingId: 305035,
    startDate: '2024-12-30',
    endDate: '2025-01-05',
    guests: 2,
    price: 160,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Robert Taylor',
    nights: 6,
    commission: 80,
    payout: 720,
  },
  // Some blocked dates
  {
    id: 21,
    listingId: 305225,
    startDate: '2024-12-08',
    endDate: '2024-12-10',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Maintenance',
    nights: 2,
    commission: 0,
    payout: 0,
  },
  {
    id: 22,
    listingId: 305421,
    startDate: '2024-12-14',
    endDate: '2024-12-16',
    guests: 0,
    price: 0,
    status: 'blocked',
    source: 'Manual',
    guestName: 'Cleaning',
    nights: 2,
    commission: 0,
    payout: 0,
  },
  // November 2024 bookings
  {
    id: 23,
    listingId: 305034,
    startDate: '2024-11-15',
    endDate: '2024-11-20',
    guests: 3,
    price: 80,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Anna Schmidt',
    nights: 5,
    commission: 40,
    payout: 360,
  },
  {
    id: 24,
    listingId: 305035,
    startDate: '2024-11-22',
    endDate: '2024-11-26',
    guests: 2,
    price: 145,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'James Wilson',
    nights: 4,
    commission: 58,
    payout: 522,
  },
  {
    id: 25,
    listingId: 305225,
    startDate: '2024-11-28',
    endDate: '2024-12-02',
    guests: 4,
    price: 125,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Sophie Martin',
    nights: 4,
    commission: 50,
    payout: 450,
  },
  // January 2025 bookings
  {
    id: 26,
    listingId: 305034,
    startDate: '2025-01-03',
    endDate: '2025-01-08',
    guests: 2,
    price: 90,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Carlos Rodriguez',
    nights: 5,
    commission: 45,
    payout: 405,
  },
  {
    id: 27,
    listingId: 305035,
    startDate: '2025-01-10',
    endDate: '2025-01-15',
    guests: 3,
    price: 155,
    status: 'confirmed',
    source: 'Booking.com',
    guestName: 'Jennifer Lee',
    nights: 5,
    commission: 62,
    payout: 558,
  },
  {
    id: 28,
    listingId: 305421,
    startDate: '2025-01-18',
    endDate: '2025-01-23',
    guests: 5,
    price: 190,
    status: 'confirmed',
    source: 'Airbnb',
    guestName: 'Thomas Anderson',
    nights: 5,
    commission: 95,
    payout: 855,
  },
];

export function CalendarMultiView() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedDates, setSelectedDates] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // Today's date
  const [calendarView, setCalendarView] = useState<'grid' | 'list'>('grid');
  const [manageDatesOpen, setManageDatesOpen] = useState(false);
  const [selectedBookingForModal, setSelectedBookingForModal] = useState<any>(null);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [propertyMenuAnchor, setPropertyMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const propertySidebarRef = useRef<HTMLDivElement>(null);

  // Generate calendar days for multiple months (12 months total)
  const generateCalendarDays = () => {
    const days = [];
    // Start from 6 months before current date
    const startDate = new Date(currentDate);
    startDate.setMonth(startDate.getMonth() - 6);
    startDate.setDate(1); // Start from the first day of the month

    // Generate 12 months worth of days (12 * 42 = 504 days)
    for (let i = 0; i < 504; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) router.push('/calendar/monthly');
    if (newValue === 2) router.push('/calendar/yearly');
  };

  const handleBookingClick = (booking: any) => {
    setSelectedBookingForModal(booking);
    setSelectedDateRange({
      startDate: booking.startDate,
      endDate: booking.endDate,
    });
    setManageDatesOpen(true);
  };

  const handleDateClick = (date: string, listingId: number) => {
    const booking = mockBookings.find(
      (b) => b.startDate <= date && b.endDate > date && b.listingId === listingId
    );
    if (booking) {
      handleBookingClick(booking);
    } else {
      setSelectedDates({ date, listingId });
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cellWidth = 84;
    const daysInMonth = 30; // Approximate days to scroll
    const scrollAmount = daysInMonth * cellWidth;
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    if (direction === 'prev') {
      const newScrollLeft = Math.max(0, scrollContainer.scrollLeft - scrollAmount);
      scrollContainer.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    } else {
      const newScrollLeft = Math.min(maxScrollLeft, scrollContainer.scrollLeft + scrollAmount);
      scrollContainer.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const goToToday = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const today = new Date();

    // Calculate the start date of our calendar (6 months before current date)
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 6);
    startDate.setDate(1); // Start from first day of the month

    // Calculate how many days from start to today
    const timeDiff = today.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    const cellWidth = 84;
    const containerWidth = scrollContainer.clientWidth;

    // Center today's date in the view
    const scrollPosition = daysDiff * cellWidth - containerWidth / 2 + cellWidth / 2;
    const finalScrollPosition = Math.max(0, scrollPosition);

    scrollContainer.scrollTo({
      left: finalScrollPosition,
      behavior: 'smooth',
    });

    setCurrentDate(today);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        navigateDate('prev');
      } else if (event.key === 'ArrowRight') {
        navigateDate('next');
      } else if (event.key === 't' || event.key === 'T') {
        goToToday();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Add scroll detection for month navigation with throttling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return undefined;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Throttle scroll detection to make it smoother
      scrollTimeout = setTimeout(() => {
        const scrollLeft = scrollContainer.scrollLeft;
        const cellWidth = 84; // Width of each day cell
        const containerWidth = scrollContainer.clientWidth;

        // Calculate which day is in the center of the visible area
        const centerPosition = scrollLeft + containerWidth / 2;
        const centerDayIndex = Math.floor(centerPosition / cellWidth);

        // Calculate which month we're currently viewing
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        startDate.setDate(1);
        const currentViewDate = new Date(startDate);
        currentViewDate.setDate(startDate.getDate() + centerDayIndex);

        // Update the header if we've scrolled to a different month
        const newMonth = currentViewDate.getMonth();
        const newYear = currentViewDate.getFullYear();

        // Use a more stable approach - only update if we're sure we're in a different month
        setCurrentDate((prevDate) => {
          const prevMonth = prevDate.getMonth();
          const prevYear = prevDate.getFullYear();

          if (newMonth !== prevMonth || newYear !== prevYear) {
            return new Date(newYear, newMonth, 1);
          }
          return prevDate;
        });
      }, 150); // Reduced delay for better responsiveness
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // No scroll synchronization needed - property sidebar and calendar scroll together naturally

  // Scroll to today's date on mount
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Calculate scroll position to center on today
    const cellWidth = 84;
    const containerWidth = scrollContainer.clientWidth;

    // Calculate how many days from start to today
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 6);
    startDate.setDate(1);

    const timeDiff = today.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    // Center today's date in the view
    const scrollPosition = daysDiff * cellWidth - containerWidth / 2 + cellWidth / 2;
    const finalScrollPosition = Math.max(0, scrollPosition);

    scrollContainer.scrollLeft = finalScrollPosition;
  }, []);

  const getBookingForDate = (date: string, listingId: number) =>
    mockBookings.find((b) => b.startDate <= date && b.endDate > date && b.listingId === listingId);

  // Get booking that starts on this date for continuous bar rendering
  const getBookingStartingOnDate = (date: string, listingId: number) =>
    mockBookings.find((b) => b.startDate === date && b.listingId === listingId);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isCurrentMonth = (date: Date) =>
    date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();

  // Search functionality
  useEffect(() => {
    const filtered = mockListings.filter(
      (listing) =>
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [searchTerm]);

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
    setShowPropertyDetails(true);
  };

  const handlePropertyMenuClose = () => {
    setPropertyMenuAnchor(null);
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* Header with Tabs */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Calendar
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Available Properties
            </Button>
            <Button variant="contained" sx={{ mr: 1 }}>
              Listing
            </Button>
            <Button variant="contained">Direct Booking</Button>
          </Box>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: 'primary.main',
              fontWeight: 600,
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 3,
            },
          }}
        >
          <Tab label="Multi" />
          <Tab label="Monthly" />
          <Tab label="Yearly" />
        </Tabs>
      </Box>

      {/* Filters and Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<Filter size={16} />}
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              '&:hover': { bgcolor: 'success.dark' },
            }}
          >
            Available listings
          </Button>

          <Button variant="outlined" size="small">
            Tags
          </Button>

          <TextField
            select
            size="small"
            defaultValue="Country"
            sx={{ minWidth: 120 }}
            SelectProps={{ native: true }}
          >
            <option>Country</option>
            <option>Italy</option>
            <option>Spain</option>
            <option>France</option>
          </TextField>

          <TextField
            select
            size="small"
            defaultValue="City"
            sx={{ minWidth: 120 }}
            SelectProps={{ native: true }}
          >
            <option>City</option>
            <option>Rome</option>
            <option>Milan</option>
            <option>Florence</option>
          </TextField>

          <TextField
            select
            size="small"
            defaultValue="All units"
            sx={{ minWidth: 120 }}
            SelectProps={{ native: true }}
          >
            <option>All units</option>
            <option>Apartments</option>
            <option>Houses</option>
            <option>Villas</option>
          </TextField>

          <Chip
            label="Show (2)"
            variant="outlined"
            size="small"
            sx={{ minWidth: 80, justifyContent: 'center' }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <TextField
            size="small"
            placeholder="Search by listing"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
        </Box>
      </Paper>

      {/* Calendar Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              size="small"
              onClick={goToToday}
              sx={{
                bgcolor: 'grey.800',
                color: 'white',
                '&:hover': { bgcolor: 'grey.900' },
              }}
            >
              Today
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => navigateDate('prev')}
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                <ChevronLeft size={16} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  minWidth: 150,
                  textAlign: 'center',
                  fontWeight: 600,
                  bgcolor: 'primary.50',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Typography>
              <IconButton
                onClick={() => navigateDate('next')}
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                <ChevronRight size={16} />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small">
                <ChevronsLeft size={16} />
              </IconButton>
              <IconButton size="small">
                <ChevronsRight size={16} />
              </IconButton>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
              Use ← → arrow keys or click buttons to navigate months
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setCalendarView('grid')}
              color={calendarView === 'grid' ? 'primary' : 'default'}
            >
              <Grid3X3 size={20} />
            </IconButton>
            <IconButton
              onClick={() => setCalendarView('list')}
              color={calendarView === 'list' ? 'primary' : 'default'}
            >
              <List size={20} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Hostaway-style Calendar */}
      <Paper sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            height: '600px',
            overflowX: 'auto',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 8,
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'grey.100',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'grey.400',
              borderRadius: 4,
              '&:hover': {
                backgroundColor: 'grey.600',
              },
            },
          }}
          ref={scrollContainerRef}
        >
          {/* Left Sidebar - Properties - Sticky horizontally, scrolls vertically */}
          <Box
            sx={{
              width: 320,
              borderRight: 1,
              borderColor: 'divider',
              bgcolor: 'white',
              position: 'sticky',
              left: 0,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              minHeight: '100%',
            }}
          >
            {/* Property Header */}
            <Box
              sx={{
                p: 1.5,
                bgcolor: 'grey.50',
                borderBottom: 1,
                borderColor: 'divider',
                height: 50,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" fontWeight={600} color="text.secondary">
                Property
              </Typography>
            </Box>

            {/* Property List */}
            <Box
              ref={propertySidebarRef}
              sx={{
                flex: 1,
                '&::-webkit-scrollbar': {
                  width: 6,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'grey.100',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'grey.400',
                  borderRadius: 3,
                  '&:hover': {
                    backgroundColor: 'grey.600',
                  },
                },
              }}
            >
              {filteredListings.map((listing) => (
                <Box
                  key={listing.id}
                  sx={{
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    cursor: 'pointer',
                    height: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bgcolor: selectedProperty?.id === listing.id ? 'primary.50' : 'white',
                    '&:hover': {
                      bgcolor: selectedProperty?.id === listing.id ? 'primary.100' : 'grey.50',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={() => handlePropertySelect(listing)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color:
                          selectedProperty?.id === listing.id ? 'primary.main' : 'text.primary',
                        fontSize: '0.95rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.01em',
                        flex: 1,
                        mr: 1,
                      }}
                    >
                      {listing.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.8rem', fontWeight: 500 }}
                      >
                        {listing.id}
                      </Typography>
                      {listing.status === 'maintenance' && (
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            bgcolor: 'error.main',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ml: 0.5,
                          }}
                        >
                          <X size={10} color="white" />
                        </Box>
                      )}
                      {listing.status === 'blocked' && <Lock size={12} color="#666" />}
                      {listing.status === 'active' && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'success.main',
                            borderRadius: '50%',
                            ml: 0.5,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Calendar Grid Container - Scrolls with property sidebar */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              minWidth: 'max-content',
            }}
          >
            <Box
              sx={{
                minWidth: 'max-content',
                minHeight: `${(filteredListings.length + 1) * 50}px`, // +1 for header row
                bgcolor: 'white',
              }}
            >
              {/* Calendar Header - Part of the scrollable content */}
              <Box
                sx={{
                  display: 'flex',
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                  bgcolor: 'white',
                  borderBottom: 1,
                  borderColor: 'divider',
                  height: 50,
                }}
              >
                {calendarDays.map((day) => (
                  <Box
                    key={formatDate(day)}
                    sx={{
                      width: 84,
                      minWidth: 84,
                      height: 50,
                      p: 1,
                      textAlign: 'center',
                      borderRight: 'none',
                      borderColor: 'divider',
                      bgcolor: isToday(day) ? 'primary.50' : 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={isToday(day) ? 'primary.main' : 'text.primary'}
                      sx={{ fontWeight: isToday(day) ? 600 : 400 }}
                    >
                      {day.getDate()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Calendar Body - Property Rows */}
              {filteredListings.map((listing) => (
                <Box key={listing.id} sx={{ display: 'flex', height: 50, position: 'relative' }}>
                  {/* Calendar Days */}
                  {calendarDays.map((day) => {
                    const dateStr = formatDate(day);
                    const booking = getBookingForDate(dateStr, listing.id);
                    const bookingStarting = getBookingStartingOnDate(dateStr, listing.id);
                    const isBooked = !!booking;
                    const isBookingStart = !!bookingStarting;
                    const isPast = isPastDate(day);
                    const isTodayDate = isToday(day);
                    const isCurrentMonthDate = isCurrentMonth(day);

                    // Calculate booking span for proper bar display
                    const bookingSpan = booking
                      ? Math.ceil(
                          (new Date(booking.endDate).getTime() -
                            new Date(booking.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 0;

                    return (
                      <Box
                        key={dateStr}
                        sx={{
                          width: 84,
                          minWidth: 84,
                          height: 50,
                          borderRight: isBooked ? 'none' : 1,
                          borderBottom: 1,
                          borderColor: 'divider',
                          position: 'relative',
                          cursor: 'pointer',
                          bgcolor: isBooked
                            ? 'transparent'
                            : isPast
                              ? 'grey.100'
                              : isCurrentMonthDate
                                ? 'white'
                                : 'grey.50',
                          opacity: isPast ? 0.6 : isCurrentMonthDate ? 1 : 0.7,
                          '&:hover': {
                            bgcolor: isPast ? 'grey.200' : 'grey.50',
                          },
                        }}
                        onClick={() => handleDateClick(dateStr, listing.id)}
                      >
                        {isBookingStart ? (
                          <Tooltip
                            title={
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                  {bookingStarting.guestName}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                  {bookingStarting.guests} guests • {bookingStarting.nights} nights
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                  €{bookingStarting.price}/night • {bookingStarting.source}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                                  Check-in: {bookingStarting.startDate} • Check-out:{' '}
                                  {bookingStarting.endDate}
                                </Typography>
                              </Box>
                            }
                            arrow
                            placement="top"
                            enterDelay={500}
                            leaveDelay={200}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: '#00A699',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                p: 1.2,
                                borderRadius: 0,
                                cursor: 'pointer',
                                width: '100%',
                                height: '100%',
                                minWidth: bookingSpan > 1 ? `${bookingSpan * 84}px` : '84px',
                                zIndex: 5,
                                boxShadow: 'none',
                                border: 'none',
                                margin: 0,
                                '&:hover': {
                                  background: '#008A7A',
                                  transform: 'scale(1.02)',
                                  zIndex: 10,
                                  boxShadow: '0 4px 12px rgba(0, 166, 153, 0.4)',
                                },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookingClick(bookingStarting);
                              }}
                            >
                              {/* Channel Logo */}
                              <Box
                                sx={{
                                  width: 26,
                                  height: 26,
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(255,255,255,0.4)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mr: 1.2,
                                  flexShrink: 0,
                                  border: '2px solid rgba(255,255,255,0.6)',
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                  backdropFilter: 'blur(4px)',
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    color: 'white',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                                    letterSpacing: '0.05em',
                                  }}
                                >
                                  {bookingStarting.source === 'Airbnb'
                                    ? 'A'
                                    : bookingStarting.source === 'Booking.com'
                                      ? 'B'
                                      : 'M'}
                                </Typography>
                              </Box>

                              {/* Guest info */}
                              <Box
                                sx={{
                                  flex: 1,
                                  minWidth: 0,
                                  overflow: 'visible',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'flex-start',
                                  px: 1,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: '0.85rem',
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    color: 'white',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                    letterSpacing: '0.02em',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    display: 'block',
                                  }}
                                >
                                  {bookingStarting.guestName}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    fontWeight: 700,
                                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                                    letterSpacing: '0.01em',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    display: 'block',
                                    mt: 0.1,
                                  }}
                                >
                                  {bookingStarting.guests} guests • €{bookingStarting.price}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '0.65rem',
                                    color: 'rgba(255,255,255,0.9)',
                                    fontWeight: 600,
                                    textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                                    letterSpacing: '0.01em',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    display: 'block',
                                    mt: 0.1,
                                  }}
                                >
                                  {bookingStarting.source} • {bookingStarting.nights} nights
                                </Typography>
                              </Box>
                            </Box>
                          </Tooltip>
                        ) : isBooked ? null : ( // Show continuation of booking bar (no content, just background)
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.02)',
                              },
                            }}
                          >
                            <Typography
                              variant="caption"
                              color={isCurrentMonthDate ? 'text.secondary' : 'text.disabled'}
                              sx={{
                                fontSize: '0.7rem',
                                fontWeight: isTodayDate ? 600 : 400,
                              }}
                            >
                              €{listing.price}
                            </Typography>
                          </Box>
                        )}

                        {/* Lock indicator for blocked dates */}
                        {isBooked && booking.status === 'blocked' && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 4,
                              left: 4,
                              bgcolor: 'rgba(0,0,0,0.7)',
                              borderRadius: '50%',
                              width: 16,
                              height: 16,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Lock size={10} color="white" />
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Modals */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          open={Boolean(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {selectedDates && (
        <ManageDatesModal
          dates={selectedDates}
          open={Boolean(selectedDates)}
          onClose={() => setSelectedDates(null)}
        />
      )}

      {/* Manage Dates Modal for Bookings */}
      <Dialog
        open={manageDatesOpen}
        onClose={() => setManageDatesOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Manage dates
          <IconButton onClick={() => setManageDatesOpen(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedBookingForModal && (
            <Box sx={{ mt: 2 }}>
              {/* Booking Info */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Booking Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Guest:</strong> {selectedBookingForModal.guestName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Guests:</strong> {selectedBookingForModal.guests}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Nights:</strong> {selectedBookingForModal.nights}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Price:</strong> €{selectedBookingForModal.price}/night
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Source:</strong> {selectedBookingForModal.source}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {selectedBookingForModal.status}
                </Typography>
              </Box>

              {/* Date Range */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Date Range
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Start date"
                    value={selectedDateRange.startDate}
                    onChange={(e) =>
                      setSelectedDateRange((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Calendar size={20} />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                  <TextField
                    label="End date"
                    value={selectedDateRange.endDate}
                    onChange={(e) =>
                      setSelectedDateRange((prev) => ({ ...prev, endDate: e.target.value }))
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Calendar size={20} />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Pricing Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Pricing
                </Typography>
                <TextField
                  label="Nightly base rate (before mark-up)"
                  value={selectedBookingForModal.price}
                  onChange={(e) => {
                    const updatedBooking = {
                      ...selectedBookingForModal,
                      price: parseInt(e.target.value) || 0,
                    };
                    setSelectedBookingForModal(updatedBooking);
                  }}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  Show per channel
                </Typography>
              </Box>

              {/* Availability Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Availability
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="Minimum nights"
                    value={selectedBookingForModal.nights}
                    onChange={(e) => {
                      const updatedBooking = {
                        ...selectedBookingForModal,
                        nights: parseInt(e.target.value) || 1,
                      };
                      setSelectedBookingForModal(updatedBooking);
                    }}
                    type="number"
                    sx={{ flex: 1 }}
                  />
                  <TextField label="Maximum nights" value="365" type="number" sx={{ flex: 1 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Availability" />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Guest can check-in"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Guest can check-out"
                  />
                </Box>
              </Box>

              {/* Rule-sets Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Rule-sets
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2">Airbnb Pro rules-sets</Typography>
                  <Box sx={{ width: 8, height: 8, bgcolor: 'error.main', borderRadius: '50%' }} />
                  <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                    ADD
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" onClick={() => setManageDatesOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setManageDatesOpen(false)}>
            + Add
          </Button>
          <Button variant="contained" onClick={() => setManageDatesOpen(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Property Details Panel */}
      <Dialog
        open={showPropertyDetails}
        onClose={() => setShowPropertyDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Property Details
          <IconButton onClick={() => setShowPropertyDetails(false)} size="small">
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedProperty && (
            <Box sx={{ mt: 2 }}>
              {/* Property Image and Basic Info */}
              <Box sx={{ mb: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedProperty.image}
                  alt={selectedProperty.name}
                  sx={{ borderRadius: 1, mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  {selectedProperty.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MapPin size={16} color="#666" />
                  <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                    {selectedProperty.location}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedProperty.description}
                </Typography>
              </Box>

              {/* Property Stats */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Card sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Star size={20} color="#ffc107" />
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {selectedProperty.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({selectedProperty.reviews} reviews)
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Average Rating
                  </Typography>
                </Card>

                <Card sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary">
                    €{selectedProperty.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Per Night
                  </Typography>
                </Card>

                <Card sx={{ p: 2 }}>
                  <Typography variant="h6">{selectedProperty.bookings}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Card>

                <Card sx={{ p: 2 }}>
                  <Typography variant="h6" color="success.main">
                    €{selectedProperty.revenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Card>
              </Box>

              {/* Property Details */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 3,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Property Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Users size={16} color="#666" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        Max Guests: {selectedProperty.guests}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Bed size={16} color="#666" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        Bedrooms: {selectedProperty.bedrooms}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Bath size={16} color="#666" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        Bathrooms: {selectedProperty.bathrooms}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Home size={16} color="#666" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        Property ID: {selectedProperty.id}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar size={16} color="#666" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        Last Booking: {selectedProperty.lastBooking}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="h6" gutterBottom>
                    Amenities
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedProperty.amenities.map((amenity: string, index: number) => (
                      <Chip
                        key={index}
                        label={amenity}
                        size="small"
                        variant="outlined"
                        icon={
                          amenity === 'WiFi' ? (
                            <Wifi size={14} />
                          ) : amenity === 'Parking' ? (
                            <Car size={14} />
                          ) : amenity === 'Kitchen' ? (
                            <Coffee size={14} />
                          ) : (
                            <Home size={14} />
                          )
                        }
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" onClick={() => setShowPropertyDetails(false)}>
            Close
          </Button>
          <Button variant="contained" onClick={() => setShowPropertyDetails(false)}>
            Edit Property
          </Button>
        </DialogActions>
      </Dialog>

      {/* Property Menu */}
      <Menu
        anchorEl={propertyMenuAnchor}
        open={Boolean(propertyMenuAnchor)}
        onClose={handlePropertyMenuClose}
      >
        <MenuItem onClick={handlePropertyMenuClose}>
          <ListItemIcon>
            <Eye size={16} />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePropertyMenuClose}>
          <ListItemIcon>
            <Calendar size={16} />
          </ListItemIcon>
          <ListItemText>Manage Calendar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePropertyMenuClose}>
          <ListItemIcon>
            <Search size={16} />
          </ListItemIcon>
          <ListItemText>View Bookings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handlePropertyMenuClose}>
          <ListItemIcon>
            <EyeOff size={16} />
          </ListItemIcon>
          <ListItemText>Hide Property</ListItemText>
        </MenuItem>
      </Menu>
    </DashboardContent>
  );
}
