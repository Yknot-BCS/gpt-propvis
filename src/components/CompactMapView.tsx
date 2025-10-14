import { useEffect, useRef } from 'react';
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

interface CompactMapViewProps {
  onPropertySelect?: (property: Property) => void;
  height?: number;
}

export function CompactMapView({ onPropertySelect, height = 400 }: CompactMapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const activeProperties = properties.filter(p => p.status === 'Active');

  // Create custom marker icons for different property types
  const createMarkerIcon = (type: string) => {
    const color = type === 'Office' ? '#3b82f6' : type === 'Industrial' ? '#f97316' : '#22c55e';
    const size = 24;
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="position: relative;">
          <div style="
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          "></div>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      try {
        // Create map centered on South Africa
        const map = L.map(mapContainerRef.current, {
          center: [-28.5, 24.5],
          zoom: 5,
          zoomControl: true,
          scrollWheelZoom: false,
          dragging: true,
          minZoom: 5,
          maxZoom: 12,
          preferCanvas: false,
        });

        // Add OpenStreetMap tile layer
        const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19,
          minZoom: 1,
          crossOrigin: true,
        });

        tileLayer.addTo(map);
        mapRef.current = map;

        // Force map to recalculate its size
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
        
        setTimeout(() => {
          map.invalidateSize();
        }, 300);

        // Add animation keyframes for markers
        const style = document.createElement('style');
        style.textContent = `
          .compact-map-marker {
            transition: transform 0.2s;
          }
          .compact-map-marker:hover {
            transform: scale(1.2);
            z-index: 1000 !important;
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        console.error('Error initializing compact map:', error);
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

  // Add markers for all active properties
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (activeProperties.length === 0) return;

    // Add markers for properties
    const bounds = L.latLngBounds([]);
    
    activeProperties.forEach((property) => {
      const icon = createMarkerIcon(property.type);
      const latLng = L.latLng(property.location.lat, property.location.lng);

      const marker = L.marker(latLng, {
        icon,
      });

      // Add click handler
      marker.on('click', () => {
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });

      // Add simple tooltip on hover
      marker.bindTooltip(property.name, {
        direction: 'top',
        offset: [0, -12],
      });

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
      
      bounds.extend(latLng);
    });

    // Fit map to show all markers
    if (activeProperties.length > 0) {
      mapRef.current.fitBounds(bounds, {
        padding: [30, 30],
        maxZoom: 6,
      });
    }
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
