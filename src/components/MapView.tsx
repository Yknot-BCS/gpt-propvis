'use client';
import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { properties } from '../lib/mockData';
import type { Property } from '../lib/mockData';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface MapViewProps {
  selectedProperty: Property | null;
  onPropertySelect: (property: Property | null) => void;
}

export function MapView({ selectedProperty, onPropertySelect }: MapViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Office' | 'Industrial' | 'Retail'>('all');
  const [locationFilter, setLocationFilter] = useState<'all' | 'Gauteng' | 'KwaZulu-Natal' | 'Western Cape'>('all');
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Filter properties by both type and location
  const filteredProperties = properties
    .filter(p => p.status === 'Active')
    .filter(p => activeFilter === 'all' || p.type === activeFilter)
    .filter(p => locationFilter === 'all' || p.location.region === locationFilter);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Calculate center from active properties
    const activeProps = properties.filter(p => p.status === 'Active');
    const center: [number, number] = activeProps.length > 0
      ? [
          activeProps.reduce((sum, p) => sum + p.location.lat, 0) / activeProps.length,
          activeProps.reduce((sum, p) => sum + p.location.lng, 0) / activeProps.length,
        ]
      : [-26.2041, 28.0473]; // Johannesburg default

    // Initialize the map on the div with a given center and zoom
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: 13,
      maxZoom: 19,
      minZoom: 3,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);



  // Create custom marker icons for different property types
  const createMarkerIcon = (type: string, isSelected: boolean = false) => {
    const colors = {
      'Office': '#3b82f6',
      'Industrial': '#f97316',
      'Retail': '#22c55e'
    };
    const color = colors[type as keyof typeof colors] || '#3b82f6';
    const size = isSelected ? 32 : 24;
    const borderWidth = isSelected ? 3 : 2;
    
    return L.divIcon({
      html: `<div style="
        background-color: ${color}; 
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 50%; 
        border: ${borderWidth}px solid white; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        ${isSelected ? 'animation: pulse 2s infinite;' : ''}
      "></div>`,
      className: 'custom-marker-icon',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  };

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
    <div className="h-full space-y-6">
      {/* Stats Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Viewing</p>
              <p className="text-3xl font-semibold">{filteredProperties.length}</p>
              <p className="text-sm text-muted-foreground">Properties</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Value</p>
              <p className="text-3xl font-semibold">
                {formatCurrency(
                  filteredProperties.reduce((sum, p) => sum + p.metrics.value, 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Size</p>
              <p className="text-3xl font-semibold">
                {filteredProperties.length > 0
                  ? Math.round(filteredProperties.reduce((sum, p) => sum + p.metrics.size, 0) / filteredProperties.length).toLocaleString()
                  : 0}
              </p>
              <p className="text-sm text-muted-foreground">m² GLA</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card className="flex-1">
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <CardTitle>Property Portfolio Map</CardTitle>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Property Type Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Type:</span>
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

                {/* Location Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Location:</span>
                  <div className="flex gap-2">
                    <Button
                      variant={locationFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLocationFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={locationFilter === 'Gauteng' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLocationFilter('Gauteng')}
                    >
                      Gauteng
                    </Button>
                    <Button
                      variant={locationFilter === 'KwaZulu-Natal' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLocationFilter('KwaZulu-Natal')}
                    >
                      KZN
                    </Button>
                    <Button
                      variant={locationFilter === 'Western Cape' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLocationFilter('Western Cape')}
                    >
                      Western Cape
                    </Button>
                  </div>
                </div>
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
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
