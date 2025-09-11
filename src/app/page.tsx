"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, BarChart3, Building, TrendingUp, Users, Search, Menu, X, Globe, type LucideIcon } from 'lucide-react';// Import the PropertyMap component
import PropertyMap from '@/components/PropertyMap';

// Mock data for dashboard stats
const dashboardStats = {
  totalProperties: 847,
  totalValue: 'R2.4B',
  averageOccupancy: '87%',
  monthlyGrowth: '+12.3%',
  activeLeases: 432,
  maintenanceRequests: 23
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

// Interface for stats card props
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

interface PlaceholderViewProps {
  title: string;
  icon: LucideIcon;
}

// Interface for property data
interface PropertyData {
  id: number;
  name: string;
  location: string;
  value: string;
  status: string;
  occupancy: string;
}

// Mock recent properties data
const recentProperties = [
  { id: 1, name: 'Sandton Corporate Centre', location: 'Sandton, GP', value: 'R45M', status: 'Active', occupancy: '94%' },
  { id: 2, name: 'Cape Town Waterfront Mall', location: 'Cape Town, WC', value: 'R78M', status: 'Active', occupancy: '89%' },
  { id: 3, name: 'Durban Industrial Park', location: 'Durban, KZN', value: 'R32M', status: 'Vacant', occupancy: '0%' },
  { id: 4, name: 'Pretoria Office Complex', location: 'Pretoria, GP', value: 'R55M', status: 'Active', occupancy: '76%' }
];

// Top Navigation component
const TopNavbar: React.FC<{ currentView: string; setCurrentView: (view: string) => void }> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'map', name: 'Property Map', icon: MapPin },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'properties', name: 'Properties', icon: Building },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'tenants', name: 'Tenants', icon: Users }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PropView SA</h1>
              <p className="text-xs text-gray-500">Property Management</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.id 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs font-semibold text-white">JD</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Property Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                    currentView === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Dashboard stats cards
const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600',
    green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600',
    yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600',
    red: 'bg-gradient-to-br from-red-50 to-red-100 text-red-600'
  };

  const iconBgClasses = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    red: 'bg-gradient-to-br from-red-500 to-red-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBgClasses[color]} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};

// Recent properties table
const RecentProperties = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Recent Properties</h3>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All →
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Occupancy</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {recentProperties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{property.name}</div>
                    <div className="text-xs text-gray-500">ID: #{property.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{property.location}</span>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm font-bold text-gray-900">{property.value}</div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                  property.status === 'Active' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {property.status}
                </span>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    property.occupancy === '0%' ? 'bg-red-500' : 
                    parseInt(property.occupancy) >= 80 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{property.occupancy}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Dashboard view
const DashboardView = () => (
  <div className="space-y-8">
    {/* Welcome header */}
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-3">Welcome to PropView SA</h1>
        <p className="text-blue-100 text-lg mb-6">Manage your South African property portfolio with ease and precision</p>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>System Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>+12.3% Growth This Month</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <StatsCard 
        title="Total Properties" 
        value={dashboardStats.totalProperties}
        icon={Building}
        color="blue"
      />
      <StatsCard 
        title="Portfolio Value" 
        value={dashboardStats.totalValue}
        icon={TrendingUp}
        color="green"
      />
      <StatsCard 
        title="Avg Occupancy" 
        value={dashboardStats.averageOccupancy}
        icon={Users}
        trend={dashboardStats.monthlyGrowth}
        color="yellow"
      />
      <StatsCard 
        title="Active Leases" 
        value={dashboardStats.activeLeases}
        icon={Building}
        color="blue"
      />
      <StatsCard 
        title="Maintenance" 
        value={dashboardStats.maintenanceRequests}
        icon={Building}
        color="red"
      />
      <StatsCard 
        title="Growth Rate" 
        value={dashboardStats.monthlyGrowth}
        icon={TrendingUp}
        color="green"
      />
    </div>

    {/* Recent properties */}
    <RecentProperties />
  </div>
);

// Map view component - now using the actual PropertyMap component
const MapView = () => <PropertyMap />;

// Placeholder views
const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
    <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600">This section is under development.</p>
  </div>
);

// Main app component
export default function PropertyManagementApp() {
  const [currentView, setCurrentView] = useState('map'); // Start with map view as default

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'map':
        return <MapView />;
      case 'properties':
        return <PlaceholderView title="Properties Management" icon={Building} />;
      case 'analytics':
        return <PlaceholderView title="Analytics & Reports" icon={BarChart3} />;
      case 'tenants':
        return <PlaceholderView title="Tenant Management" icon={Users} />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopNavbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main content area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>
    </div>
  );
}