#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

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

interface Property {
  id: string;
  property_code: string;
  name: string;
  type: 'Office' | 'Industrial' | 'Retail';
  status: 'Active' | 'Under Development' | 'Disposed';
  location: {
    lat: number;
    lng: number;
    address: string;
    node: string;
    region: string;
  };
  metrics: {
    value: number;
    size: number;
    occupancyRate: number;
    annualRevenue: number;
    roi: number;
    yieldRate: number;
  };
  financial: {
    acquisitionDate?: string;
    acquisitionPrice?: number;
    currentValue: number;
    disposalDate?: string;
    disposalPrice?: number;
    profitLoss?: number;
  };
  tenant?: {
    name: string;
    leaseExpiry: string;
  };
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
  return randomDate.toISOString().split('T')[0];
}

function generateLeaseExpiry(): string {
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + (365 * 24 * 60 * 60 * 1000) * (2 + Math.random() * 8)); // 2-10 years
  return endDate.toISOString().split('T')[0];
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
      type: item.type as 'Office' | 'Industrial' | 'Retail',
      status: item.status as 'Active' | 'Under Development' | 'Disposed',
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

// Function to format property object as TypeScript code
function formatPropertyAsCode(property: Property): string {
  return `  {
    id: "${property.id}",
    property_code: "${property.property_code}",
    name: "${property.name}",
    type: "${property.type}",
    status: "${property.status}",
    location: {
      lat: ${property.location.lat},
      lng: ${property.location.lng},
      address: "${property.location.address}",
      node: "${property.location.node}",
      region: "${property.location.region}"
    },
    metrics: {
      value: ${property.metrics.value},
      size: ${property.metrics.size},
      occupancyRate: ${property.metrics.occupancyRate},
      annualRevenue: ${property.metrics.annualRevenue},
      roi: ${property.metrics.roi},
      yieldRate: ${property.metrics.yieldRate}
    },
    financial: {
      currentValue: ${property.financial.currentValue},
      acquisitionDate: "${property.financial.acquisitionDate}",
      acquisitionPrice: ${property.financial.acquisitionPrice}
    },
    tenant: {
      name: "${property.tenant?.name || "n/a"}",
      leaseExpiry: "${property.tenant?.leaseExpiry || "n/a"}"
    }
  }`;
}

// Main function
async function main() {
  try {
    console.log('Loading JSON data...');
    
    // Read the JSON file
    const jsonPath = join(process.cwd(), 'src/app/geocode/property_data.json');
    const jsonData: JsonPropertyData[] = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    
    console.log(`Found ${jsonData.length} properties in JSON data`);
    
    // Transform the data
    const properties = transformJsonToProperty(jsonData);
    
    console.log(`Transformed ${properties.length} properties`);
    
    // Read the current data.ts file
    const dataPath = join(process.cwd(), 'src/lib/data.ts');
    const dataContent = readFileSync(dataPath, 'utf-8');
    
    // Find the properties array section
    const propertiesStart = dataContent.indexOf('export const properties: Property[] = [');
    const propertiesEnd = dataContent.indexOf('];', propertiesStart);
    
    if (propertiesStart === -1 || propertiesEnd === -1) {
      throw new Error('Could not find properties array in data.ts');
    }
    
    // Generate the new properties array
    const propertiesCode = properties.map(property => 
      formatPropertyAsCode(property)
    ).join(',\n');
    
    // Replace the properties array
    const newDataContent = 
      dataContent.substring(0, propertiesStart) +
      'export const properties: Property[] = [\n' +
      propertiesCode +
      '\n];' +
      dataContent.substring(propertiesEnd + 2);
    
    // Write the updated file
    writeFileSync(dataPath, newDataContent, 'utf-8');
    
    console.log('Successfully updated data.ts with transformed properties!');
    console.log(`Total properties: ${properties.length}`);
    
    // Show some statistics
    const officeCount = properties.filter(p => p.type === 'Office').length;
    const industrialCount = properties.filter(p => p.type === 'Industrial').length;
    const retailCount = properties.filter(p => p.type === 'Retail').length;
    
    console.log(`Property types: Office: ${officeCount}, Industrial: ${industrialCount}, Retail: ${retailCount}`);
    
    const totalValue = properties.reduce((sum, p) => sum + p.metrics.value, 0);
    console.log(`Total portfolio value: R${(totalValue / 1000000).toFixed(0)}M`);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();
