'use client';
import React, { useState } from 'react';
import { MapPin, X, Eye, Edit } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Properties } from '@/lib/mockData';

// Types and Interfaces
export interface PropertyLocation {
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
      <Popup maxWidth={500} minWidth={450}>
        <div style={{ 
          padding: '20px', 
          maxWidth: '500px', 
          minWidth: '450px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '16px',
          border: '2px solid #e2e8f0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '3px solid #e2e8f0'
          }}>
            <div>
              <div style={{ 
                fontWeight: '700', 
                color: '#1e293b', 
                fontSize: '20px',
                marginBottom: '6px',
                lineHeight: '1.2'
              }}>
                {property.name}
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                {property.address}
              </div>
            </div>
            <div style={{
              padding: '8px 16px',
              borderRadius: '25px',
              fontSize: '13px',
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
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center', padding: '14px', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{property.value}</div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Property Value</div>
            </div>
            <div style={{ textAlign: 'center', padding: '14px', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: property.occupancy >= 80 ? '#059669' : property.occupancy >= 50 ? '#d97706' : '#dc2626',
                marginBottom: '4px'
              }}>
                {property.occupancy}%
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Occupancy Rate</div>
            </div>
          </div>

          {/* Detailed Info */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '12px',
            marginBottom: '20px',
            padding: '16px',
            background: 'white',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '12px', color: '#64748b', padding: '6px 0' }}>
              <strong style={{ color: '#374151', fontSize: '13px' }}>Property Type:</strong><br/>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{property.type}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', padding: '6px 0' }}>
              <strong style={{ color: '#374151', fontSize: '13px' }}>Active Tenants:</strong><br/>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{property.tenants}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', padding: '6px 0' }}>
              <strong style={{ color: '#374151', fontSize: '13px' }}>Year Built:</strong><br/>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{property.yearBuilt}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', padding: '6px 0' }}>
              <strong style={{ color: '#374151', fontSize: '13px' }}>Total Size:</strong><br/>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{property.size}</span>
            </div>
          </div>

          {/* Revenue */}
          <div style={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '16px',
            boxShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{ fontSize: '12px', opacity: '0.9', marginBottom: '4px', fontWeight: '600' }}>Monthly Revenue</div>
            <div style={{ fontSize: '20px', fontWeight: '700' }}>{property.monthlyRevenue}</div>
          </div>

          {/* Description */}
          {property.description && (
            <div style={{ 
              fontSize: '12px', 
              color: '#64748b', 
              fontStyle: 'italic',
              padding: '12px',
              background: 'white',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              marginBottom: '16px',
              lineHeight: '1.5',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              &ldquo;{property.description}&rdquo;
            </div>
          )}

          {/* Click hint */}
          <div style={{ 
            textAlign: 'center', 
            fontSize: '12px', 
            color: '#94a3b8', 
            marginTop: '12px',
            padding: '8px',
            background: '#f8fafc',
            borderRadius: '8px',
            fontWeight: '500'
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
                  <span className="font-bold text-lg">{Properties.length}</span>
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
          {Properties.map((property) => (
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