'use client';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { properties } from '../lib/data';
import type { Property } from '../lib/data';
import L from 'leaflet';
import 'leaflet.markercluster';

interface CompactMapViewProps {
  onPropertySelect?: (property: Property) => void;
  height?: number;
}

export function CompactMapView({ onPropertySelect, height = 400 }: CompactMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

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

  // Create markers with click handlers
  const createMarkers = () => {
    return activeProperties.map((property) => {
      const marker = L.marker(
        [property.location.lat, property.location.lng],
        { icon: createMarkerIcon(property.type) }
      );

      // Add click handler
      marker.on('click', () => {
        onPropertySelect?.(property);
      });

      return marker;
    });
  };

  // Initialize map and markers
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Calculate center from active properties
    const center: [number, number] = activeProperties.length > 0
      ? [
          activeProperties.reduce((sum, p) => sum + p.location.lat, 0) / activeProperties.length,
          activeProperties.reduce((sum, p) => sum + p.location.lng, 0) / activeProperties.length,
        ]
      : [-26.2041, 28.0473];

    // Initialize the map
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: 10,
      maxZoom: 19,
      minZoom: 3,
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create cluster group with minimum cluster size of 10
    const clusterGroup = L.markerClusterGroup({
      // Use a very small radius to effectively require 10+ markers to cluster
      maxClusterRadius: 20,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 15,
      chunkedLoading: true,
    } as L.MarkerClusterGroupOptions);

    // Add markers to cluster group
    const markers = createMarkers();
    markers.forEach(marker => clusterGroup.addLayer(marker));

    // Add cluster group to map
    map.addLayer(clusterGroup);

    // Fit bounds to show all markers
    if (activeProperties.length > 0) {
      const bounds = L.latLngBounds(
        activeProperties.map(p => [p.location.lat, p.location.lng])
      );
      map.fitBounds(bounds, { 
        padding: [20, 20],
        maxZoom: 12
      });
    }

    mapRef.current = map;
    clusterGroupRef.current = clusterGroup;

    // Cleanup on unmount
    return () => {
      map.remove();
      mapRef.current = null;
      clusterGroupRef.current = null;
    };
  }, [onPropertySelect]); // Only recreate if onPropertySelect changes

  return (
    <div className="space-y-2">
      {/* Property Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{activeProperties.length}</span> active properties
        </p>
      </div>

      {/* Map Container */}
      <div className="relative w-full rounded-lg overflow-hidden border" style={{ height: `${height}px` }}>
        <div ref={mapContainerRef} className="absolute inset-0" />
        
        {/* Compact Legend */}
        <div className="absolute bottom-2 right-2 bg-background/95 backdrop-blur-sm px-3 py-2 rounded-md shadow-md z-[10] text-xs">
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
      </div>
    </div>
  );
}
