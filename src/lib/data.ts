// Mock data for Growthpoint property portfolio

import type { PropertyLocation } from "@/components/PropertyMap";

export enum PropertyTypes {
  OFFICE = 'Office',
  INDUSTRIAL = 'Industrial',
  RETAIL = 'Retail'
}

export type PropertyType = PropertyTypes;
export type PropertyStatus = 'Active' | 'Under Development' | 'Disposed';

export interface Property {
  id: string;
  property_code: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
    node: string;
    region: string;
  };
  metrics: {
    value: number;
    size: number; // sqm
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

export interface PortfolioMetrics {
  totalValue: number;
  totalProperties: number;
  averageOccupancy: number;
  totalRevenue: number;
  averageROI: number;
  totalSize: number;
}

export interface Transaction {
  id: string;
  type: 'Acquisition' | 'Disposal';
  propertyName: string;
  date: string;
  value: number;
  profitLoss?: number;
}

export interface Tenant {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  properties: {
    propertyId: string;
    propertyName: string;
    propertyType: PropertyType;
    totalArea: number; // sqm
    leaseStart: string;
    leaseExpiry: string;
    monthlyRental: number;
  }[];
  totalArea: number; // Total sqm across all properties
  totalMonthlyRental: number;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  creditRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  paymentHistory: 'On Time' | 'Occasional Delays' | 'Frequent Delays';
}

// Actual properties data from Growthpoint portfolio
export const properties: Property[] = [
  {
    id: "P001",
    property_code: "2928",
    name: "ANSLOW PHASE 2",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0580934,
      lng: 28.0215693,
      address: "8 ANSLOW CRESCENT BRYANSTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 59715880,
      size: 8445,
      occupancyRate: 77,
      annualRevenue: 5264259,
      roi: 10.75,
      yieldRate: 8.82
    },
    financial: {
      currentValue: 59715880,
      acquisitionDate: "2019-01-18",
      acquisitionPrice: 47772704
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2033-03-20"
    }
  },
  {
    id: "P002",
    property_code: "2203",
    name: "ARTERIAL INDUSTRIAL ESTATE",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -33.9576564,
      lng: 18.6882357,
      address: "61 RANGE ROAD BLACKHEATH",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 25553204,
      size: 29290,
      occupancyRate: 83,
      annualRevenue: 1798211,
      roi: 12.84,
      yieldRate: 7.04
    },
    financial: {
      currentValue: 25553204,
      acquisitionDate: "2016-08-23",
      acquisitionPrice: 20442563
    },
    tenant: {
      name: "Sedica Knight",
      leaseExpiry: "2033-08-13"
    }
  },
  {
    id: "P003",
    property_code: "1042",
    name: "PINMILL FARM",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1018824,
      lng: 28.073859,
      address: "164 KATHERINE STREET SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 44662027,
      size: 8622,
      occupancyRate: 95,
      annualRevenue: 5009475,
      roi: 10.31,
      yieldRate: 11.22
    },
    financial: {
      currentValue: 44662027,
      acquisitionDate: "2018-04-02",
      acquisitionPrice: 35729622
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2029-01-21"
    }
  },
  {
    id: "P004",
    property_code: "2198",
    name: "TRADE PARK",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -29.7041285,
      lng: 31.0379475,
      address: "54 SIPHOSETHU ROAD MOUNT EDGECOMBE",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 21264751,
      size: 36846,
      occupancyRate: 98,
      annualRevenue: 2394516,
      roi: 15.75,
      yieldRate: 11.26
    },
    financial: {
      currentValue: 21264751,
      acquisitionDate: "2018-05-21",
      acquisitionPrice: 17011801
    },
    tenant: {
      name: "Craig Davis",
      leaseExpiry: "2033-05-06"
    }
  },
  {
    id: "P005",
    property_code: "2461",
    name: "THE PARK ON 16TH BLOCKS ABC",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.9678809,
      lng: 28.1335606,
      address: "789 - 16TH ROAD RANDJESPARK",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 48187567,
      size: 5283,
      occupancyRate: 78,
      annualRevenue: 3176802,
      roi: 10.18,
      yieldRate: 6.59
    },
    financial: {
      currentValue: 48187567,
      acquisitionDate: "2022-02-05",
      acquisitionPrice: 38550054
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2029-08-05"
    }
  },
  {
    id: "P006",
    property_code: "2462",
    name: "THE PARK ON 16TH BLOCKS DEF",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.9678809,
      lng: 28.1335606,
      address: "789 - 16TH ROAD RANDJESPARK",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 49281422,
      size: 8797,
      occupancyRate: 96,
      annualRevenue: 4570833,
      roi: 11.32,
      yieldRate: 9.27
    },
    financial: {
      currentValue: 49281422,
      acquisitionDate: "2018-04-22",
      acquisitionPrice: 39425138
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2034-03-30"
    }
  },
  {
    id: "P007",
    property_code: "7026",
    name: "THE TOWERS",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.108437,
      lng: 28.0490978,
      address: "15 ALICE LANE SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 54036224,
      size: 5108,
      occupancyRate: 96,
      annualRevenue: 4569068,
      roi: 10.54,
      yieldRate: 8.46
    },
    financial: {
      currentValue: 54036224,
      acquisitionDate: "2017-05-18",
      acquisitionPrice: 43228979
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2029-04-12"
    }
  },
  {
    id: "P008",
    property_code: "2476",
    name: "THE PLACE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.11,
      lng: 28.0489161,
      address: "1 SANDTON DRIVE SANDOWN SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 46423009,
      size: 18219,
      occupancyRate: 78,
      annualRevenue: 3540979,
      roi: 15.25,
      yieldRate: 7.63
    },
    financial: {
      currentValue: 46423009,
      acquisitionDate: "2016-04-25",
      acquisitionPrice: 37138407
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2035-01-22"
    }
  },
  {
    id: "P009",
    property_code: "2403",
    name: "AFRICAN PRODUCTS",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.1567627,
      lng: 28.1664249,
      address: "DICK KEMP STREET MEADOWDALE EDENVALE",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 29291527,
      size: 17196,
      occupancyRate: 88,
      annualRevenue: 3031075,
      roi: 14.64,
      yieldRate: 10.35
    },
    financial: {
      currentValue: 29291527,
      acquisitionDate: "2019-01-24",
      acquisitionPrice: 23433222
    },
    tenant: {
      name: "Nicky Whiting",
      leaseExpiry: "2028-12-23"
    }
  },
  {
    id: "P010",
    property_code: "2456",
    name: "CASCADE CLOSE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0123943,
      lng: 28.1130177,
      address: "1334 HOWICK CLOSE VORNA VALLEY EXT 21",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 52445982,
      size: 6424,
      occupancyRate: 80,
      annualRevenue: 3618889,
      roi: 11.79,
      yieldRate: 6.9
    },
    financial: {
      currentValue: 52445982,
      acquisitionDate: "2016-06-04",
      acquisitionPrice: 41956786
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2030-07-14"
    }
  },
  {
    id: "P011",
    property_code: "3715",
    name: "GOLF PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.9469399,
      lng: 18.4860443,
      address: "RAAPENBERG ROAD MOWBRAY",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 41755012,
      size: 3576,
      occupancyRate: 89,
      annualRevenue: 4177121,
      roi: 13.73,
      yieldRate: 10
    },
    financial: {
      currentValue: 41755012,
      acquisitionDate: "2020-01-25",
      acquisitionPrice: 33404010
    },
    tenant: {
      name: "Andrew Kendall",
      leaseExpiry: "2032-03-29"
    }
  },
  {
    id: "P012",
    property_code: "2451",
    name: "BELVEDERE OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.8661278,
      lng: 18.6407394,
      address: "BELLA ROSA STREET DURBANVILLE",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 43274615,
      size: 3791,
      occupancyRate: 81,
      annualRevenue: 3189958,
      roi: 8.69,
      yieldRate: 7.37
    },
    financial: {
      currentValue: 43274615,
      acquisitionDate: "2022-10-04",
      acquisitionPrice: 34619692
    },
    tenant: {
      name: "Dirk Bronner",
      leaseExpiry: "2028-07-22"
    }
  },
  {
    id: "P013",
    property_code: "2164",
    name: "100 WEST STREET",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1102312,
      lng: 28.0615485,
      address: "100 WEST STREET SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42084582,
      size: 6957,
      occupancyRate: 89,
      annualRevenue: 4393306,
      roi: 9.5,
      yieldRate: 10.44
    },
    financial: {
      currentValue: 42084582,
      acquisitionDate: "2019-05-28",
      acquisitionPrice: 33667666
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2032-12-28"
    }
  },
  {
    id: "P014",
    property_code: "2404",
    name: "EDEN CROSSING",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.1567627,
      lng: 28.1664249,
      address: "DICK KEMP STREET MEADOWDALE EDENVALE",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 27552152,
      size: 27183,
      occupancyRate: 99,
      annualRevenue: 2608834,
      roi: 8.47,
      yieldRate: 9.47
    },
    financial: {
      currentValue: 27552152,
      acquisitionDate: "2021-09-15",
      acquisitionPrice: 22041722
    },
    tenant: {
      name: "Nicky Whiting",
      leaseExpiry: "2029-03-03"
    }
  },
  {
    id: "P015",
    property_code: "2904",
    name: "8 RIVONIA ROAD",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.12694,
      lng: 28.04924,
      address: "43 CENTRAL AVENUE CNR RIVONIA ROAD ILLOVO",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 56213606,
      size: 4730,
      occupancyRate: 87,
      annualRevenue: 5476693,
      roi: 10.86,
      yieldRate: 9.74
    },
    financial: {
      currentValue: 56213606,
      acquisitionDate: "2020-11-28",
      acquisitionPrice: 44970885
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2029-08-10"
    }
  },
  {
    id: "P016",
    property_code: "2161",
    name: "MILL ROAD INDUSTRIAL PARK",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -33.9247279,
      lng: 18.6528586,
      address: "MILL ROAD BELLVILLE SOUTH",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 22347006,
      size: 32920,
      occupancyRate: 100,
      annualRevenue: 2645622,
      roi: 8.03,
      yieldRate: 11.84
    },
    financial: {
      currentValue: 22347006,
      acquisitionDate: "2015-07-24",
      acquisitionPrice: 17877605
    },
    tenant: {
      name: "Sedica Knight",
      leaseExpiry: "2028-03-14"
    }
  },
  {
    id: "P017",
    property_code: "3600",
    name: "11 ADDERLEY",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.9230238,
      lng: 18.4230263,
      address: "11 ADDERLEY STREET",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 52902019,
      size: 19809,
      occupancyRate: 76,
      annualRevenue: 4036932,
      roi: 14.03,
      yieldRate: 7.63
    },
    financial: {
      currentValue: 52902019,
      acquisitionDate: "2017-08-10",
      acquisitionPrice: 42321615
    },
    tenant: {
      name: "n/a",
      leaseExpiry: "2034-05-14"
    }
  },
  {
    id: "P018",
    property_code: "1842",
    name: "ROUTE 24",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.149252,
      lng: 28.175383,
      address: "HERMAN ROAD MEADOWDALE EDENVALE",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 29701432,
      size: 37443,
      occupancyRate: 98,
      annualRevenue: 3487923,
      roi: 12.71,
      yieldRate: 11.74
    },
    financial: {
      currentValue: 29701432,
      acquisitionDate: "2021-07-12",
      acquisitionPrice: 23761146
    },
    tenant: {
      name: "Nicky Whiting",
      leaseExpiry: "2029-10-24"
    }
  },
  {
    id: "P019",
    property_code: "2419",
    name: "1 MONTGOMERY",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -29.7175005,
      lng: 31.0545678,
      address: "ILLOVO SUGAR PARK 1 MONTGOMERY DRIVE MOUNT EDGECOMBE, DURBAN",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 32472615,
      size: 5517,
      occupancyRate: 91,
      annualRevenue: 3028469,
      roi: 14.66,
      yieldRate: 9.33
    },
    financial: {
      currentValue: 32472615,
      acquisitionDate: "2022-12-29",
      acquisitionPrice: 25978092
    },
    tenant: {
      name: "Craig Davis",
      leaseExpiry: "2033-09-29"
    }
  },
  {
    id: "P020",
    property_code: "3545",
    name: "1 SIXTY JAN SMUTS",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.146585,
      lng: 28.0358384,
      address: "160 JAN SMUTS AVENUE ROSEBANK",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 40909091,
      size: 5812,
      occupancyRate: 82,
      annualRevenue: 2782811,
      roi: 14.73,
      yieldRate: 6.8
    },
    financial: {
      currentValue: 40909091,
      acquisitionDate: "2018-07-07",
      acquisitionPrice: 32727273
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2028-01-07"
    }
  },
  {
    id: "P021",
    property_code: "2213",
    name: "138 WEST STREET",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1063863,
      lng: 28.0570334,
      address: "138 WEST STREET SANDOWN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 50649786,
      size: 22754,
      occupancyRate: 89,
      annualRevenue: 4934488,
      roi: 11.93,
      yieldRate: 9.74
    },
    financial: {
      currentValue: 50649786,
      acquisitionDate: "2017-08-21",
      acquisitionPrice: 40519829
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2035-07-30"
    }
  },
  {
    id: "P022",
    property_code: "2912",
    name: "148 ON KATHERINE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1034797,
      lng: 28.0723042,
      address: "148 KATHERINE STREET SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 49919023,
      size: 14985,
      occupancyRate: 89,
      annualRevenue: 4361875,
      roi: 13.32,
      yieldRate: 8.74
    },
    financial: {
      currentValue: 49919023,
      acquisitionDate: "2017-11-27",
      acquisitionPrice: 39935218
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2027-10-22"
    }
  },
  {
    id: "P023",
    property_code: "2513",
    name: "23 IMPALA ROAD",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1152154,
      lng: 28.0511751,
      address: "23 IMPALA ROAD CHISLEHURSTON SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 40775493,
      size: 22550,
      occupancyRate: 83,
      annualRevenue: 3247510,
      roi: 12.19,
      yieldRate: 7.96
    },
    financial: {
      currentValue: 40775493,
      acquisitionDate: "2022-11-01",
      acquisitionPrice: 32620394
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2028-04-23"
    }
  },
  {
    id: "P024",
    property_code: "2444",
    name: "25 RUDD ROAD",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1306888,
      lng: 28.0504781,
      address: "25 RUDD ROAD ILLOVO SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 57772501,
      size: 20898,
      occupancyRate: 80,
      annualRevenue: 4117778,
      roi: 11.07,
      yieldRate: 7.13
    },
    financial: {
      currentValue: 57772501,
      acquisitionDate: "2019-11-07",
      acquisitionPrice: 46218001
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2028-02-05"
    }
  },
  {
    id: "P025",
    property_code: "3704",
    name: "28 FRICKER ROAD",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1297827,
      lng: 28.0481203,
      address: "28 FRICKER ROAD ILLOVO",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 49154279,
      size: 9366,
      occupancyRate: 85,
      annualRevenue: 3480947,
      roi: 11.83,
      yieldRate: 7.08
    },
    financial: {
      currentValue: 49154279,
      acquisitionDate: "2016-04-19",
      acquisitionPrice: 39323423
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2035-03-26"
    }
  },
  {
    id: "P026",
    property_code: "3570",
    name: "33 BREE & 30 WATERKANT",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.9192546,
      lng: 18.4211488,
      address: "33 BREE & 30 WATERKANT STREETS CAPE TOWN",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 44008331,
      size: 22917,
      occupancyRate: 87,
      annualRevenue: 4090128,
      roi: 13.09,
      yieldRate: 9.29
    },
    financial: {
      currentValue: 44008331,
      acquisitionDate: "2015-07-08",
      acquisitionPrice: 35206665
    },
    tenant: {
      name: "Chris Mackrill",
      leaseExpiry: "2028-07-02"
    }
  },
  {
    id: "P027",
    property_code: "2183",
    name: "33 FRICKER ROAD",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1299853,
      lng: 28.0475008,
      address: "31 & 33 FRICKER ROAD ILLOVO",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 55742847,
      size: 8676,
      occupancyRate: 98,
      annualRevenue: 5373353,
      roi: 13.48,
      yieldRate: 9.64
    },
    financial: {
      currentValue: 55742847,
      acquisitionDate: "2016-08-17",
      acquisitionPrice: 44594278
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2031-04-13"
    }
  },
  {
    id: "P028",
    property_code: "2178",
    name: "36 WIERDA ROAD WEST",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1146244,
      lng: 28.0542929,
      address: "36 WIERDA ROAD WEST WIERDA VALLEY",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 52395915,
      size: 2673,
      occupancyRate: 79,
      annualRevenue: 3682708,
      roi: 9.14,
      yieldRate: 7.03
    },
    financial: {
      currentValue: 52395915,
      acquisitionDate: "2018-04-24",
      acquisitionPrice: 41916732
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2035-06-11"
    }
  },
  {
    id: "P029",
    property_code: "3707",
    name: "82 GRAYSTON DRIVE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1003853,
      lng: 28.053545,
      address: "82 GRAYSTON DRIVE SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 59389466,
      size: 9879,
      occupancyRate: 81,
      annualRevenue: 5675435,
      roi: 15.34,
      yieldRate: 9.56
    },
    financial: {
      currentValue: 59389466,
      acquisitionDate: "2017-02-08",
      acquisitionPrice: 47511573
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2028-03-26"
    }
  },
  {
    id: "P030",
    property_code: "3578",
    name: "9 FROSTERLEY CRESCENT",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -29.735249,
      lng: 31.0644614,
      address: "9 FROSTERLEY CRESCENT LA LUCIA RIDGE UMHLANGA",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 30135156,
      size: 18366,
      occupancyRate: 92,
      annualRevenue: 2588679,
      roi: 9.06,
      yieldRate: 8.59
    },
    financial: {
      currentValue: 30135156,
      acquisitionDate: "2021-03-05",
      acquisitionPrice: 24108125
    },
    tenant: {
      name: "Craig Davis",
      leaseExpiry: "2029-06-30"
    }
  },
  {
    id: "P031",
    property_code: "2414",
    name: "ADT HOUSE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.892181,
      lng: 18.56108,
      address: "LOUWTJIE ROTHMAN AVE GOODWOOD",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42992943,
      size: 3153,
      occupancyRate: 84,
      annualRevenue: 3507722,
      roi: 10.89,
      yieldRate: 8.16
    },
    financial: {
      currentValue: 42992943,
      acquisitionDate: "2019-05-24",
      acquisitionPrice: 34394354
    },
    tenant: {
      name: "Dirk Bronner",
      leaseExpiry: "2029-09-05"
    }
  },
  {
    id: "P032",
    property_code: "3780",
    name: "ADVOCATES CHAMBERS",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.103219,
      lng: 28.052417,
      address: "CNR FREDMAN DRIVE & WEST STREET SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 54210579,
      size: 10973,
      occupancyRate: 85,
      annualRevenue: 3887891,
      roi: 15.87,
      yieldRate: 7.17
    },
    financial: {
      currentValue: 54210579,
      acquisitionDate: "2020-06-17",
      acquisitionPrice: 43368463
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2035-01-27"
    }
  },
  {
    id: "P033",
    property_code: "3540",
    name: "AUTUMN ROAD",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0436533,
      lng: 28.0587276,
      address: "12 AUTUMN STREET RIVONIA SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 58183867,
      size: 2360,
      occupancyRate: 95,
      annualRevenue: 4504739,
      roi: 9.47,
      yieldRate: 7.74
    },
    financial: {
      currentValue: 58183867,
      acquisitionDate: "2015-06-19",
      acquisitionPrice: 46547094
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2030-10-21"
    }
  },
  {
    id: "P034",
    property_code: "1809",
    name: "BELMONT OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.960432,
      lng: 18.4739806,
      address: "BELMONT ROAD RONDEBOSCH",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 51207687,
      size: 8873,
      occupancyRate: 92,
      annualRevenue: 5138623,
      roi: 15.65,
      yieldRate: 10.03
    },
    financial: {
      currentValue: 51207687,
      acquisitionDate: "2019-01-01",
      acquisitionPrice: 40966150
    },
    tenant: {
      name: "Dirk Bronner",
      leaseExpiry: "2031-09-30"
    }
  },
  {
    id: "P035",
    property_code: "2479",
    name: "BOND TOWER",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.9955899,
      lng: 28.1346809,
      address: "CNR K101 AND GRAND CENTRAL BOULEVARD",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 59146657,
      size: 18400,
      occupancyRate: 85,
      annualRevenue: 4878964,
      roi: 9.97,
      yieldRate: 8.25
    },
    financial: {
      currentValue: 59146657,
      acquisitionDate: "2018-09-02",
      acquisitionPrice: 47317326
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2027-10-23"
    }
  },
  {
    id: "P036",
    property_code: "1904",
    name: "BROOKFIELD OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.771802,
      lng: 28.2313642,
      address: "261 MIDDEL STREET NIEUW MUCKLENEUK",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 44517227,
      size: 9438,
      occupancyRate: 98,
      annualRevenue: 4731896,
      roi: 11.92,
      yieldRate: 10.63
    },
    financial: {
      currentValue: 44517227,
      acquisitionDate: "2016-11-04",
      acquisitionPrice: 35613782
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2035-04-12"
    }
  },
  {
    id: "P037",
    property_code: "2138",
    name: "CELTIS BUSINESS PARK",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.1973108,
      lng: 27.9275867,
      address: "CNR HOEFYSTER & HARNAS STREET STORMILL FLORIDA EXTENSION 11, ROODEPOORT",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 24038386,
      size: 30832,
      occupancyRate: 86,
      annualRevenue: 2361561,
      roi: 15.13,
      yieldRate: 9.82
    },
    financial: {
      currentValue: 24038386,
      acquisitionDate: "2021-06-12",
      acquisitionPrice: 19230709
    },
    tenant: {
      name: "Lee Greyvenstein",
      leaseExpiry: "2029-12-31"
    }
  },
  {
    id: "P038",
    property_code: "3068",
    name: "CENTRAL PARK - CAPE TOWN",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -33.917747,
      lng: 18.5611022,
      address: "EPPING AVE ELSIESRIVER INDUSTRIA ESTATE GOODWOOD",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 28682079,
      size: 35580,
      occupancyRate: 99,
      annualRevenue: 2642816,
      roi: 11.2,
      yieldRate: 9.21
    },
    financial: {
      currentValue: 28682079,
      acquisitionDate: "2016-03-26",
      acquisitionPrice: 22945663
    },
    tenant: {
      name: "Sedica Knight",
      leaseExpiry: "2028-11-07"
    }
  },
  {
    id: "P039",
    property_code: "1811",
    name: "CENTRAL PARK - MIDRAND",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.9810456,
      lng: 28.1315257,
      address: "400 16TH ROAD CORNER 16TH AND NEW ROAD MIDRAND",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 58012337,
      size: 8686,
      occupancyRate: 76,
      annualRevenue: 4912376,
      roi: 15.7,
      yieldRate: 8.47
    },
    financial: {
      currentValue: 58012337,
      acquisitionDate: "2020-05-12",
      acquisitionPrice: 46409870
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2028-05-28"
    }
  },
  {
    id: "P040",
    property_code: "1813",
    name: "CONSTANTIA PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1514514,
      lng: 27.9244315,
      address: "CORNER 14TH AVENUE & HENDRIK POTGIETER ROAD, WELTEVREDEN PARK, ROODEPOORT",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 41428894,
      size: 8333,
      occupancyRate: 90,
      annualRevenue: 3951672,
      roi: 15.65,
      yieldRate: 9.54
    },
    financial: {
      currentValue: 41428894,
      acquisitionDate: "2021-04-22",
      acquisitionPrice: 33143115
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2033-07-12"
    }
  },
  {
    id: "P041",
    property_code: "2509",
    name: "COUNTRY CLUB ESTATE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0593644,
      lng: 28.0828792,
      address: "21 WOODLANDS DRIVE WOODMEAD",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 50617845,
      size: 2028,
      occupancyRate: 94,
      annualRevenue: 3843982,
      roi: 15.42,
      yieldRate: 7.59
    },
    financial: {
      currentValue: 50617845,
      acquisitionDate: "2015-08-14",
      acquisitionPrice: 40494276
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2028-08-13"
    }
  },
  {
    id: "P042",
    property_code: "1815",
    name: "EDGECOMBE OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -29.73504969999999,
      lng: 31.0659439,
      address: "LA LUCIA RIDGE OFFICE PARK PENCARROW CRESCENT LA LUCIA RIDGE",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 29339982,
      size: 18373,
      occupancyRate: 93,
      annualRevenue: 3266464,
      roi: 12.86,
      yieldRate: 11.13
    },
    financial: {
      currentValue: 29339982,
      acquisitionDate: "2022-12-04",
      acquisitionPrice: 23471986
    },
    tenant: {
      name: "Craig Davis",
      leaseExpiry: "2029-09-06"
    }
  },
  {
    id: "P043",
    property_code: "4306",
    name: "ELVAN PROPERTY",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.1676947,
      lng: 28.166622,
      address: "A.G. DE WITT DRIVE  AND NORTH REEF RD FISHERS HILL, EDENVALE",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 33821822,
      size: 40632,
      occupancyRate: 98,
      annualRevenue: 3226229,
      roi: 9.81,
      yieldRate: 9.54
    },
    financial: {
      currentValue: 33821822,
      acquisitionDate: "2018-07-07",
      acquisitionPrice: 27057458
    },
    tenant: {
      name: "Nicky Whiting",
      leaseExpiry: "2033-03-14"
    }
  },
  {
    id: "P044",
    property_code: "2126",
    name: "ETON OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0458798,
      lng: 28.010615,
      address: "CNR SLOANE STREET AND HARRISON AVENUE BRYANSTON, SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 51111384,
      size: 10749,
      occupancyRate: 82,
      annualRevenue: 4414647,
      roi: 12.1,
      yieldRate: 8.64
    },
    financial: {
      currentValue: 51111384,
      acquisitionDate: "2017-08-20",
      acquisitionPrice: 40889107
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2035-06-26"
    }
  },
  {
    id: "P045",
    property_code: "7017",
    name: "FERGUSON PLACE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1241179,
      lng: 28.0479024,
      address: "39 FERGUSON ROAD ILLOVO",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 40406477,
      size: 7428,
      occupancyRate: 91,
      annualRevenue: 4039372,
      roi: 15.61,
      yieldRate: 10
    },
    financial: {
      currentValue: 40406477,
      acquisitionDate: "2021-08-29",
      acquisitionPrice: 32325182
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2030-02-25"
    }
  },
  {
    id: "P046",
    property_code: "2453",
    name: "FREDMAN TOWERS",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1021625,
      lng: 28.0549813,
      address: "CNR FREDMAN DRIVE & BUTE LANE SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42640063,
      size: 9493,
      occupancyRate: 91,
      annualRevenue: 3132718,
      roi: 9.22,
      yieldRate: 7.35
    },
    financial: {
      currentValue: 42640063,
      acquisitionDate: "2015-11-28",
      acquisitionPrice: 34112050
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2035-01-14"
    }
  },
  {
    id: "P047",
    property_code: "2905",
    name: "FREESTONE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1050599,
      lng: 28.0694631,
      address: "135 PATRICIA ROAD SANDOWN SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 56463483,
      size: 17705,
      occupancyRate: 92,
      annualRevenue: 4229631,
      roi: 8.94,
      yieldRate: 7.49
    },
    financial: {
      currentValue: 56463483,
      acquisitionDate: "2016-10-05",
      acquisitionPrice: 45170786
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2027-12-21"
    }
  },
  {
    id: "P048",
    property_code: "2447",
    name: "GALAXY",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.0738905,
      lng: 28.1137449,
      address: "17 GALAXY AVENUE LINBRO PARK SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 29184743,
      size: 33974,
      occupancyRate: 92,
      annualRevenue: 2285357,
      roi: 13.42,
      yieldRate: 7.83
    },
    financial: {
      currentValue: 29184743,
      acquisitionDate: "2015-11-26",
      acquisitionPrice: 23347794
    },
    tenant: {
      name: "Vivienne Aspin",
      leaseExpiry: "2034-09-01"
    }
  },
  {
    id: "P049",
    property_code: "1919",
    name: "GALLAGHER PLACE",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.0074367,
      lng: 28.1269418,
      address: "CNR SUTTIE AVENUE AND RICHARDS DRIVE, HALFWAY HOUSE MIDRAND",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 29221292,
      size: 41110,
      occupancyRate: 77,
      annualRevenue: 2543120,
      roi: 12.47,
      yieldRate: 8.7
    },
    financial: {
      currentValue: 29221292,
      acquisitionDate: "2022-08-04",
      acquisitionPrice: 23377034
    },
    tenant: {
      name: "Vivienne Aspin",
      leaseExpiry: "2033-06-11"
    }
  },
  {
    id: "P050",
    property_code: "3061",
    name: "GATEWAY",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.2607174,
      lng: 28.1196568,
      address: "CNR VOORTREKKER & RING ROAD EAST, ALBERTON SOUTH JOHANNESBURG",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 35896395,
      size: 11260,
      occupancyRate: 82,
      annualRevenue: 2420199,
      roi: 14.55,
      yieldRate: 6.74
    },
    financial: {
      currentValue: 35896395,
      acquisitionDate: "2017-04-28",
      acquisitionPrice: 28717116
    },
    tenant: {
      name: "Lee Greyvenstein",
      leaseExpiry: "2028-02-16"
    }
  },
  {
    id: "P051",
    property_code: "1819",
    name: "GILLOOLYS VIEW",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1741765,
      lng: 28.1281358,
      address: "1 OSBORNE LANE BEDFORDVIEW",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 49765714,
      size: 16006,
      occupancyRate: 82,
      annualRevenue: 4236466,
      roi: 8.19,
      yieldRate: 8.51
    },
    financial: {
      currentValue: 49765714,
      acquisitionDate: "2020-01-04",
      acquisitionPrice: 39812571
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2034-07-02"
    }
  },
  {
    id: "P052",
    property_code: "2931",
    name: "GIRTON PLACE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.183034,
      lng: 28.036413,
      address: "12A ST ANDREWS ROAD PARKTOWN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 52571640,
      size: 10298,
      occupancyRate: 96,
      annualRevenue: 5837318,
      roi: 9.5,
      yieldRate: 11.1
    },
    financial: {
      currentValue: 52571640,
      acquisitionDate: "2021-05-21",
      acquisitionPrice: 42057312
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2031-06-02"
    }
  },
  {
    id: "P053",
    property_code: "2455",
    name: "GRAYSTON OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1016369,
      lng: 28.0702507,
      address: "128 PETER ROAD SANDOWN SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42875418,
      size: 4344,
      occupancyRate: 80,
      annualRevenue: 3979499,
      roi: 11.31,
      yieldRate: 9.28
    },
    financial: {
      currentValue: 42875418,
      acquisitionDate: "2017-07-29",
      acquisitionPrice: 34300334
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2029-10-31"
    }
  },
  {
    id: "P054",
    property_code: "3587",
    name: "GREYSTONES INDUSTRIAL",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -29.7503062,
      lng: 31.0285347,
      address: "135 OLD NORTH COAST ROAD GLEN ANIL",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 19919216,
      size: 15003,
      occupancyRate: 89,
      annualRevenue: 1970326,
      roi: 10.72,
      yieldRate: 9.89
    },
    financial: {
      currentValue: 19919216,
      acquisitionDate: "2015-02-14",
      acquisitionPrice: 15935373
    },
    tenant: {
      name: "Craig Davis",
      leaseExpiry: "2033-10-31"
    }
  },
  {
    id: "P055",
    property_code: "1823",
    name: "GROSVENOR CORNER",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1441445,
      lng: 28.035611,
      address: "195 JAN SMUTS AVENUE PARKTOWN NORTH",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 55128109,
      size: 15414,
      occupancyRate: 82,
      annualRevenue: 3733653,
      roi: 12.32,
      yieldRate: 6.77
    },
    financial: {
      currentValue: 55128109,
      acquisitionDate: "2016-06-17",
      acquisitionPrice: 44102487
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2034-09-27"
    }
  },
  {
    id: "P056",
    property_code: "2477",
    name: "GROWTHPOINT INDUSTRIAL ESTATE",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.1489776,
      lng: 28.1891597,
      address: "1 BELL STREET MEADOWDALE GERMISTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 33415293,
      size: 13200,
      occupancyRate: 97,
      annualRevenue: 3463076,
      roi: 8.27,
      yieldRate: 10.36
    },
    financial: {
      currentValue: 33415293,
      acquisitionDate: "2018-07-14",
      acquisitionPrice: 26732234
    },
    tenant: {
      name: "Nicky Whiting",
      leaseExpiry: "2031-04-03"
    }
  },
  {
    id: "P057",
    property_code: "3038",
    name: "GUNNERS",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -33.9288836,
      lng: 18.5331722,
      address: "GUNNERS CIRCLE EPPING INDUSTRIA 1",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 28184268,
      size: 49427,
      occupancyRate: 77,
      annualRevenue: 2403910,
      roi: 14.16,
      yieldRate: 8.53
    },
    financial: {
      currentValue: 28184268,
      acquisitionDate: "2018-08-06",
      acquisitionPrice: 22547414
    },
    tenant: {
      name: "Sedica Knight",
      leaseExpiry: "2032-11-27"
    }
  },
  {
    id: "P058",
    property_code: "1824",
    name: "HATFIELD GARDENS",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.7473088,
      lng: 28.2371181,
      address: "333 GROSVENOR STREET HATFIELD PRETORIA",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 48480815,
      size: 8844,
      occupancyRate: 81,
      annualRevenue: 4122786,
      roi: 14.58,
      yieldRate: 8.5
    },
    financial: {
      currentValue: 48480815,
      acquisitionDate: "2017-09-14",
      acquisitionPrice: 38784652
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2033-11-21"
    }
  },
  {
    id: "P059",
    property_code: "1924",
    name: "HOMESTEAD PLACE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0487264,
      lng: 28.0586699,
      address: "CNR 12TH AVENUE AND RIVONIA RD RIVONIA SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 47726042,
      size: 11209,
      occupancyRate: 76,
      annualRevenue: 3214156,
      roi: 11.56,
      yieldRate: 6.73
    },
    financial: {
      currentValue: 47726042,
      acquisitionDate: "2021-09-28",
      acquisitionPrice: 38180834
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2030-03-30"
    }
  },
  {
    id: "P060",
    property_code: "2906",
    name: "HUNTS END",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1128335,
      lng: 28.0564511,
      address: "38 & 42 WIERDA ROAD WEST WIERDA VALLEY",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 45019707,
      size: 4404,
      occupancyRate: 97,
      annualRevenue: 5106285,
      roi: 13.31,
      yieldRate: 11.34
    },
    financial: {
      currentValue: 45019707,
      acquisitionDate: "2017-08-04",
      acquisitionPrice: 36015766
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2034-11-30"
    }
  },
  {
    id: "P061",
    property_code: "3720",
    name: "ILLOVO BOULEVARD PIAZZAS",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1320077,
      lng: 28.0450558,
      address: "FRICKER ROAD ILLOVO BOULEVARD",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 48400643,
      size: 11806,
      occupancyRate: 82,
      annualRevenue: 4115357,
      roi: 9.22,
      yieldRate: 8.5
    },
    financial: {
      currentValue: 48400643,
      acquisitionDate: "2016-05-07",
      acquisitionPrice: 38720514
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2031-03-26"
    }
  },
  {
    id: "P062",
    property_code: "2510",
    name: "ILLOVO CORNER",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1255369,
      lng: 28.0483152,
      address: "24 FRICKER ROAD ILLOVO",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 55978786,
      size: 23907,
      occupancyRate: 82,
      annualRevenue: 4645576,
      roi: 11.52,
      yieldRate: 8.3
    },
    financial: {
      currentValue: 55978786,
      acquisitionDate: "2019-12-23",
      acquisitionPrice: 44783029
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2031-11-20"
    }
  },
  {
    id: "P063",
    property_code: "2101",
    name: "IMPALA ROAD",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.0821139,
      lng: 28.0894954,
      address: "89 IMPALA ROAD KELVIN SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 26144604,
      size: 10469,
      occupancyRate: 84,
      annualRevenue: 1868719,
      roi: 15.9,
      yieldRate: 7.15
    },
    financial: {
      currentValue: 26144604,
      acquisitionDate: "2016-05-23",
      acquisitionPrice: 20915683
    },
    tenant: {
      name: "Vivienne Aspin",
      leaseExpiry: "2028-03-21"
    }
  },
  {
    id: "P064",
    property_code: "2218",
    name: "INANDA GREENS - GPT",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1141056,
      lng: 28.0585755,
      address: "54 WIERDA ROAD WEST WIERDA VALLEY",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 40065325,
      size: 22898,
      occupancyRate: 87,
      annualRevenue: 3169159,
      roi: 8.25,
      yieldRate: 7.91
    },
    financial: {
      currentValue: 40065325,
      acquisitionDate: "2019-12-31",
      acquisitionPrice: 32052260
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2030-03-17"
    }
  },
  {
    id: "P065",
    property_code: "2923",
    name: "INYANDA 2",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1831195,
      lng: 28.0373366,
      address: "15 GIRTON ROAD PARKTOWN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 50611455,
      size: 9933,
      occupancyRate: 91,
      annualRevenue: 4064324,
      roi: 8.63,
      yieldRate: 8.03
    },
    financial: {
      currentValue: 50611455,
      acquisitionDate: "2016-05-03",
      acquisitionPrice: 40489164
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2034-02-25"
    }
  },
  {
    id: "P066",
    property_code: "2409",
    name: "KNIGHTSGATE",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.2174587,
      lng: 28.1562041,
      address: "CNR REFINERY ROAD, JACK STR JONAS CRESCENT DRIEHOEK, GERMISTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 33694445,
      size: 49049,
      occupancyRate: 78,
      annualRevenue: 2272410,
      roi: 13.19,
      yieldRate: 6.74
    },
    financial: {
      currentValue: 33694445,
      acquisitionDate: "2022-08-01",
      acquisitionPrice: 26955556
    },
    tenant: {
      name: "Lee Greyvenstein",
      leaseExpiry: "2030-06-14"
    }
  },
  {
    id: "P067",
    property_code: "1852",
    name: "LAKESIDE 3",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.8526455,
      lng: 28.1889803,
      address: "263 A WEST AVENUE DIE HOEWES CENTURION",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 51570640,
      size: 24399,
      occupancyRate: 82,
      annualRevenue: 3874132,
      roi: 14.67,
      yieldRate: 7.51
    },
    financial: {
      currentValue: 51570640,
      acquisitionDate: "2022-03-23",
      acquisitionPrice: 41256512
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2035-02-07"
    }
  },
  {
    id: "P068",
    property_code: "3548",
    name: "LONGKLOOF",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.929015,
      lng: 18.411679,
      address: "PARK/KLOOF/DARTERS ROADS GARDENS",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42725374,
      size: 16203,
      occupancyRate: 97,
      annualRevenue: 4895683,
      roi: 14.99,
      yieldRate: 11.46
    },
    financial: {
      currentValue: 42725374,
      acquisitionDate: "2015-05-06",
      acquisitionPrice: 34180299
    },
    tenant: {
      name: "Chris Mackrill",
      leaseExpiry: "2032-01-18"
    }
  },
  {
    id: "P069",
    property_code: "2152",
    name: "MENLYN CORNER",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.7833897,
      lng: 28.278035,
      address: "87 FRIKKIE DE BEER STREET MENLYN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 46770126,
      size: 13558,
      occupancyRate: 92,
      annualRevenue: 4904540,
      roi: 9.41,
      yieldRate: 10.49
    },
    financial: {
      currentValue: 46770126,
      acquisitionDate: "2015-03-29",
      acquisitionPrice: 37416101
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2028-06-16"
    }
  },
  {
    id: "P070",
    property_code: "2432",
    name: "MENLYN PIAZZA",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.7841767,
      lng: 28.2773961,
      address: "CNR GLEN MANOR AVENUE & LOIS AVENUE MENLYN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 44331439,
      size: 10273,
      occupancyRate: 91,
      annualRevenue: 3299744,
      roi: 11.39,
      yieldRate: 7.44
    },
    financial: {
      currentValue: 44331439,
      acquisitionDate: "2022-12-24",
      acquisitionPrice: 35465151
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2029-11-28"
    }
  },
  {
    id: "P071",
    property_code: "3137",
    name: "MONTEER",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.1454214,
      lng: 28.2027868,
      address: "2 MONTEER ROAD ISANDO",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 33706763,
      size: 33846,
      occupancyRate: 93,
      annualRevenue: 3105127,
      roi: 8.74,
      yieldRate: 9.21
    },
    financial: {
      currentValue: 33706763,
      acquisitionDate: "2016-12-03",
      acquisitionPrice: 26965410
    },
    tenant: {
      name: "Nicky Whiting",
      leaseExpiry: "2033-02-21"
    }
  },
  {
    id: "P072",
    property_code: "3528",
    name: "MORNINGSIDE CLOSE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0736512,
      lng: 28.0656275,
      address: "222 RIVONIA ROAD MORNINGSIDE SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 49642784,
      size: 5247,
      occupancyRate: 99,
      annualRevenue: 4541618,
      roi: 9.49,
      yieldRate: 9.15
    },
    financial: {
      currentValue: 49642784,
      acquisitionDate: "2018-11-04",
      acquisitionPrice: 39714227
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2032-11-21"
    }
  },
  {
    id: "P073",
    property_code: "2468",
    name: "OGILVY BUILDING",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.041326,
      lng: 28.0160412,
      address: "15 SLOANE STREET BRYANSTON SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 53971873,
      size: 10445,
      occupancyRate: 83,
      annualRevenue: 4588607,
      roi: 11.19,
      yieldRate: 8.5
    },
    financial: {
      currentValue: 53971873,
      acquisitionDate: "2019-11-20",
      acquisitionPrice: 43177498
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2034-08-14"
    }
  },
  {
    id: "P074",
    property_code: "2907",
    name: "OXFORD CORNER",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.142893,
      lng: 28.0432745,
      address: "32A JELLICOE AVENUE ROSEBANK",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 52575238,
      size: 15349,
      occupancyRate: 99,
      annualRevenue: 6079204,
      roi: 11.67,
      yieldRate: 11.56
    },
    financial: {
      currentValue: 52575238,
      acquisitionDate: "2021-01-24",
      acquisitionPrice: 42060190
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2029-09-20"
    }
  },
  {
    id: "P075",
    property_code: "1933",
    name: "PETER PLACE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0809212,
      lng: 28.0150646,
      address: "24 PETER PLACE LYME PARK BRYANSTON, SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 55706363,
      size: 23429,
      occupancyRate: 77,
      annualRevenue: 4613562,
      roi: 11.73,
      yieldRate: 8.28
    },
    financial: {
      currentValue: 55706363,
      acquisitionDate: "2021-02-28",
      acquisitionPrice: 44565090
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2032-03-08"
    }
  },
  {
    id: "P076",
    property_code: "2515",
    name: "PETER PLACE OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0824946,
      lng: 28.0208222,
      address: "54 PETER PLACE BRYANSTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 45629478,
      size: 12510,
      occupancyRate: 76,
      annualRevenue: 4072721,
      roi: 15.07,
      yieldRate: 8.93
    },
    financial: {
      currentValue: 45629478,
      acquisitionDate: "2020-01-29",
      acquisitionPrice: 36503582
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2027-12-21"
    }
  },
  {
    id: "P077",
    property_code: "3701",
    name: "PHAROS HOUSE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -29.8356567,
      lng: 30.9171913,
      address: "70 BUCKINGHAM TERRACE WESTVILLE DURBAN",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 30230753,
      size: 12073,
      occupancyRate: 100,
      annualRevenue: 3291302,
      roi: 9.87,
      yieldRate: 10.89
    },
    financial: {
      currentValue: 30230753,
      acquisitionDate: "2020-02-29",
      acquisitionPrice: 24184602
    },
    tenant: {
      name: "Craig Davis",
      leaseExpiry: "2031-01-21"
    }
  },
  {
    id: "P078",
    property_code: "3526",
    name: "PINEWOOD OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0415594,
      lng: 28.0751817,
      address: "33 RILEY ROAD WOODMEAD SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 58913420,
      size: 11186,
      occupancyRate: 91,
      annualRevenue: 6332229,
      roi: 9.35,
      yieldRate: 10.75
    },
    financial: {
      currentValue: 58913420,
      acquisitionDate: "2019-04-14",
      acquisitionPrice: 47130736
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2030-11-18"
    }
  },
  {
    id: "P079",
    property_code: "2452",
    name: "RIVER PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.9469323,
      lng: 18.4769113,
      address: "LIESBEECK PARKWAY SETTLERS WAY MOWBRAY",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 46484301,
      size: 13085,
      occupancyRate: 89,
      annualRevenue: 4230341,
      roi: 12.57,
      yieldRate: 9.1
    },
    financial: {
      currentValue: 46484301,
      acquisitionDate: "2021-01-03",
      acquisitionPrice: 37187441
    },
    tenant: {
      name: "Dirk Bronner",
      leaseExpiry: "2028-03-11"
    }
  },
  {
    id: "P080",
    property_code: "3788",
    name: "ROGGEBAAI PLACE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.9171577,
      lng: 18.4263931,
      address: "4 JETTY STREET FORESHORE",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 48100776,
      size: 5557,
      occupancyRate: 76,
      annualRevenue: 3446508,
      roi: 10.08,
      yieldRate: 7.17
    },
    financial: {
      currentValue: 48100776,
      acquisitionDate: "2020-07-05",
      acquisitionPrice: 38480621
    },
    tenant: {
      name: "Chris Mackrill",
      leaseExpiry: "2029-03-23"
    }
  },
  {
    id: "P081",
    property_code: "2406",
    name: "ROSEBANK OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.14715,
      lng: 28.03522,
      address: "181 JAN SMUTS AVENUE PARKTOWN NORTH",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 50964303,
      size: 20976,
      occupancyRate: 80,
      annualRevenue: 4622485,
      roi: 10.76,
      yieldRate: 9.07
    },
    financial: {
      currentValue: 50964303,
      acquisitionDate: "2021-03-21",
      acquisitionPrice: 40771442
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2033-02-13"
    }
  },
  {
    id: "P082",
    property_code: "1843",
    name: "ROUTE 41",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.1891046,
      lng: 27.9152037,
      address: "1021 ANVIL ROAD ROBERTVILLE ROODEPOORT",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 27747967,
      size: 35762,
      occupancyRate: 94,
      annualRevenue: 2458024,
      roi: 10.51,
      yieldRate: 8.86
    },
    financial: {
      currentValue: 27747967,
      acquisitionDate: "2022-05-16",
      acquisitionPrice: 22198374
    },
    tenant: {
      name: "Lee Greyvenstein",
      leaseExpiry: "2033-03-25"
    }
  },
  {
    id: "P083",
    property_code: "2910",
    name: "SANDOWN MEWS",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1057404,
      lng: 28.0599113,
      address: "88 STELLA STREET SANDOWN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 54248478,
      size: 15488,
      occupancyRate: 80,
      annualRevenue: 4369121,
      roi: 13.93,
      yieldRate: 8.05
    },
    financial: {
      currentValue: 54248478,
      acquisitionDate: "2021-12-25",
      acquisitionPrice: 43398782
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2030-02-20"
    }
  },
  {
    id: "P084",
    property_code: "2114",
    name: "SANDTON CLOSE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.104758,
      lng: 28.047933,
      address: "CNR 5TH STREET & NORWICH CLOSE SANDOWN, SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 43937863,
      size: 14355,
      occupancyRate: 80,
      annualRevenue: 3606808,
      roi: 14.74,
      yieldRate: 8.21
    },
    financial: {
      currentValue: 43937863,
      acquisitionDate: "2019-06-13",
      acquisitionPrice: 35150290
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2031-12-15"
    }
  },
  {
    id: "P085",
    property_code: "3549",
    name: "SOVEREIGN QUAY",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.9132452,
      lng: 18.4170766,
      address: "CNR LIDDLE & SOMERSET ROADS GREEN POINT",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 45728483,
      size: 4533,
      occupancyRate: 93,
      annualRevenue: 4891203,
      roi: 12,
      yieldRate: 10.7
    },
    financial: {
      currentValue: 45728483,
      acquisitionDate: "2021-02-03",
      acquisitionPrice: 36582786
    },
    tenant: {
      name: "Chris Mackrill",
      leaseExpiry: "2032-01-31"
    }
  },
  {
    id: "P086",
    property_code: "2913",
    name: "STRATHAVON 11",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1029,
      lng: 28.07299,
      address: "152 KATHERINE STREET SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 44903763,
      size: 19196,
      occupancyRate: 95,
      annualRevenue: 3585147,
      roi: 15.68,
      yieldRate: 7.98
    },
    financial: {
      currentValue: 44903763,
      acquisitionDate: "2020-01-25",
      acquisitionPrice: 35923010
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2030-12-03"
    }
  },
  {
    id: "P087",
    property_code: "1846",
    name: "SUNNYSIDE OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1785665,
      lng: 28.0468652,
      address: "32 PRINCESS OF WALES TERRACE PARKTOWN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 43169825,
      size: 5812,
      occupancyRate: 86,
      annualRevenue: 3407022,
      roi: 10.58,
      yieldRate: 7.89
    },
    financial: {
      currentValue: 43169825,
      acquisitionDate: "2019-07-10",
      acquisitionPrice: 34535860
    },
    tenant: {
      name: "Hannah Nesbitt",
      leaseExpiry: "2028-06-23"
    }
  },
  {
    id: "P088",
    property_code: "7027",
    name: "THE ANNEX",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.108437,
      lng: 28.0490978,
      address: "15 ALICE LANE SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 53882735,
      size: 7848,
      occupancyRate: 97,
      annualRevenue: 6183101,
      roi: 15.84,
      yieldRate: 11.48
    },
    financial: {
      currentValue: 53882735,
      acquisitionDate: "2015-07-18",
      acquisitionPrice: 43106188
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2030-09-03"
    }
  },
  {
    id: "P089",
    property_code: "1894",
    name: "THE DISTRICT",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.9284462,
      lng: 18.4240784,
      address: "41 SIR LOWRY ROAD WOODSTOCK CAPE TOWN",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 50377491,
      size: 3939,
      occupancyRate: 95,
      annualRevenue: 5303600,
      roi: 13.09,
      yieldRate: 10.53
    },
    financial: {
      currentValue: 50377491,
      acquisitionDate: "2017-06-01",
      acquisitionPrice: 40301993
    },
    tenant: {
      name: "Chris Mackrill",
      leaseExpiry: "2031-10-15"
    }
  },
  {
    id: "P090",
    property_code: "2475",
    name: "THE ESTUARIES",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -33.8844786,
      lng: 18.5215489,
      address: "OXBOW LANE (OFF CENTURY AVE) CENTURY CITY",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 36357873,
      size: 10851,
      occupancyRate: 79,
      annualRevenue: 3069819,
      roi: 12.57,
      yieldRate: 8.44
    },
    financial: {
      currentValue: 36357873,
      acquisitionDate: "2015-07-28",
      acquisitionPrice: 29086298
    },
    tenant: {
      name: "Dirk Bronner",
      leaseExpiry: "2028-12-01"
    }
  },
  {
    id: "P091",
    property_code: "2137",
    name: "THE GROVE BUSINESS ESTATE",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -34.0786181,
      lng: 18.8153985,
      address: "OLD PAARDEVLEI ROAD SOMERSET WEST",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 27121765,
      size: 45461,
      occupancyRate: 99,
      annualRevenue: 3068627,
      roi: 13.81,
      yieldRate: 11.31
    },
    financial: {
      currentValue: 27121765,
      acquisitionDate: "2019-03-02",
      acquisitionPrice: 21697412
    },
    tenant: {
      name: "Sedica Knight",
      leaseExpiry: "2028-05-07"
    }
  },
  {
    id: "P092",
    property_code: "3729",
    name: "THE VILLAGE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -25.7797675,
      lng: 28.2903115,
      address: "CNR OBERON AND GLENWOOD ROADS FAERIE GLEN",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 52499497,
      size: 3770,
      occupancyRate: 90,
      annualRevenue: 3955552,
      roi: 14.45,
      yieldRate: 7.53
    },
    financial: {
      currentValue: 52499497,
      acquisitionDate: "2020-11-01",
      acquisitionPrice: 41999598
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2035-07-19"
    }
  },
  {
    id: "P093",
    property_code: "2135",
    name: "THYNK INDUSTRIAL PARK",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -29.7947626,
      lng: 31.0156567,
      address: "CNR QUEEN NANDI DRIVE & 1 BRICKWORKS WAY BRIARDENE, DURBAN NORTH",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 22623121,
      size: 7415,
      occupancyRate: 76,
      annualRevenue: 1466434,
      roi: 11.43,
      yieldRate: 6.48
    },
    financial: {
      currentValue: 22623121,
      acquisitionDate: "2020-04-04",
      acquisitionPrice: 18098497
    },
    tenant: {
      name: "Craig Davis",
      leaseExpiry: "2028-04-26"
    }
  },
  {
    id: "P094",
    property_code: "2104",
    name: "TRIPARK",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.0808257,
      lng: 28.0879053,
      address: "17 EASTERN SERVICE ROAD EASTGATE SANDTON",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 32898459,
      size: 24315,
      occupancyRate: 86,
      annualRevenue: 2786052,
      roi: 10.67,
      yieldRate: 8.47
    },
    financial: {
      currentValue: 32898459,
      acquisitionDate: "2016-11-15",
      acquisitionPrice: 26318767
    },
    tenant: {
      name: "Vivienne Aspin",
      leaseExpiry: "2034-05-02"
    }
  },
  {
    id: "P095",
    property_code: "2160",
    name: "WADESTONE INDUSTRIAL PARK",
    type: PropertyTypes.INDUSTRIAL,
    status: "Active",
    location: {
      lat: -26.2728426,
      lng: 28.1890891,
      address: "SNAPPER AVENUE WADEVILLE",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 29541415,
      size: 27153,
      occupancyRate: 75,
      annualRevenue: 2121342,
      roi: 12.43,
      yieldRate: 7.18
    },
    financial: {
      currentValue: 29541415,
      acquisitionDate: "2020-11-24",
      acquisitionPrice: 23633132
    },
    tenant: {
      name: "Lee Greyvenstein",
      leaseExpiry: "2028-01-22"
    }
  },
  {
    id: "P096",
    property_code: "2473",
    name: "WATERFALL PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0121947,
      lng: 28.1145769,
      address: "HOWICK CLOSE VORNA VALLEY",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 56534089,
      size: 16626,
      occupancyRate: 78,
      annualRevenue: 3915428,
      roi: 8.71,
      yieldRate: 6.93
    },
    financial: {
      currentValue: 56534089,
      acquisitionDate: "2020-08-17",
      acquisitionPrice: 45227271
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2033-05-05"
    }
  },
  {
    id: "P097",
    property_code: "2915",
    name: "WIERDA COURT",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.1105055,
      lng: 28.0577385,
      address: "107 JOHAN AVENUE WIERDA VALLEY",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 48108962,
      size: 10173,
      occupancyRate: 97,
      annualRevenue: 4171111,
      roi: 8.86,
      yieldRate: 8.67
    },
    financial: {
      currentValue: 48108962,
      acquisitionDate: "2019-02-16",
      acquisitionPrice: 38487170
    },
    tenant: {
      name: "Dylan Newton",
      leaseExpiry: "2028-11-15"
    }
  },
  {
    id: "P098",
    property_code: "3790",
    name: "WOODLANDS OFFICE PARK",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0614707,
      lng: 28.0863218,
      address: "20 WOODLANDS DRIVE WOODMEAD",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 46572840,
      size: 20000,
      occupancyRate: 97,
      annualRevenue: 3659974,
      roi: 12.64,
      yieldRate: 7.86
    },
    financial: {
      currentValue: 46572840,
      acquisitionDate: "2018-12-30",
      acquisitionPrice: 37258272
    },
    tenant: {
      name: "Leah Smit",
      leaseExpiry: "2032-11-06"
    }
  },
  {
    id: "P099",
    property_code: "2516",
    name: "WOODMEAD ESTATE",
    type: PropertyTypes.OFFICE,
    status: "Active",
    location: {
      lat: -26.0532549,
      lng: 28.0887471,
      address: "1 WOODMEAD DRIVE WOODMEAD",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 16520,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P100",
    property_code: "1805",
    name: "Alberton City",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.266956,
      lng: 28.1220779,
      address: "VOORTREKKER & DU PLESSIS ROAD NEW REDRUTH",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P101",
    property_code: "3709",
    name: "Bayside Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.8241997,
      lng: 18.4870495,
      address: "CNR OTTO DU PLESSIS DRIVE & BLAAUWBERG ROAD TABLE VIEW",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P102",
    property_code: "1805",
    name: "Beacon Bay Retail Park",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -32.9593828,
      lng: 27.9351608,
      address: "BONZA BAY ROAD BEACON BAY",
      node: "n/a",
      region: "Port Elizabeth"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P103",
    property_code: "30500",
    name: "Brooklyn Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -25.7724049,
      lng: 28.2337486,
      address: "338 BRONKHORST STREET NIEUW MUCKLENEUK PRETORIA",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P104",
    property_code: "3713",
    name: "Festival Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.1008633,
      lng: 28.2206114,
      address: "CNR CR SWART DRIVE & KELVIN ST KEMPTON PARK",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P105",
    property_code: "3782",
    name: "Fourways Crossing",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.0155,
      lng: 28.01049,
      address: "CNR WILLIAM NICOL DRIVE AND SUNRISE STREET FOURWAYS",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P106",
    property_code: "3714",
    name: "Gardens Shopping Centre",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.932272,
      lng: 18.4198484,
      address: "CNR MILL & BUITENKANT GARDENS CAPE TOWN",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P107",
    property_code: "3716",
    name: "Greenacres Shopping Centre",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.9501076,
      lng: 25.5780772,
      address: "1 RING ROAD GREENACRES",
      node: "n/a",
      region: "Port Elizabeth"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P108",
    property_code: "7402",
    name: "Hillcrest Corner",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -29.7804497,
      lng: 30.7631433,
      address: "51-53 OLD MAIN ROAD HILLCREST",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P109",
    property_code: "3719",
    name: "Howard Centre",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.9335217,
      lng: 18.5085886,
      address: "CNR HOWARD & FOREST DRIVE PINELANDS CAPE TOWN",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P110",
    property_code: "3721",
    name: "Key West Shopping Centre",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.0877472,
      lng: 27.7849898,
      address: "CNR PAARDEKRAAL & VILJOEN ROAD KRUGERSDORP",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P111",
    property_code: "1829",
    name: "La Lucia Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -29.7538063,
      lng: 31.0654627,
      address: "90 WILLIAM CAMPBELL DRIVE LA LUCIA",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P112",
    property_code: "2481",
    name: "Lakeside Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.1898113,
      lng: 28.316671,
      address: "TOM JONES STREET BENONI GAUTENG",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P113",
    property_code: "2129",
    name: "Longbeach Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -34.125613,
      lng: 18.3825909,
      address: "C/O BULLER LOUW DRIVE & SUNNYDALE ROAD MILKWOOD PARK, NOORDHOEK",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P114",
    property_code: "3568",
    name: "Middestad Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.9054746,
      lng: 18.6294642,
      address: "16 - 24 CHARL MALAN STREET BELLVILLE",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P115",
    property_code: "2197",
    name: "N1 City Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.892181,
      lng: 18.56108,
      address: "LOUWTJIE ROTHMAN STREET GOODWOOD",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P116",
    property_code: "3786",
    name: "Paarl Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.7726425,
      lng: 18.9623433,
      address: "CECILIA STREET PAARL",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P117",
    property_code: "1841",
    name: "River Square",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.6620195,
      lng: 27.970164,
      address: "NILE DRIVE THREE RIVERS VEREENIGING",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P118",
    property_code: "2421",
    name: "The Constantia Village",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -34.0197701,
      lng: 18.4465113,
      address: "CNR CONSTANTIA MAIN & SPAANSCHEMAT ROADS CONSTANTIA",
      node: "n/a",
      region: "Western Cape"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P119",
    property_code: "7401",
    name: "Vaal Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.7075174,
      lng: 27.8244921,
      address: "CNR BARRAGE ROAD AND ROSSINI BOULEVARD VANDERBIJLPARK",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P120",
    property_code: "1998",
    name: "Walmer Park",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -33.9802494,
      lng: 25.5586924,
      address: "MAIN ROAD WALMER PARK",
      node: "n/a",
      region: "Port Elizabeth"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P121",
    property_code: "7403",
    name: "Watercrest Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -29.7483716,
      lng: 30.8134613,
      address: "141 INANDA ROAD WATERFALL",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P122",
    property_code: "1882",
    name: "Waterfall Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.2707593,
      lng: 28.1122679,
      address: "1 AUGRABIES AVENUE CASHAN EXT 12",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P123",
    property_code: "3700",
    name: "Westville Mall",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -29.8361701,
      lng: 30.9185025,
      address: "35 BUCKINGHAM TERRACE WESTVILLE DURBAN",
      node: "n/a",
      region: "KwaZulu-Natal"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  },
  {
    id: "P124",
    property_code: "1896",
    name: "Woodmead Retail Park",
    type: PropertyTypes.RETAIL,
    status: "Active",
    location: {
      lat: -26.0494952,
      lng: 28.0918139,
      address: "1 WATERVAL CRESCENT WOODMEAD EXT 40",
      node: "n/a",
      region: "Gauteng"
    },
    metrics: {
      value: 42115988,
      size: 35379.98,
      occupancyRate: 91,
      annualRevenue: 3599044,
      roi: 10.37,
      yieldRate: 8.55
    },
    financial: {
      currentValue: 42115988,
      acquisitionDate: "2018-08-25",
      acquisitionPrice: 33692790
    },
    tenant: {
      name: "Heather Rush",
      leaseExpiry: "2031-04-09"
    }
  }
];

// Calculate portfolio metrics
export const calculatePortfolioMetrics = (props: Property[]): PortfolioMetrics => {
  const activeProperties = props.filter(p => p.status === 'Active');
  
  return {
    totalValue: activeProperties.reduce((sum, p) => sum + p.metrics.value, 0),
    totalProperties: activeProperties.length,
    averageOccupancy: activeProperties.reduce((sum, p) => sum + p.metrics.occupancyRate, 0) / activeProperties.length,
    totalRevenue: activeProperties.reduce((sum, p) => sum + p.metrics.annualRevenue, 0),
    averageROI: activeProperties.reduce((sum, p) => sum + p.metrics.roi, 0) / activeProperties.length,
    totalSize: activeProperties.reduce((sum, p) => sum + p.metrics.size, 0),
  };
};

export const calculatePortfolioByType = (props: Property[]) => {
  const activeProperties = props.filter(p => p.status === 'Active');
  
  // Group properties by type and calculate totals
  const typeGroups = activeProperties.reduce((acc, property) => {
    const type = property.type;
    acc[type] ??= { value: 0, count: 0 };
    acc[type].value += property.metrics.value;
    acc[type].count += 1;
    return acc;
  }, {} as Record<string, { value: number; count: number }>);
  
  // Convert to array format expected by the chart
  return Object.entries(typeGroups).map(([type, data]) => ({
    type,
    value: data.value,
    count: data.count
  }));
};

export const calculateRegionalDistribution = (props: Property[]) => {
  const activeProperties = props.filter(p => p.status === 'Active');
  
  // Group properties by region and calculate totals
  const regionGroups = activeProperties.reduce((acc, property) => {
    const region = property.location.region;
    acc[region] ??= { value: 0, properties: 0 };
    acc[region].value += property.metrics.value;
    acc[region].properties += 1;
    return acc;
  }, {} as Record<string, { value: number; properties: number }>);
  
  // Convert to array format expected by the component
  return Object.entries(regionGroups).map(([region, data]) => ({
    region,
    value: data.value,
    properties: data.properties
  }));
};

// Recent transactions
export const recentTransactions: Transaction[] = [
  {
    id: 'T001',
    type: 'Disposal',
    propertyName: 'Pretoria CBD Office Complex',
    date: '2024-09-20',
    value: 95000000,
    profitLoss: -25000000,
  },
  {
    id: 'T002',
    type: 'Acquisition',
    propertyName: 'Rosebank Link Development',
    date: '2023-04-01',
    value: 420000000,
  },
  {
    id: 'T003',
    type: 'Acquisition',
    propertyName: 'East Rand Industrial Hub',
    date: '2020-02-15',
    value: 165000000,
  },
];

// Financial performance data for charts
export const monthlyPerformance = [
  { month: 'Apr', revenue: 28500000, expenses: 12200000, profit: 16300000 },
  { month: 'May', revenue: 29200000, expenses: 12800000, profit: 16400000 },
  { month: 'Jun', revenue: 30100000, expenses: 13100000, profit: 17000000 },
  { month: 'Jul', revenue: 29800000, expenses: 12900000, profit: 16900000 },
  { month: 'Aug', revenue: 31200000, expenses: 13500000, profit: 17700000 },
  { month: 'Sep', revenue: 32400000, expenses: 14000000, profit: 18400000 },
];

// Notification types
export type NotificationType = 'critical' | 'warning' | 'info' | 'success';
export type NotificationCategory = 'occupancy' | 'financial' | 'lease' | 'maintenance' | 'system' | 'transaction';

export interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  propertyId?: string;
  propertyName?: string;
  isRead: boolean;
  actionUrl?: string;
  roles: ('executive' | 'asset-manager' | 'finance' | 'employee')[];
}

// Mock notifications
export const notifications: Notification[] = [
  {
    id: 'N001',
    type: 'critical',
    category: 'occupancy',
    title: 'Critical Occupancy Drop',
    message: 'East Rand Industrial Hub occupancy dropped to 88% (below 90% threshold)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    propertyId: 'P005',
    propertyName: 'East Rand Industrial Hub',
    isRead: false,
    roles: ['executive', 'asset-manager'],
  },
  {
    id: 'N002',
    type: 'warning',
    category: 'lease',
    title: 'Lease Expiring Soon',
    message: 'Media24 Holdings lease at Century City Office Park expires in 18 months',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    propertyId: 'P004',
    propertyName: 'Century City Office Park',
    isRead: false,
    roles: ['executive', 'asset-manager'],
  },
  {
    id: 'N003',
    type: 'critical',
    category: 'financial',
    title: 'Budget Variance Alert',
    message: 'Q3 operational expenses 12% over budget across portfolio',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    isRead: false,
    roles: ['executive', 'finance'],
  },
  {
    id: 'N004',
    type: 'success',
    category: 'transaction',
    title: 'Acquisition Completed',
    message: 'Successfully completed acquisition of Rosebank Link Development',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    propertyId: 'P008',
    propertyName: 'Rosebank Link Development',
    isRead: true,
    roles: ['executive', 'finance', 'asset-manager'],
  },
  {
    id: 'N005',
    type: 'warning',
    category: 'maintenance',
    title: 'Scheduled Maintenance Required',
    message: 'Annual HVAC maintenance due for Sandton City Office Tower',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    propertyId: 'P001',
    propertyName: 'Sandton City Office Tower',
    isRead: false,
    roles: ['asset-manager', 'employee'],
  },
  {
    id: 'N006',
    type: 'info',
    category: 'financial',
    title: 'Monthly Report Available',
    message: 'September 2024 portfolio performance report is ready for review',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    isRead: true,
    roles: ['executive', 'finance', 'asset-manager'],
  },
  {
    id: 'N007',
    type: 'warning',
    category: 'occupancy',
    title: 'Tenant Vacancy Notice',
    message: 'Potential vacancy at Century City Office Park - tenant considering early termination',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    propertyId: 'P004',
    propertyName: 'Century City Office Park',
    isRead: false,
    roles: ['executive', 'asset-manager'],
  },
  {
    id: 'N008',
    type: 'info',
    category: 'system',
    title: 'System Update',
    message: 'Portfolio dashboard will undergo maintenance on Sunday 2:00 AM - 4:00 AM',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isRead: true,
    roles: ['executive', 'asset-manager', 'finance', 'employee'],
  },
  {
    id: 'N009',
    type: 'critical',
    category: 'financial',
    title: 'Disposal Loss Confirmed',
    message: 'Pretoria CBD Office Complex disposal resulted in R25M loss',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
    propertyId: 'P006',
    propertyName: 'Pretoria CBD Office Complex',
    isRead: true,
    roles: ['executive', 'finance'],
  },
  {
    id: 'N010',
    type: 'success',
    category: 'occupancy',
    title: 'Full Occupancy Achieved',
    message: 'Waterfall Logistics Park reached 100% occupancy with new tenant',
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), // 4 days ago
    propertyId: 'P003',
    propertyName: 'Waterfall Logistics Park',
    isRead: true,
    roles: ['executive', 'asset-manager'],
  },
];

// Mock tenants data
export const tenants: Tenant[] = [
  {
    id: 'T001',
    name: 'Amazon Logistics',
    industry: 'E-commerce & Logistics',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@amazon.com',
    phone: '+27 11 555 1234',
    properties: [
      {
        propertyId: 'P003',
        propertyName: 'Waterfall Logistics Park',
        propertyType: PropertyTypes.INDUSTRIAL,
        totalArea: 45000,
        leaseStart: '2019-07-01',
        leaseExpiry: '2029-07-31',
        monthlyRental: 2400000,
      },
    ],
    totalArea: 45000,
    totalMonthlyRental: 2400000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T002',
    name: 'Media24 Holdings',
    industry: 'Media & Publishing',
    contactPerson: 'David van der Merwe',
    email: 'david.vandermerwe@media24.com',
    phone: '+27 21 555 5678',
    properties: [
      {
        propertyId: 'P004',
        propertyName: 'Century City Office Park',
        propertyType: PropertyTypes.OFFICE,
        totalArea: 18000,
        leaseStart: '2017-06-01',
        leaseExpiry: '2026-05-31',
        monthlyRental: 2100000,
      },
    ],
    totalArea: 18000,
    totalMonthlyRental: 2100000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T003',
    name: 'Woolworths Holdings',
    industry: 'Retail',
    contactPerson: 'Lindiwe Ndlovu',
    email: 'lindiwe.ndlovu@woolworths.co.za',
    phone: '+27 21 555 9876',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: PropertyTypes.RETAIL,
        totalArea: 8500,
        leaseStart: '2015-12-01',
        leaseExpiry: '2026-12-31',
        monthlyRental: 1700000,
      },
      {
        propertyId: 'P007',
        propertyName: 'V&A Waterfront Retail Space',
        propertyType: PropertyTypes.RETAIL,
        totalArea: 3200,
        leaseStart: '2020-03-01',
        leaseExpiry: '2030-02-28',
        monthlyRental: 960000,
      },
    ],
    totalArea: 11700,
    totalMonthlyRental: 2660000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T004',
    name: 'Standard Bank',
    industry: 'Financial Services',
    contactPerson: 'Michael Botha',
    email: 'michael.botha@standardbank.co.za',
    phone: '+27 11 555 3456',
    properties: [
      {
        propertyId: 'P001',
        propertyName: 'Sandton City Office Tower',
        propertyType: PropertyTypes.OFFICE,
        totalArea: 12500,
        leaseStart: '2018-04-01',
        leaseExpiry: '2027-06-30',
        monthlyRental: 3125000,
      },
    ],
    totalArea: 12500,
    totalMonthlyRental: 3125000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T005',
    name: 'Pick n Pay',
    industry: 'Retail',
    contactPerson: 'Thandi Mkhize',
    email: 'thandi.mkhize@pnp.co.za',
    phone: '+27 31 555 7890',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: PropertyTypes.RETAIL,
        totalArea: 6800,
        leaseStart: '2016-01-15',
        leaseExpiry: '2026-01-14',
        monthlyRental: 1360000,
      },
    ],
    totalArea: 6800,
    totalMonthlyRental: 1360000,
    status: 'Expiring Soon',
    creditRating: 'Good',
    paymentHistory: 'On Time',
  },
  {
    id: 'T006',
    name: 'Deloitte South Africa',
    industry: 'Professional Services',
    contactPerson: 'James Patterson',
    email: 'jpatterson@deloitte.co.za',
    phone: '+27 11 555 2468',
    properties: [
      {
        propertyId: 'P001',
        propertyName: 'Sandton City Office Tower',
        propertyType: PropertyTypes.OFFICE,
        totalArea: 8200,
        leaseStart: '2019-09-01',
        leaseExpiry: '2027-06-30',
        monthlyRental: 2050000,
      },
    ],
    totalArea: 8200,
    totalMonthlyRental: 2050000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T007',
    name: 'Tiger Brands',
    industry: 'Manufacturing',
    contactPerson: 'Nomsa Dlamini',
    email: 'nomsa.dlamini@tigerbrands.com',
    phone: '+27 11 555 3698',
    properties: [
      {
        propertyId: 'P005',
        propertyName: 'East Rand Industrial Hub',
        propertyType: PropertyTypes.INDUSTRIAL,
        totalArea: 28000,
        leaseStart: '2016-08-01',
        leaseExpiry: '2025-07-31',
        monthlyRental: 1400000,
      },
    ],
    totalArea: 28000,
    totalMonthlyRental: 1400000,
    status: 'Expiring Soon',
    creditRating: 'Good',
    paymentHistory: 'Occasional Delays',
  },
  {
    id: 'T008',
    name: 'Mr Price Group',
    industry: 'Retail',
    contactPerson: 'Sanjeev Patel',
    email: 'sanjeev.patel@mrprice.com',
    phone: '+27 31 555 1597',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: PropertyTypes.RETAIL,
        totalArea: 4200,
        leaseStart: '2017-05-01',
        leaseExpiry: '2027-04-30',
        monthlyRental: 840000,
      },
    ],
    totalArea: 4200,
    totalMonthlyRental: 840000,
    status: 'Active',
    creditRating: 'Good',
    paymentHistory: 'On Time',
  },
  {
    id: 'T009',
    name: 'DHL Supply Chain',
    industry: 'Logistics',
    contactPerson: 'Werner Schmidt',
    email: 'werner.schmidt@dhl.com',
    phone: '+27 11 555 7531',
    properties: [
      {
        propertyId: 'P005',
        propertyName: 'East Rand Industrial Hub',
        propertyType: PropertyTypes.INDUSTRIAL,
        totalArea: 4000,
        leaseStart: '2021-03-01',
        leaseExpiry: '2026-02-28',
        monthlyRental: 200000,
      },
    ],
    totalArea: 4000,
    totalMonthlyRental: 200000,
    status: 'Active',
    creditRating: 'Excellent',
    paymentHistory: 'On Time',
  },
  {
    id: 'T010',
    name: 'Edgars Active',
    industry: 'Retail',
    contactPerson: 'Lisa van Niekerk',
    email: 'lisa.vanniekerk@edgars.co.za',
    phone: '+27 11 555 9513',
    properties: [
      {
        propertyId: 'P002',
        propertyName: 'Gateway Theatre of Shopping',
        propertyType: PropertyTypes.RETAIL,
        totalArea: 3800,
        leaseStart: '2015-11-20',
        leaseExpiry: '2025-11-19',
        monthlyRental: 760000,
      },
    ],
    totalArea: 3800,
    totalMonthlyRental: 760000,
    status: 'Expiring Soon',
    creditRating: 'Fair',
    paymentHistory: 'Occasional Delays',
  },
];

export const Properties: PropertyLocation[] = [
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

