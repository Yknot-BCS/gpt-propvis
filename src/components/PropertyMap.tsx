"use client";
import React, { useState } from 'react';
import { MapPin, Building, Users, TrendingUp, X, Eye, Edit } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Types and Interfaces
interface PropertyLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  value: string;
  occupancy: number;
  status: 'Active' | 'Vacant' | 'Under Construction' | 'Maintenance';
  type: 'Commercial' | 'Residential' | 'Industrial' | 'Mixed Use';
  tenants: number;
  monthlyRevenue: string;
  yearBuilt: number;
  size: string; // in sqm
  description?: string;
}

interface PropertyPopupProps {
  property: PropertyLocation;
  onClose: () => void;
  onView: (property: PropertyLocation) => void;
  onEdit: (property: PropertyLocation) => void;
}

// Mock property data for South Africa
const mockProperties: PropertyLocation[] = [
  {
    id: '1',
    name: 'Sandton City Office Complex',
    address: 'Sandton City, Johannesburg, GP',
    latitude: -26.1076,
    longitude: 28.0567,
    value: 'R125,000,000',
    occupancy: 94,
    status: 'Active',
    type: 'Commercial',
    tenants: 45,
    monthlyRevenue: 'R2,100,000',
    yearBuilt: 2018,
    size: '15,000 sqm',
    description: 'Premium office space in the heart of Sandton business district'
  },
  {
    id: '2',
    name: 'Cape Town Waterfront Mall',
    address: 'V&A Waterfront, Cape Town, WC',
    latitude: -33.9019,
    longitude: 18.4232,
    value: 'R89,500,000',
    occupancy: 89,
    status: 'Active',
    type: 'Commercial',
    tenants: 78,
    monthlyRevenue: 'R1,850,000',
    yearBuilt: 2015,
    size: '22,000 sqm',
    description: 'Upscale retail and entertainment complex with ocean views'
  },
  {
    id: '3',
    name: 'Durban Industrial Park',
    address: 'Pinetown, Durban, KZN',
    latitude: -29.8587,
    longitude: 31.0218,
    value: 'R45,000,000',
    occupancy: 0,
    status: 'Vacant',
    type: 'Industrial',
    tenants: 0,
    monthlyRevenue: 'R0',
    yearBuilt: 2020,
    size: '8,500 sqm',
    description: 'Modern industrial facility ready for manufacturing operations'
  },
  {
    id: '4',
    name: 'Pretoria Government Complex',
    address: 'Church Street, Pretoria, GP',
    latitude: -25.7479,
    longitude: 28.2293,
    value: 'R67,500,000',
    occupancy: 76,
    status: 'Active',
    type: 'Commercial',
    tenants: 12,
    monthlyRevenue: 'R980,000',
    yearBuilt: 2012,
    size: '12,000 sqm',
    description: 'Professional office building serving government agencies'
  },
  {
    id: '5',
    name: 'Port Elizabeth Residential Complex',
    address: 'Summerstrand, Port Elizabeth, EC',
    latitude: -33.9608,
    longitude: 25.6022,
    value: 'R23,800,000',
    occupancy: 82,
    status: 'Active',
    type: 'Residential',
    tenants: 156,
    monthlyRevenue: 'R645,000',
    yearBuilt: 2019,
    size: '5,200 sqm',
    description: 'Luxury beachfront apartments with modern amenities'
  },
  {
    id: '6',
    name: 'Bloemfontein Mixed Development',
    address: 'Westdene, Bloemfontein, FS',
    latitude: -29.0852,
    longitude: 26.1596,
    value: 'R34,200,000',
    occupancy: 65,
    status: 'Under Construction',
    type: 'Mixed Use',
    tenants: 23,
    monthlyRevenue: 'R420,000',
    yearBuilt: 2023,
    size: '9,800 sqm',
    description: 'Mixed-use development with retail and residential components'
  },
  {
    id: '7',
    name: 'Polokwane Shopping Centre',
    address: 'CBD, Polokwane, LP',
    latitude: -23.9045,
    longitude: 29.4689,
    value: 'R56,800,000',
    occupancy: 92,
    status: 'Active',
    type: 'Commercial',
    tenants: 67,
    monthlyRevenue: 'R1,200,000',
    yearBuilt: 2019,
    size: '18,500 sqm',
    description: 'Modern shopping centre with major retail anchors and entertainment facilities'
  },
  {
    id: '8',
    name: 'Nelspruit Industrial Complex',
    address: 'Industrial Area, Nelspruit, MP',
    latitude: -25.4748,
    longitude: 30.9703,
    value: 'R28,500,000',
    occupancy: 0,
    status: 'Maintenance',
    type: 'Industrial',
    tenants: 0,
    monthlyRevenue: 'R0',
    yearBuilt: 2017,
    size: '12,000 sqm',
    description: 'Heavy industrial facility undergoing major maintenance and upgrades'
  },
  {
    id: '9',
    name: 'Kimberley Residential Estate',
    address: 'Riviera, Kimberley, NC',
    latitude: -28.7386,
    longitude: 24.7633,
    value: 'R18,900,000',
    occupancy: 88,
    status: 'Active',
    type: 'Residential',
    tenants: 124,
    monthlyRevenue: 'R380,000',
    yearBuilt: 2021,
    size: '6,200 sqm',
    description: 'Luxury residential complex with modern amenities and security features'
  },
  {
    id: '10',
    name: 'East London Office Tower',
    address: 'Beachfront, East London, EC',
    latitude: -33.0292,
    longitude: 27.8546,
    value: 'R42,300,000',
    occupancy: 76,
    status: 'Active',
    type: 'Commercial',
    tenants: 34,
    monthlyRevenue: 'R890,000',
    yearBuilt: 2016,
    size: '14,800 sqm',
    description: 'Premium office space with ocean views and modern facilities'
  }
];

// Property popup component
const PropertyPopup: React.FC<PropertyPopupProps> = ({ property, onClose, onView, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Vacant': return 'bg-red-100 text-red-800 border-red-200';
      case 'Under Construction': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Maintenance': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 90) return 'text-green-600';
    if (occupancy >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="pr-12">
            <h3 className="text-2xl font-bold text-white mb-2">{property.name}</h3>
            <div className="flex items-center space-x-2 text-blue-100">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.address}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Type */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(property.status)}`}>
              {property.status}
            </span>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {property.type}
            </span>
          </div>

          {/* Description */}
          {property.description && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-900">{property.value}</p>
            <p className="text-xs text-blue-700 font-medium">Property Value</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${getOccupancyColor(property.occupancy)}`}>
              {property.occupancy}%
            </p>
            <p className="text-xs text-green-700 font-medium">Occupancy Rate</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-900">{property.tenants}</p>
            <p className="text-xs text-purple-700 font-medium">Active Tenants</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-orange-900">{property.monthlyRevenue}</p>
            <p className="text-xs text-orange-700 font-medium">Monthly Revenue</p>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center">
            <p className="text-lg font-bold text-indigo-900">{property.yearBuilt}</p>
            <p className="text-xs text-indigo-700 font-medium">Year Built</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-center">
            <p className="text-lg font-bold text-teal-900">{property.size}</p>
            <p className="text-xs text-teal-700 font-medium">Total Size</p>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-4 text-center">
            <p className="text-lg font-bold text-rose-900">{property.type}</p>
            <p className="text-xs text-rose-700 font-medium">Property Type</p>
          </div>
        </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm mb-3">Property Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Year Built:</span>
                <span className="font-semibold text-gray-900">{property.yearBuilt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-semibold text-gray-900">{property.size}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={() => onView(property)}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <Eye className="w-5 h-5" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => onEdit(property)}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium"
          >
            <Edit className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom marker component
const CustomMarker: React.FC<{ property: PropertyLocation; onPropertyClick: (property: PropertyLocation) => void }> = ({ property, onPropertyClick }) => {
  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10B981';
      case 'Vacant': return '#EF4444';
      case 'Under Construction': return '#F59E0B';
      case 'Maintenance': return '#F97316';
      default: return '#6B7280';
    }
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'Commercial': return '🏢';
      case 'Residential': return '🏠';
      case 'Industrial': return '🏭';
      case 'Mixed Use': return '🏬';
      default: return '🏢';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return '●';
      case 'Vacant': return '○';
      case 'Under Construction': return '🔨';
      case 'Maintenance': return '🔧';
      default: return '●';
    }
  };

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 48px; 
        height: 48px; 
        background: linear-gradient(135deg, ${getMarkerColor(property.status)} 0%, ${getMarkerColor(property.status)}CC 100%);
        border: 4px solid white; 
        border-radius: 50%; 
        box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 2px ${getMarkerColor(property.status)}40;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        font-family: system-ui, -apple-system, sans-serif;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <div style="
          font-size: 16px;
          line-height: 1;
          margin-bottom: 2px;
        ">${getPropertyIcon(property.type)}</div>
        <div style="
          font-size: 10px;
          font-weight: bold;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          background: rgba(0,0,0,0.3);
          padding: 1px 4px;
          border-radius: 8px;
          min-width: 16px;
          text-align: center;
        ">${property.occupancy}%</div>
        <div style="
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: ${getMarkerColor(property.status)};
          border: 2px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 6px;
          color: white;
          font-weight: bold;
        ">${getStatusIcon(property.status)}</div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <Marker
      position={[property.latitude, property.longitude] as [number, number]}
      icon={customIcon}
      eventHandlers={{
        click: () => onPropertyClick(property),
      }}
    >
      <Popup maxWidth={400} minWidth={300}>
        <div style={{ 
          padding: '16px', 
          maxWidth: '400px', 
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '2px solid #e2e8f0'
          }}>
            <div>
              <div style={{ 
                fontWeight: '700', 
                color: '#1e293b', 
                fontSize: '16px',
                marginBottom: '4px'
              }}>
                {property.name}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>📍</span>
                {property.address}
              </div>
            </div>
            <div style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              color: property.status === 'Active' ? '#065f46' : 
                    property.status === 'Vacant' ? '#991b1b' :
                    property.status === 'Under Construction' ? '#92400e' : '#9a3412',
              background: property.status === 'Active' ? '#d1fae5' : 
                         property.status === 'Vacant' ? '#fee2e2' :
                         property.status === 'Under Construction' ? '#fef3c7' : '#fed7aa'
            }}>
              {property.status}
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{ textAlign: 'center', padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>{property.value}</div>
              <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Property Value</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: property.occupancy >= 80 ? '#059669' : property.occupancy >= 50 ? '#d97706' : '#dc2626'
              }}>
                {property.occupancy}%
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Occupancy</div>
            </div>
          </div>

          {/* Detailed Info */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '8px',
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              <strong style={{ color: '#374151' }}>Type:</strong> {property.type}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              <strong style={{ color: '#374151' }}>Tenants:</strong> {property.tenants}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              <strong style={{ color: '#374151' }}>Built:</strong> {property.yearBuilt}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              <strong style={{ color: '#374151' }}>Size:</strong> {property.size}
            </div>
          </div>

          {/* Revenue */}
          <div style={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            <div style={{ fontSize: '12px', opacity: '0.9', marginBottom: '2px' }}>Monthly Revenue</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{property.monthlyRevenue}</div>
          </div>

          {/* Description */}
          {property.description && (
            <div style={{ 
              fontSize: '11px', 
              color: '#64748b', 
              fontStyle: 'italic',
              padding: '8px',
              background: 'white',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              "{property.description}"
            </div>
          )}

          {/* Click hint */}
          <div style={{ 
            textAlign: 'center', 
            fontSize: '10px', 
            color: '#94a3b8', 
            marginTop: '8px',
            padding: '4px',
            background: '#f8fafc',
            borderRadius: '4px'
          }}>
            Click marker for full details
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

// Map legend component
const MapLegend: React.FC = () => (
  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-5 z-10 max-w-xs">
    <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-lg">Property Legend</h4>
    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-3 h-3 sm:w-5 sm:h-5 bg-green-500 rounded-full shadow-sm flex-shrink-0"></div>
        <span className="font-medium text-gray-700 truncate">Active Properties</span>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-3 h-3 sm:w-5 sm:h-5 bg-red-500 rounded-full shadow-sm flex-shrink-0"></div>
        <span className="font-medium text-gray-700 truncate">Vacant Properties</span>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-3 h-3 sm:w-5 sm:h-5 bg-yellow-500 rounded-full shadow-sm flex-shrink-0"></div>
        <span className="font-medium text-gray-700 truncate">Under Construction</span>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-3 h-3 sm:w-5 sm:h-5 bg-orange-500 rounded-full shadow-sm flex-shrink-0"></div>
        <span className="font-medium text-gray-700 truncate">Maintenance</span>
      </div>
    </div>
    <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200">
      <p className="text-xs text-gray-600 leading-relaxed">
        💡 Click on any marker to view detailed property information
      </p>
    </div>
  </div>
);

// React Leaflet Map Component
const ReactLeafletMap: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyLocation | null>(null);

  const handleViewProperty = (property: PropertyLocation) => {
    console.log('View property:', property);
    setSelectedProperty(null);
  };

  const handleEditProperty = (property: PropertyLocation) => {
    console.log('Edit property:', property);
    setSelectedProperty(null);
  };

  const handlePropertyClick = (property: PropertyLocation) => {
    setSelectedProperty(property);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Floating Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Property Map</h1>
                <p className="text-blue-100 text-sm">
                  Interactive map of all properties across South Africa
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-white text-sm">
                  <span className="font-bold text-lg">{mockProperties.length}</span>
                  <span className="ml-1">Properties</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Map Container */}
      <div className="absolute inset-0 pt-20">
        <MapContainer
          center={[-28.5, 25.0] as [number, number]} // Center on South Africa
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Add markers for each property */}
          {mockProperties.map((property) => (
            <CustomMarker
              key={property.id}
              property={property}
              onPropertyClick={handlePropertyClick}
            />
          ))}
        </MapContainer>
        
        <MapLegend />
      </div>

      {/* Property Popup */}
      {selectedProperty && (
        <PropertyPopup
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onView={handleViewProperty}
          onEdit={handleEditProperty}
        />
      )}
    </div>
  );
};

// Main PropertyMap component - using React Leaflet
const PropertyMap: React.FC = () => {
  return <ReactLeafletMap />;
};

export default PropertyMap;