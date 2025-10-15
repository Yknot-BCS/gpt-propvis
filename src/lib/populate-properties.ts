import type { Property, PropertyType, PropertyStatus } from './data';

// Interface for the JSON data structure
interface JsonPropertyData {
  id: string;
  name: string;
  type: string;
  status: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    node: null | string;
    region: string;
  };
  property_details: {
    sector: string;
    city: string;
    description: string;
    parking_ratio: null | number;
  };
  leasing_consultant: {
    name: string;
    phone: string;
    email: string;
  };
  property_code: string;
}

// Function to transform JSON data to Property interface
function transformJsonToProperty(jsonData: JsonPropertyData[]): Property[] {
  return jsonData.map((item) => {
    // Generate realistic mock financial data based on property type and location
    const baseValue = generateBaseValue(item.type, item.location.region);
    const size = generateSize(item.type);
    const occupancyRate = generateOccupancyRate();
    const annualRevenue = generateAnnualRevenue(baseValue, occupancyRate);
    const roi = generateROI();
    const yieldRate = generateYieldRate(annualRevenue, baseValue);

    return {
      id: item.id,
      property_code: item.property_code,
      name: item.name,
      type: item.type as PropertyType,
      status: item.status as PropertyStatus,
      location: {
        lat: item.location.lat,
        lng: item.location.lng,
        address: item.location.address,
        node: item.location.node || "n/a",
        region: item.location.region
      },
      metrics: {
        value: baseValue,
        size: size,
        occupancyRate: occupancyRate,
        annualRevenue: annualRevenue,
        roi: roi,
        yieldRate: yieldRate
      },
      financial: {
        currentValue: baseValue,
        acquisitionDate: generateAcquisitionDate(),
        acquisitionPrice: Math.round(baseValue * 0.8), // Assume 20% appreciation
        disposalDate: undefined,
        disposalPrice: undefined,
        profitLoss: undefined
      },
      tenant: {
        name: item.leasing_consultant.name || "n/a",
        leaseExpiry: generateLeaseExpiry()
      }
    };
  });
}

// Helper functions to generate realistic mock data
function generateBaseValue(type: string, region: string): number {
  const baseMultipliers = {
    'Office': 1.0,
    'Industrial': 0.6,
    'Retail': 1.2
  };
  
  const regionMultipliers = {
    'Gauteng': 1.0,
    'Western Cape': 0.9,
    'KwaZulu-Natal': 0.7,
    'Eastern Cape': 0.5,
    'Free State': 0.4,
    'Limpopo': 0.3,
    'Mpumalanga': 0.4,
    'Northern Cape': 0.3,
    'North West': 0.4
  };

  const baseValue = 50000000; // R50M base
  const typeMultiplier = baseMultipliers[type as keyof typeof baseMultipliers] || 1.0;
  const regionMultiplier = regionMultipliers[region as keyof typeof regionMultipliers] || 0.5;
  
  return Math.round(baseValue * typeMultiplier * regionMultiplier * (0.8 + Math.random() * 0.4));
}

function generateSize(type: string): number {
  const sizeRanges = {
    'Office': { min: 2000, max: 25000 },
    'Industrial': { min: 5000, max: 50000 },
    'Retail': { min: 1000, max: 15000 }
  };
  
  const range = sizeRanges[type as keyof typeof sizeRanges] || { min: 2000, max: 10000 };
  return Math.round(range.min + Math.random() * (range.max - range.min));
}

function generateOccupancyRate(): number {
  return Math.round(75 + Math.random() * 25); // 75-100%
}

function generateAnnualRevenue(baseValue: number, occupancyRate: number): number {
  const yieldRate = 0.08 + Math.random() * 0.04; // 8-12% yield
  return Math.round(baseValue * yieldRate * (occupancyRate / 100));
}

function generateROI(): number {
  return Math.round((8 + Math.random() * 8) * 100) / 100; // 8-16%
}

function generateYieldRate(annualRevenue: number, baseValue: number): number {
  return Math.round((annualRevenue / baseValue) * 10000) / 100; // Convert to percentage with 2 decimals
}

function generateAcquisitionDate(): string {
  const startDate = new Date(2015, 0, 1);
  const endDate = new Date(2022, 11, 31);
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return randomDate.toISOString().split('T')[0] || '2020-01-01';
}

function generateLeaseExpiry(): string {
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + (365 * 24 * 60 * 60 * 1000) * (2 + Math.random() * 8)); // 2-10 years
  return endDate.toISOString().split('T')[0] || '2025-12-31';
}

// Function to load JSON data from the file
async function loadJsonData(): Promise<JsonPropertyData[]> {
  try {
    const response = await fetch('/geocode/property_data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading JSON data:', error);
    return [];
  }
}

// Main function to populate properties
export async function populatePropertiesFromJson(): Promise<Property[]> {
  const jsonData = await loadJsonData();
  return transformJsonToProperty(jsonData);
}

// Export the transformation function for direct use
export { transformJsonToProperty };

// Example usage:
/*
import { populatePropertiesFromJson } from './populate-properties';

// In your component or data loading logic:
const properties = await populatePropertiesFromJson();
console.log('Total properties:', properties.length);
console.log('Sample property:', properties[0]);
*/