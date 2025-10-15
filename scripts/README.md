# Property Data Population Scripts

This directory contains scripts to populate the `data.ts` file with transformed property data from the JSON file.

## Scripts

### 1. `populate-data.ts` (TypeScript)
A TypeScript script that reads the JSON data from `src/app/geocode/property_data.json` and transforms it into the Property interface format, then updates the `src/lib/data.ts` file.

### 2. `populate-data.js` (JavaScript)
A JavaScript version of the same script for environments that don't support TypeScript execution.

## Usage

### Using TypeScript (Recommended)
```bash
# Install tsx if you haven't already
npm install -g tsx

# Run the script
tsx scripts/populate-data.ts
```

### Using JavaScript
```bash
node scripts/populate-data.js
```

### Using npm script (if added to package.json)
```bash
npm run populate-data
```

## What the script does

1. **Reads JSON data**: Loads the property data from `src/app/geocode/property_data.json`
2. **Transforms data**: Converts the JSON structure to match the Property interface:
   - Maps basic property information (id, name, type, status, location)
   - Generates realistic financial metrics (value, size, occupancy, revenue, ROI, yield)
   - Creates acquisition dates and lease expiry dates
   - Maps leasing consultant information to tenant data
3. **Updates data.ts**: Replaces the existing properties array in `src/lib/data.ts` with the transformed data
4. **Provides statistics**: Shows summary information about the transformed data

## Generated Data

The script generates realistic mock financial data based on:
- **Property type**: Office (1.0x), Industrial (0.6x), Retail (1.2x) multipliers
- **Region**: Gauteng (1.0x), Western Cape (0.9x), KwaZulu-Natal (0.7x), etc.
- **Random variations**: 80-120% of base values for realistic distribution

## Output Example

```
Loading JSON data...
Found 99 properties in JSON data
Transformed 99 properties
Successfully updated data.ts with transformed properties!
Total properties: 99
Property types: Office: 67, Industrial: 32, Retail: 0
Total portfolio value: R2,847M
```

## File Structure

```
scripts/
├── populate-data.ts    # TypeScript version
├── populate-data.js    # JavaScript version
└── README.md          # This file

src/
├── app/geocode/
│   └── property_data.json  # Source JSON data
└── lib/
    └── data.ts            # Target file to update
```
