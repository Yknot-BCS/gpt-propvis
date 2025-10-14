import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { properties } from '../lib/mockData';
import type { Property } from '../lib/mockData';

// Fix for default markers in Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, MapPin, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface MapViewProps {
  selectedProperty: Property | null;
  onPropertySelect: (property: Property | null) => void;
}

export function MapView({ selectedProperty, onPropertySelect }: MapViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Office' | 'Industrial' | 'Retail'>('all');
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const filteredProperties = activeFilter === 'all' 
    ? properties.filter(p => p.status === 'Active')
    : properties.filter(p => p.type === activeFilter && p.status === 'Active');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Create custom marker icons for different property types
  const createMarkerIcon = (type: string, isSelected: boolean) => {
    const color = type === 'Office' ? '#3b82f6' : type === 'Industrial' ? '#f97316' : '#22c55e';
    const size = isSelected ? 40 : 32;
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="position: relative;">
          <div style="
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            ${isSelected ? 'box-shadow: 0 0 0 4px rgba(3, 2, 19, 0.3);' : ''}
            transition: all 0.2s;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"/>
              <path d="M3 9h18"/>
              <path d="M9 21V9"/>
            </svg>
          </div>
          ${isSelected ? `
            <div style="
              position: absolute;
              top: -4px;
              right: -4px;
              width: 16px;
              height: 16px;
              background-color: #030213;
              border-radius: 50%;
              animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
          ` : ''}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Small delay to ensure container is rendered
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      try {
        // Create map centered on South Africa
        const map = L.map(mapContainerRef.current, {
          center: [-28.5, 24.5],
          zoom: 5,
          zoomControl: true,
          scrollWheelZoom: true,
          minZoom: 5,
          maxZoom: 18,
          preferCanvas: false,
        });

        // Add OpenStreetMap tile layer with better options
        const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
          minZoom: 1,
          crossOrigin: true,
        });

        tileLayer.addTo(map);

        // Debug tile loading
        tileLayer.on('tileerror', (error) => {
          console.error('Tile loading error:', error);
        });

        tileLayer.on('tileload', () => {
          console.log('Tile loaded successfully');
        });

        mapRef.current = map;

        // Force map to recalculate its size multiple times
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
        
        setTimeout(() => {
          map.invalidateSize();
        }, 300);

        // Add animation keyframes for ping effect
        const style = document.createElement('style');
        style.textContent = `
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          .leaflet-container {
            background: #e5e7eb;
            font-family: inherit;
          }
          .leaflet-popup-content-wrapper {
            border-radius: 0.5rem;
          }
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when properties or selection changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // If no properties, return early
    if (filteredProperties.length === 0) return;

    // Add markers for filtered properties
    const bounds = L.latLngBounds([]);
    
    filteredProperties.forEach((property) => {
      const isSelected = selectedProperty?.id === property.id;
      const icon = createMarkerIcon(property.type, isSelected);
      const latLng = L.latLng(property.location.lat, property.location.lng);

      const marker = L.marker(latLng, {
        icon,
        zIndexOffset: isSelected ? 1000 : 0,
      });

      // Add popup with property info
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${property.name}</h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
            ${property.location.node}, ${property.location.region}
          </p>
          <p style="margin: 0 0 4px 0; font-size: 12px;">
            <strong>Type:</strong> ${property.type}
          </p>
          <p style="margin: 0 0 4px 0; font-size: 12px;">
            <strong>GLA:</strong> ${property.metrics.size.toLocaleString()} m²
          </p>
          <p style="margin: 0; font-size: 12px;">
            <strong>Value:</strong> ${formatCurrency(property.metrics.value)}
          </p>
        </div>
      `);

      // Handle marker click
      marker.on('click', () => {
        onPropertySelect(property);
      });

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
      
      // Extend bounds to include this marker
      bounds.extend(latLng);
    });

    // Fit the map to show all markers with some padding
    if (filteredProperties.length > 0 && !selectedProperty) {
      mapRef.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 12,
      });
    }
  }, [filteredProperties, selectedProperty, onPropertySelect]);

  // Handle selected property zoom
  useEffect(() => {
    if (!mapRef.current || !selectedProperty) return;

    const marker = markersRef.current.find(m => {
      const latLng = m.getLatLng();
      return latLng.lat === selectedProperty.location.lat && latLng.lng === selectedProperty.location.lng;
    });

    if (marker) {
      mapRef.current.setView(marker.getLatLng(), 12, {
        animate: true,
        duration: 1,
      });
      marker.openPopup();
    }
  }, [selectedProperty]);

  return (
    <div className="h-full">
      {/* Map Container - Full Width */}
      <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Property Portfolio Map</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={activeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={activeFilter === 'Office' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter('Office')}
                >
                  Office
                </Button>
                <Button
                  variant={activeFilter === 'Industrial' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter('Industrial')}
                >
                  Industrial
                </Button>
                <Button
                  variant={activeFilter === 'Retail' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter('Retail')}
                >
                  Retail
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Leaflet Map Container */}
            <div className="relative w-full h-[600px] bg-muted rounded-lg overflow-hidden">
              <div ref={mapContainerRef} className="absolute inset-0" />

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg z-[1000]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <span className="text-sm">Office</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="text-sm">Industrial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-sm">Retail</span>
                  </div>
                </div>
              </div>

              {/* Stats Overlay */}
              <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg z-[1000]">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Viewing</p>
                  <p className="text-2xl">{filteredProperties.length} Properties</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(
                      filteredProperties.reduce((sum, p) => sum + p.metrics.value, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
