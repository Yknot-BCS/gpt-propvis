// Mock data for Growthpoint property portfolio

export type PropertyType = 'Office' | 'Industrial' | 'Retail';
export type PropertyStatus = 'Active' | 'Under Development' | 'Disposed';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
    node: string;
    region: string;
  };
  metrics: {
    value: number;
    size: number; // sqm
    occupancyRate: number;
    annualRevenue: number;
    roi: number;
    yieldRate: number;
  };
  financial: {
    acquisitionDate?: string;
    acquisitionPrice?: number;
    currentValue: number;
    disposalDate?: string;
    disposalPrice?: number;
    profitLoss?: number;
  };
  tenant?: {
    name: string;
    leaseExpiry: string;
  };
}

export interface PortfolioMetrics {
  totalValue: number;
  totalProperties: number;
  averageOccupancy: number;
  totalRevenue: number;
  averageROI: number;
  totalSize: number;
}

export interface Transaction {
  id: string;
  type: 'Acquisition' | 'Disposal';
  propertyName: string;
  date: string;
  value: number;
  profitLoss?: number;
}

export interface Tenant {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  properties: {
    propertyId: string;
    propertyName: string;
    propertyType: PropertyType;
    totalArea: number; // sqm
    leaseStart: string;
    leaseExpiry: string;
    monthlyRental: number;
  }[];
  totalArea: number; // Total sqm across all properties
  totalMonthlyRental: number;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  creditRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  paymentHistory: 'On Time' | 'Occasional Delays' | 'Frequent Delays';
}

// Mock properties data
export const properties: Property[] = [
  {
    id: 'P001',
    name: 'Sandton City Office Tower',
    type: 'Office',
    status: 'Active',
    location: {
      lat: -26.1076,
      lng: 28.0567,
      address: '83 Rivonia Road, Sandhurst, Sandton',
      node: 'Sandton CBD',
      region: 'Gauteng',
    },
    metrics: {
      value: 450000000,
      size: 25000,
      occupancyRate: 95,
      annualRevenue: 42000000,
      roi: 9.3,
      yieldRate: 8.5,
    },
    financial: {
      acquisitionDate: '2018-03-15',
      acquisitionPrice: 380000000,
      currentValue: 450000000,
    },
    tenant: {
      name: 'Multiple Corporate Tenants',
      leaseExpiry: '2027-06-30',
    },
  },
  {
    id: 'P002',
    name: 'Gateway Theatre of Shopping',
    type: 'Retail',
    status: 'Active',
    location: {
      lat: -29.8127,
      lng: 30.9888,
      address: '1 Palm Boulevard, Umhlanga Ridge',
      node: 'Umhlanga',
      region: 'KwaZulu-Natal',
    },
    metrics: {
      value: 1200000000,
      size: 180000,
      occupancyRate: 98,
      annualRevenue: 156000000,
      roi: 13.0,
      yieldRate: 11.2,
    },
    financial: {
      acquisitionDate: '2015-11-20',
      acquisitionPrice: 950000000,
      currentValue: 1200000000,
    },
    tenant: {
      name: 'Multiple Retail Tenants',
      leaseExpiry: '2026-12-31',
    },
  },
  {
    id: 'P003',
    name: 'Waterfall Logistics Park',
    type: 'Industrial',
    status: 'Active',
    location: {
      lat: -25.9897,
      lng: 28.1167,
      address: 'Maxwell Drive, Waterfall City',
      node: 'Waterfall',
      region: 'Gauteng',
    },
    metrics: {
      value: 320000000,
      size: 45000,
      occupancyRate: 100,
      annualRevenue: 28800000,
      roi: 9.0,
      yieldRate: 8.2,
    },
    financial: {
      acquisitionDate: '2019-07-10',
      acquisitionPrice: 285000000,
      currentValue: 320000000,
    },
    tenant: {
      name: 'Amazon Logistics',
      leaseExpiry: '2029-07-31',
    },
  },
  {
    id: 'P004',
    name: 'Century City Office Park',
    type: 'Office',
    status: 'Active',
    location: {
      lat: -33.8926,
      lng: 18.5108,
      address: 'Ratanga Road, Century City, Cape Town',
      node: 'Century City',
      region: 'Western Cape',
    },
    metrics: {
      value: 280000000,
      size: 18000,
      occupancyRate: 92,
      annualRevenue: 25200000,
      roi: 9.0,
      yieldRate: 7.8,
    },
    financial: {
      acquisitionDate: '2017-05-22',
      acquisitionPrice: 245000000,
      currentValue: 280000000,
    },
    tenant: {
      name: 'Media24 Holdings',
      leaseExpiry: '2026-05-31',
    },
  },
  {
    id: 'P005',
    name: 'East Rand Industrial Hub',
    type: 'Industrial',
    status: 'Active',
    location: {
      lat: -26.1419,
      lng: 28.2429,
      address: 'Argent Industrial, Kempton Park',
      node: 'East Rand',
      region: 'Gauteng',
    },
    metrics: {
      value: 175000000,
      size: 32000,
      occupancyRate: 88,
      annualRevenue: 14000000,
      roi: 8.0,
      yieldRate: 7.5,
    },
    financial: {
      acquisitionDate: '2020-02-15',
      acquisitionPrice: 165000000,
      currentValue: 175000000,
    },
    tenant: {
      name: 'DHL Supply Chain',
      leaseExpiry: '2028-02-28',
    },
  },
  {
    id: 'P006',
    name: 'Pretoria CBD Office Complex',
    type: 'Office',
    status: 'Disposed',
    location: {
      lat: -25.7479,
      lng: 28.2293,
      address: 'Church Street, Pretoria CBD',
      node: 'Pretoria CBD',
      region: 'Gauteng',
    },
    metrics: {
      value: 0,
      size: 15000,
      occupancyRate: 0,
      annualRevenue: 0,
      roi: 0,
      yieldRate: 0,
    },
    financial: {
      acquisitionDate: '2016-08-10',
      acquisitionPrice: 120000000,
      currentValue: 0,
      disposalDate: '2024-09-20',
      disposalPrice: 95000000,
      profitLoss: -25000000,
    },
  },
  {
    id: 'P007',
    name: 'V&A Waterfront Retail Space',
    type: 'Retail',
    status: 'Active',
    location: {
      lat: -33.9025,
      lng: 18.4241,
      address: 'Victoria Wharf, V&A Waterfront',
      node: 'V&A Waterfront',
      region: 'Western Cape',
    },
    metrics: {
      value: 890000000,
      size: 65000,
      occupancyRate: 100,
      annualRevenue: 98000000,
      roi: 11.0,
      yieldRate: 10.5,
    },
    financial: {
      acquisitionDate: '2014-12-05',
      acquisitionPrice: 720000000,
      currentValue: 890000000,
    },
    tenant: {
      name: 'Multiple Premium Retailers',
      leaseExpiry: '2029-12-31',
    },
  },
  {
    id: 'P008',
    name: 'Rosebank Link Development',
    type: 'Office',
    status: 'Under Development',
    location: {
      lat: -26.1485,
      lng: 28.0428,
      address: 'Oxford Road, Rosebank',
      node: 'Rosebank',
      region: 'Gauteng',
    },
    metrics: {
      value: 520000000,
      size: 28000,
      occupancyRate: 0,
      annualRevenue: 0,
      roi: 0,
      yieldRate: 0,
    },
    financial: {
      acquisitionDate: '2023-04-01',
      acquisitionPrice: 420000000,
      currentValue: 520000000,
    },
  },
];

// Calculate portfolio metrics
export const calculatePortfolioMetrics = (props: Property[]): PortfolioMetrics => {
  const activeProperties = props.filter(p => p.status === 'Active');
  
  return {
    totalValue: activeProperties.reduce((sum, p) => sum + p.metrics.value, 0),
    totalProperties: activeProperties.length,
    averageOccupancy: activeProperties.reduce((sum, p) => sum + p.metrics.occupancyRate, 0) / activeProperties.length,
    totalRevenue: activeProperties.reduce((sum, p) => sum + p.metrics.annualRevenue, 0),
    averageROI: activeProperties.reduce((sum, p) => sum + p.metrics.roi, 0) / activeProperties.length,
    totalSize: activeProperties.reduce((sum, p) => sum + p.metrics.size, 0),
  };
};

// Recent transactions
export const recentTransactions: Transaction[] = [
  {
    id: 'T001',
    type: 'Disposal',
    propertyName: 'Pretoria CBD Office Complex',
    date: '2024-09-20',
    value: 95000000,
    profitLoss: -25000000,
  },
  {
    id: 'T002',
    type: 'Acquisition',
    propertyName: 'Rosebank Link Development',
    date: '2023-04-01',
    value: 420000000,
  },
  {
    id: 'T003',
    type: 'Acquisition',
    propertyName: 'East Rand Industrial Hub',
    date: '2020-02-15',
    value: 165000000,
  },
];

// Financial performance data for charts
export const monthlyPerformance = [
  { month: 'Apr', revenue: 28500000, expenses: 12200000, profit: 16300000 },
  { month: 'May', revenue: 29200000, expenses: 12800000, profit: 16400000 },
  { month: 'Jun', revenue: 30100000, expenses: 13100000, profit: 17000000 },
  { month: 'Jul', revenue: 29800000, expenses: 12900000, profit: 16900000 },
  { month: 'Aug', revenue: 31200000, expenses: 13500000, profit: 17700000 },
  { month: 'Sep', revenue: 32400000, expenses: 14000000, profit: 18400000 },
];

// Portfolio distribution by type
export const portfolioByType = [
  { type: 'Office', value: 1250000000, count: 3 },
  { type: 'Retail', value: 2090000000, count: 2 },
  { type: 'Industrial', value: 495000000, count: 2 },
];

// Regional distribution
export const regionalDistribution = [
  { region: 'Gauteng', value: 1465000000, properties: 4 },
  { region: 'Western Cape', value: 1170000000, properties: 2 },
  { region: 'KwaZulu-Natal', value: 1200000000, properties: 1 },
];

// Notification types
export type NotificationType = 'critical' | 'warning' | 'info' | 'success';
export type NotificationCategory = 'occupancy' | 'financial' | 'lease' | 'maintenance' | 'system' | 'transaction';

export interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  propertyId?: string;
  propertyName?: string;
  isRead: boolean;
  actionUrl?: string;
  roles: ('executive' | 'asset-manager' | 'finance' | 'employee')[];
}

// Mock notifications
export const notifications: Notification[] = [
  {
    id: 'N001',
    type: 'critical',
    category: 'occupancy',
    title: 'Critical Occupancy Drop',
    message: 'East Rand Industrial Hub occupancy dropped to 88% (below 90% threshold)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    propertyId: 'P005',
    propertyName: 'East Rand Industrial Hub',
    isRead: false,
    roles: ['executive', 'asset-manager'],
  },
  {
    id: 'N002',
    type: 'warning',
    category: 'lease',
    title: 'Lease Expiring Soon',
    message: 'Media24 Holdings lease at Century City Office Park expires in 18 months',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    propertyId: 'P004',
    propertyName: 'Century City Office Park',
    isRead: false,
    roles: ['executive', 'asset-manager'],
  },
  {
    id: 'N003',
    type: 'critical',
    category: 'financial',
    title: 'Budget Variance Alert',
    message: 'Q3 operational expenses 12% over budget across portfolio',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    isRead: false,
    roles: ['executive', 'finance'],
  },
  {
    id: 'N004',
    type: 'success',
    category: 'transaction',
    title: 'Acquisition Completed',
    message: 'Successfully completed acquisition of Rosebank Link Development',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    propertyId: 'P008',
    propertyName: 'Rosebank Link Development',
    isRead: true,
    roles: ['executive', 'finance', 'asset-manager'],
  },
  {
    id: 'N005',
    type: 'warning',
    category: 'maintenance',
    title: 'Scheduled Maintenance Required',
    message: 'Annual HVAC maintenance due for Sandton City Office Tower',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    propertyId: 'P001',
    propertyName: 'Sandton City Office Tower',
    isRead: false,
    roles: ['asset-manager', 'employee'],
  },
  {
    id: 'N006',
    type: 'info',
    category: 'financial',
    title: 'Monthly Report Available',
    message: 'September 2024 portfolio performance report is ready for review',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    isRead: true,
    roles: ['executive', 'finance', 'asset-manager'],
  },
  {
    id: 'N007',
    type: 'warning',
    category: 'occupancy',
    title: 'Tenant Vacancy Notice',
    message: 'Potential vacancy at Century City Office Park - tenant considering early termination',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    propertyId: 'P004',
    propertyName: 'Century City Office Park',
    isRead: false,
    roles: ['executive', 'asset-manager'],
  },
  {
    id: 'N008',
    type: 'info',
    category: 'system',
    title: 'System Update',
    message: 'Portfolio dashboard will undergo maintenance on Sunday 2:00 AM - 4:00 AM',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: true,
    roles: ['executive', 'asset-manager', 'finance', 'employee'],
  },
  {
    id: 'N009',
    type: 'critical',
    category: 'financial',
    title: 'Disposal Loss Confirmed',
    message: 'Pretoria CBD Office Complex disposal resulted in R25M loss',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
    propertyId: 'P006',
    propertyName: 'Pretoria CBD Office Complex',
    isRead: true,
    roles: ['executive', 'finance'],
  },
  {
    id: 'N010',
    type: 'success',
    category: 'occupancy',
    title: 'Full Occupancy Achieved',
    message: 'Waterfall Logistics Park reached 100% occupancy with new tenant',
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), // 4 days ago
    propertyId: 'P003',
    propertyName: 'Waterfall Logistics Park',
    isRead: true,
    roles: ['executive', 'asset-manager'],
  },
];

// Mock tenants data
export const tenants: Tenant[] = [
  {
    id: 'T001',
    name: 'Amazon Logistics',
    industry: 'E-commerce & Logistics',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@amazon.com',
    phone: '+27 11 555 1234',
    properties: [
      {
        propertyId: 'P003',
        propertyName: 'Waterfall Logistics Park',
        propertyType: 'Industrial',
        totalArea: 45000,
        leaseStart: '2019-07-01',
        leaseExpiry: '2029-07-31',
        monthlyRental: 2400000,
      },
    ],
    totalArea: 45000,
    totalMonthlyRental: 2400000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T002',
    name: 'Media24 Holdings',
    industry: 'Media & Publishing',
    contactPerson: 'David van der Merwe',
    email: 'david.vandermerwe@media24.com',
    phone: '+27 21 555 5678',
    properties: [
      {
        propertyId: 'P004',
        propertyName: 'Century City Office Park',
        propertyType: 'Office',
        totalArea: 18000,
        leaseStart: '2017-06-01',
        leaseExpiry: '2026-05-31',
        monthlyRental: 2100000,
      },
    ],
    totalArea: 18000,
    totalMonthlyRental: 2100000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T003',
    name: 'Woolworths Holdings',
    industry: 'Retail',
    contactPerson: 'Lindiwe Ndlovu',
    email: 'lindiwe.ndlovu@woolworths.co.za',
    phone: '+27 21 555 9876',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: 'Retail',
        totalArea: 8500,
        leaseStart: '2015-12-01',
        leaseExpiry: '2026-12-31',
        monthlyRental: 1700000,
      },
      {
        propertyId: 'P007',
        propertyName: 'V&A Waterfront Retail Space',
        propertyType: 'Retail',
        totalArea: 3200,
        leaseStart: '2020-03-01',
        leaseExpiry: '2030-02-28',
        monthlyRental: 960000,
      },
    ],
    totalArea: 11700,
    totalMonthlyRental: 2660000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T004',
    name: 'Standard Bank',
    industry: 'Financial Services',
    contactPerson: 'Michael Botha',
    email: 'michael.botha@standardbank.co.za',
    phone: '+27 11 555 3456',
    properties: [
      {
        propertyId: 'P001',
        propertyName: 'Sandton City Office Tower',
        propertyType: 'Office',
        totalArea: 12500,
        leaseStart: '2018-04-01',
        leaseExpiry: '2027-06-30',
        monthlyRental: 3125000,
      },
    ],
    totalArea: 12500,
    totalMonthlyRental: 3125000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T005',
    name: 'Pick n Pay',
    industry: 'Retail',
    contactPerson: 'Thandi Mkhize',
    email: 'thandi.mkhize@pnp.co.za',
    phone: '+27 31 555 7890',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: 'Retail',
        totalArea: 6800,
        leaseStart: '2016-01-15',
        leaseExpiry: '2026-01-14',
        monthlyRental: 1360000,
      },
    ],
    totalArea: 6800,
    totalMonthlyRental: 1360000,
    status: 'Expiring Soon',
    creditRating: 'Good',
    paymentHistory: 'On Time',
  },
  {
    id: 'T006',
    name: 'Deloitte South Africa',
    industry: 'Professional Services',
    contactPerson: 'James Patterson',
    email: 'jpatterson@deloitte.co.za',
    phone: '+27 11 555 2468',
    properties: [
      {
        propertyId: 'P001',
        propertyName: 'Sandton City Office Tower',
        propertyType: 'Office',
        totalArea: 8200,
        leaseStart: '2019-09-01',
        leaseExpiry: '2027-06-30',
        monthlyRental: 2050000,
      },
    ],
    totalArea: 8200,
    totalMonthlyRental: 2050000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T007',
    name: 'Tiger Brands',
    industry: 'Manufacturing',
    contactPerson: 'Nomsa Dlamini',
    email: 'nomsa.dlamini@tigerbrands.com',
    phone: '+27 11 555 3698',
    properties: [
      {
        propertyId: 'P005',
        propertyName: 'East Rand Industrial Hub',
        propertyType: 'Industrial',
        totalArea: 28000,
        leaseStart: '2016-08-01',
        leaseExpiry: '2025-07-31',
        monthlyRental: 1400000,
      },
    ],
    totalArea: 28000,
    totalMonthlyRental: 1400000,
    status: 'Expiring Soon',
    creditRating: 'Good',
    paymentHistory: 'Occasional Delays',
  },
  {
    id: 'T008',
    name: 'Mr Price Group',
    industry: 'Retail',
    contactPerson: 'Sanjeev Patel',
    email: 'sanjeev.patel@mrprice.com',
    phone: '+27 31 555 1597',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: 'Retail',
        totalArea: 4200,
        leaseStart: '2017-05-01',
        leaseExpiry: '2027-04-30',
        monthlyRental: 840000,
      },
    ],
    totalArea: 4200,
    totalMonthlyRental: 840000,
    status: 'Active',
    creditRating: 'Good',
    paymentHistory: 'On Time',
  },
  {
    id: 'T009',
    name: 'DHL Supply Chain',
    industry: 'Logistics',
    contactPerson: 'Werner Schmidt',
    email: 'werner.schmidt@dhl.com',
    phone: '+27 11 555 7531',
    properties: [
      {
        propertyId: 'P005',
        propertyName: 'East Rand Industrial Hub',
        propertyType: 'Industrial',
        totalArea: 4000,
        leaseStart: '2021-03-01',
        leaseExpiry: '2026-02-28',
        monthlyRental: 200000,
      },
    ],
    totalArea: 4000,
    totalMonthlyRental: 200000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T010',
    name: 'Edgars Active',
    industry: 'Retail',
    contactPerson: 'Lisa van Niekerk',
    email: 'lisa.vanniekerk@edgars.co.za',
    phone: '+27 11 555 9513',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: 'Retail',
        totalArea: 3800,
        leaseStart: '2015-11-20',
        leaseExpiry: '2025-11-19',
        monthlyRental: 760000,
      },
    ],
    totalArea: 3800,
    totalMonthlyRental: 760000,
    status: 'Expiring Soon',
    creditRating: 'Fair',
    paymentHistory: 'Occasional Delays',
  },
];
