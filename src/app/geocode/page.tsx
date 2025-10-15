"use client"
import React, { useState } from 'react';
import { MapPin, Download, AlertCircle, CheckCircle, Loader, Key } from 'lucide-react';
import type { Property } from '@/lib/data';



const AddressGeocoder = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState({ success: 0, failed: 0 });
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [geocodingMethod, setGeocodingMethod] = useState('google');

  const geocodeWithGoogle = async (address: string, region: string) => {
    const fullAddress = `${address}, ${region}, South Africa`;
    const encodedAddress = encodeURIComponent(fullAddress);
    
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.results && data.results.length > 0) {
        return {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
          success: true,
          formatted: data.results[0].formatted_address
        };
      }
      
      return { lat: null, lng: null, success: false };
    } catch (error) {
      console.error('Geocoding error:', error);
      return { lat: null, lng: null, success: false };
    }
  };

  const geocodeWithPositionstack = async (address: string, region: string) => {
    const fullAddress = `${address}, ${region}, South Africa`;
    const encodedAddress = encodeURIComponent(fullAddress);
    
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodedAddress}&limit=1`
      );
      
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return {
          lat: data.data[0].latitude,
          lng: data.data[0].longitude,
          success: true
        };
      }
      
      return { lat: null, lng: null, success: false };
    } catch (error) {
      console.error('Geocoding error:', error);
      return { lat: null, lng: null, success: false };
    }
  };

  const geocodeWithMapbox = async (address: string, region: string) => {
    const fullAddress = `${address}, ${region}, South Africa`;
    const encodedAddress = encodeURIComponent(fullAddress);
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${apiKey}&country=ZA&limit=1`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        return {
          lat: data.features[0].center[1],
          lng: data.features[0].center[0],
          success: true
        };
      }
      
      return { lat: null, lng: null, success: false };
    } catch (error) {
      console.error('Geocoding error:', error);
      return { lat: null, lng: null, success: false };
    }
  };

  const processProperties = async () => {
    if (!apiKey.trim()) {
      alert('Please enter an API key');
      return;
    }

    try {
      const parsedData: Property[] = JSON.parse(inputText);
      setProperties(parsedData);
      setLoading(true);
      setProgress({ current: 0, total: parsedData.length });
      setResults({ success: 0, failed: 0 });

      const updatedProperties: Property[] = [];
      let successCount = 0;
      let failedCount = 0;

      for (let i = 0; i < parsedData.length; i++) {
        const property = parsedData[i];
        if (!property) continue;
        
        setProgress({ current: i + 1, total: parsedData.length });

        let result;
        if (geocodingMethod === 'google') {
          result = await geocodeWithGoogle(
            property.location.address,
            property.location.region
          );
        } else if (geocodingMethod === 'positionstack') {
          result = await geocodeWithPositionstack(
            property.location.address,
            property.location.region
          );
        } else {
          result = await geocodeWithMapbox(
            property.location.address,
            property.location.region
          );
        }

        const updatedProperty: Property = {
          ...property,
          location: {
            ...property.location,
            lat: result.lat,
            lng: result.lng
          }
        };

        if (result.success) {
          successCount++;
        } else {
          failedCount++;
        }

        updatedProperties.push(updatedProperty);
        setResults({ success: successCount, failed: failedCount });

        // Rate limiting: wait 200ms between requests
        if (i < parsedData.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      setProperties(updatedProperties);
      setLoading(false);
    } catch (error) {
      alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(properties, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'geocoded_properties.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const csvRows = [
      ['ID', 'Name', 'Address', 'Region', 'Latitude', 'Longitude']
    ];

    properties.forEach(prop => {
      csvRows.push([
        prop.id,
        prop.name,
        prop.location.address,
        prop.location.region,
        String(prop.location.lat || 'N/A'),
        String(prop.location.lng || 'N/A')
      ]);
    });

    const csvContent = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'geocoded_properties.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">SA Address Geocoder</h1>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-2 items-start">
              <Key className="text-blue-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-2">Choose your geocoding service:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="google"
                      checked={geocodingMethod === 'google'}
                      onChange={(e) => setGeocodingMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span><strong>Google Maps</strong> (Most accurate) - Get free key at <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">console.cloud.google.com</a></span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="mapbox"
                      checked={geocodingMethod === 'mapbox'}
                      onChange={(e) => setGeocodingMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span><strong>Mapbox</strong> - Get free key at <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">mapbox.com</a></span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="positionstack"
                      checked={geocodingMethod === 'positionstack'}
                      onChange={(e) => setGeocodingMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span><strong>Positionstack</strong> - Get free key at <a href="https://positionstack.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">positionstack.com</a></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key:
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your API key"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Paste your JSON array here:
              </label>
              <button
                onClick={() => setInputText(`[
  {
    "id": "P100",
    "property_code": "1805",
    "name": "Alberton City",
    "type": "Retail",
    "status": "Active",
    "location": {
      "lat": -26.0532549,
      "lng": 28.0887471,
      "address": "VOORTREKKER & DU PLESSIS ROAD NEW REDRUTH",
      "node": "n/a",
      "region": "Gauteng"
    },
    "metrics": {
      "value": 42115988,
      "size": 35379.98,
      "occupancyRate": 91,
      "annualRevenue": 3599044,
      "roi": 10.37,
      "yieldRate": 8.55
    },
    "financial": {
      "currentValue": 42115988,
      "acquisitionDate": "2018-08-25",
      "acquisitionPrice": 33692790
    },
    "tenant": {
      "name": "Heather Rush",
      "leaseExpiry": "2031-04-09"
    }
  }
]`)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
                disabled={loading}
              >
                Load Sample Data
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder='[{"id": "P001", "name": "...", ...}]'
              disabled={loading}
            />
          </div>

          <button
            onClick={processProperties}
            disabled={loading || !inputText.trim() || !apiKey.trim()}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-6"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin" size={20} />
                Processing... {progress.current}/{progress.total}
              </span>
            ) : (
              'Start Geocoding'
            )}
          </button>

          {loading && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {progress.current} / {progress.total}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round((progress.current / progress.total) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
              <div className="mt-3 flex gap-4 text-sm">
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle size={16} />
                  Success: {results.success}
                </span>
                <span className="text-red-600 flex items-center gap-1">
                  <AlertCircle size={16} />
                  Failed: {results.failed}
                </span>
              </div>
            </div>
          )}

          {properties.length > 0 && !loading && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Results ({properties.length} properties)
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={downloadCSV}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={18} />
                    CSV
                  </button>
                  <button
                    onClick={downloadJSON}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download size={18} />
                    JSON
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {properties.map((prop, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded ${
                        prop.location.lat && prop.location.lng
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{prop.name}</p>
                          <p className="text-sm text-gray-600">{prop.location.address}</p>
                          <p className="text-xs text-gray-500">{prop.location.region}</p>
                        </div>
                        <div className="text-right text-sm">
                          {prop.location.lat && prop.location.lng ? (
                            <div className="text-green-700">
                              <div>Lat: {prop.location.lat.toFixed(6)}</div>
                              <div>Lng: {prop.location.lng.toFixed(6)}</div>
                            </div>
                          ) : (
                            <div className="text-red-700 font-semibold">Failed</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressGeocoder;