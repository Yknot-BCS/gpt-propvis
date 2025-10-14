'use client';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { properties } from '../lib/mockData';
import type { Property } from '../lib/mockData';
import L from 'leaflet';


interface CompactMapViewProps {
  onPropertySelect?: (property: Property) => void;
  height?: number;
}

export function CompactMapView({ onPropertySelect, height = 400 }: CompactMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const activeProperties = properties.filter(p => p.status === 'Active');

  // Create custom marker icons for different property types
  const createMarkerIcon = (type: string) => {
    const color = type === 'Office' ? '#3b82f6' : type === 'Industrial' ? '#f97316' : '#22c55e';
    const size = 24;
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: 'custom-marker-icon',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Calculate center from active properties
    const center: [number, number] = activeProperties.length > 0
      ? [
          activeProperties.reduce((sum, p) => sum + p.location.lat, 0) / activeProperties.length,
          activeProperties.reduce((sum, p) => sum + p.location.lng, 0) / activeProperties.length,
        ]
      : [-26.2041, 28.0473];

    // Initialize the map on the div with a given center and zoom
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: 18,
      maxZoom: 19,
      minZoom: 3,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers for each property
    activeProperties.forEach((property) => {
      const marker = L.marker(
        [property.location.lat, property.location.lng],
        { icon: createMarkerIcon(property.type) }
      ).addTo(map);

      // Add popup with property details
      marker.bindPopup(`
        <div style="font-family: system-ui; min-width: 150px;">
          <strong style="font-size: 14px;">${property.name}</strong>
          <p style="margin: 4px 0; color: #666; font-size: 12px;">${property.location.address}</p>
          <p style="margin: 4px 0; font-size: 12px;">
            <span style="color: #666;">Type:</span> ${property.type}
          </p>
        </div>
      `);

      // Add click handler
      if (onPropertySelect) {
        marker.on('click', () => {
          onPropertySelect(property);
        });
      }
    });

    // Fit bounds to show all markers with maximum zoom
    if (activeProperties.length > 0) {
      const bounds = L.latLngBounds(
        activeProperties.map(p => [p.location.lat, p.location.lng])
      );
      map.fitBounds(bounds, { 
        padding: [20, 20],
        maxZoom: 19 // Zoom in close to see building details
      });
    }

    mapRef.current = map;

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeProperties, onPropertySelect]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border" style={{ height: `${height}px` }}>
      <div ref={mapContainerRef} className="absolute inset-0" />
      
      {/* Compact Legend */}
      <div className="absolute bottom-2 right-2 bg-background/95 backdrop-blur-sm px-3 py-2 rounded-md shadow-md z-[1000] text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Office</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>Industrial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span>Retail</span>
          </div>
        </div>
      </div>

      {/* Property Count Badge */}
      <div className="absolute top-2 left-2 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-md z-[1000]">
        <p className="text-xs">
          <span className="text-muted-foreground">{activeProperties.length} Properties</span>
        </p>
      </div>
    </div>
  );
}
