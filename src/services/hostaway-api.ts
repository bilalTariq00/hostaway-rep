// Hostaway API Service
// Handles all API calls to Hostaway platform

export interface HostawayCredentials {
  apiKey: string;
  accountId: string;
  userId: string;
}

export interface HostawayProperty {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  status: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  basePrice: number;
  currency: string;
  images: string[];
  amenities: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface HostawayReservation {
  id: number;
  propertyId: number;
  propertyName: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalPrice: number;
  currency: string;
  guests: number;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface HostawayGuest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  totalReservations: number;
  totalSpent: number;
  currency: string;
  lastStay: string;
  createdAt: string;
}

export interface HostawayRevenue {
  period: string;
  totalRevenue: number;
  currency: string;
  reservations: number;
  averageRate: number;
  occupancyRate: number;
}

export interface HostawayChannel {
  id: number;
  name: string;
  type: string;
  status: string;
  properties: number;
  reservations: number;
  revenue: number;
  currency: string;
  lastSync: string;
}

class HostawayApiService {
  private baseUrl = 'https://api.hostaway.com/v1';
  private credentials: HostawayCredentials | null = null;

  constructor() {
    this.loadCredentials();
  }

  private loadCredentials(): void {
    try {
      const stored = localStorage.getItem('hostawayCredentials');
      if (stored) {
        this.credentials = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load Hostaway credentials:', error);
    }
  }

  public setCredentials(credentials: HostawayCredentials): void {
    this.credentials = credentials;
    localStorage.setItem('hostawayCredentials', JSON.stringify(credentials));
  }

  public hasCredentials(): boolean {
    return !!(this.credentials?.apiKey && this.credentials?.accountId);
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.credentials) {
      throw new Error('Hostaway credentials not found');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.credentials.apiKey}`,
      'Content-Type': 'application/json',
      'X-Account-ID': this.credentials.accountId,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Hostaway API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Hostaway API request failed:', error);
      throw error;
    }
  }

  // Properties API
  public async getProperties(): Promise<HostawayProperty[]> {
    try {
      const response = await this.makeRequest<{ data: HostawayProperty[] }>('/properties');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      return this.getMockProperties();
    }
  }

  public async getProperty(id: number): Promise<HostawayProperty | null> {
    try {
      const response = await this.makeRequest<{ data: HostawayProperty }>(`/properties/${id}`);
      return response.data || null;
    } catch (error) {
      console.error(`Failed to fetch property ${id}:`, error);
      return this.getMockProperties().find(p => p.id === id) || null;
    }
  }

  // Reservations API
  public async getReservations(): Promise<HostawayReservation[]> {
    try {
      const response = await this.makeRequest<{ data: HostawayReservation[] }>('/reservations');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
      return this.getMockReservations();
    }
  }

  public async getReservation(id: number): Promise<HostawayReservation | null> {
    try {
      const response = await this.makeRequest<{ data: HostawayReservation }>(`/reservations/${id}`);
      return response.data || null;
    } catch (error) {
      console.error(`Failed to fetch reservation ${id}:`, error);
      return this.getMockReservations().find(r => r.id === id) || null;
    }
  }

  // Guests API
  public async getGuests(): Promise<HostawayGuest[]> {
    try {
      const response = await this.makeRequest<{ data: HostawayGuest[] }>('/guests');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch guests:', error);
      return this.getMockGuests();
    }
  }

  // Revenue API
  public async getRevenue(period: string = 'month'): Promise<HostawayRevenue[]> {
    try {
      const response = await this.makeRequest<{ data: HostawayRevenue[] }>(`/revenue?period=${period}`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch revenue:', error);
      return this.getMockRevenue();
    }
  }

  // Channels API
  public async getChannels(): Promise<HostawayChannel[]> {
    try {
      const response = await this.makeRequest<{ data: HostawayChannel[] }>('/channels');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch channels:', error);
      return this.getMockChannels();
    }
  }

  // Mock data fallbacks
  private getMockProperties(): HostawayProperty[] {
    return [
      {
        id: 1,
        name: 'Cozy Downtown Apartment',
        address: '123 Main St',
        city: 'New York',
        country: 'USA',
        status: 'active',
        type: 'apartment',
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        basePrice: 150,
        currency: 'USD',
        images: ['/assets/images/product/product-1.webp'],
        amenities: ['WiFi', 'Kitchen', 'Parking'],
        description: 'Beautiful downtown apartment with modern amenities',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: 2,
        name: 'Luxury Beach House',
        address: '456 Ocean Dr',
        city: 'Miami',
        country: 'USA',
        status: 'active',
        type: 'house',
        bedrooms: 4,
        bathrooms: 3,
        maxGuests: 8,
        basePrice: 350,
        currency: 'USD',
        images: ['/assets/images/product/product-2.webp'],
        amenities: ['Pool', 'Beach Access', 'WiFi', 'Kitchen'],
        description: 'Stunning beachfront property with private pool',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-16T00:00:00Z',
      },
    ];
  }

  private getMockReservations(): HostawayReservation[] {
    return [
      {
        id: 1,
        propertyId: 1,
        propertyName: 'Cozy Downtown Apartment',
        guestName: 'John Smith',
        guestEmail: 'john@example.com',
        checkIn: '2024-02-01',
        checkOut: '2024-02-05',
        status: 'confirmed',
        totalPrice: 600,
        currency: 'USD',
        guests: 2,
        source: 'Airbnb',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: 2,
        propertyId: 2,
        propertyName: 'Luxury Beach House',
        guestName: 'Sarah Johnson',
        guestEmail: 'sarah@example.com',
        checkIn: '2024-02-10',
        checkOut: '2024-02-15',
        status: 'confirmed',
        totalPrice: 1750,
        currency: 'USD',
        guests: 6,
        source: 'Booking.com',
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-01-20T00:00:00Z',
      },
    ];
  }

  private getMockGuests(): HostawayGuest[] {
    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        phone: '+1-555-0123',
        country: 'USA',
        totalReservations: 3,
        totalSpent: 1200,
        currency: 'USD',
        lastStay: '2024-01-15',
        createdAt: '2023-06-01T00:00:00Z',
      },
      {
        id: 2,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@example.com',
        phone: '+1-555-0456',
        country: 'Canada',
        totalReservations: 2,
        totalSpent: 2100,
        currency: 'USD',
        lastStay: '2024-01-20',
        createdAt: '2023-08-15T00:00:00Z',
      },
    ];
  }

  private getMockRevenue(): HostawayRevenue[] {
    return [
      {
        period: '2024-01',
        totalRevenue: 2350,
        currency: 'USD',
        reservations: 2,
        averageRate: 1175,
        occupancyRate: 0.75,
      },
      {
        period: '2024-02',
        totalRevenue: 1800,
        currency: 'USD',
        reservations: 3,
        averageRate: 600,
        occupancyRate: 0.60,
      },
    ];
  }

  private getMockChannels(): HostawayChannel[] {
    return [
      {
        id: 1,
        name: 'Airbnb',
        type: 'OTA',
        status: 'active',
        properties: 2,
        reservations: 5,
        revenue: 1500,
        currency: 'USD',
        lastSync: '2024-01-20T10:30:00Z',
      },
      {
        id: 2,
        name: 'Booking.com',
        type: 'OTA',
        status: 'active',
        properties: 2,
        reservations: 3,
        revenue: 1200,
        currency: 'USD',
        lastSync: '2024-01-20T10:25:00Z',
      },
    ];
  }
}

// Export singleton instance
export const hostawayApi = new HostawayApiService();
