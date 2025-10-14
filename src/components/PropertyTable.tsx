import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Building2 } from 'lucide-react';
import { properties } from '../lib/mockData';
import type { Property } from '../lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type SortField = 'name' | 'type' | 'value' | 'occupancy' | 'roi' | 'revenue' | 'region';
type SortDirection = 'asc' | 'desc';

interface PropertyTableProps {
  onPropertySelect?: (property: Property) => void;
  selectedPropertyIds?: string[];
  onSelectionChange?: (propertyIds: string[]) => void;
}

export function PropertyTable({ 
  onPropertySelect, 
  selectedPropertyIds = [],
  onSelectionChange 
}: PropertyTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Office' | 'Industrial' | 'Retail'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Under Development' | 'Disposed'>('all');
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompact = (value: number) => {
    if (value >= 1000000000) return `R${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `R${(value / 1000000).toFixed(1)}M`;
    return formatCurrency(value);
  };

  const handleToggleSelection = (propertyId: string) => {
    if (!onSelectionChange) return;
    
    const isSelected = selectedPropertyIds.includes(propertyId);
    const newSelection = isSelected
      ? selectedPropertyIds.filter(id => id !== propertyId)
      : [...selectedPropertyIds, propertyId];
    
    // Limit to 4 properties max
    if (newSelection.length <= 4) {
      onSelectionChange(newSelection);
    }
  };

  const handleToggleAll = () => {
    if (!onSelectionChange) return;
    
    if (selectedPropertyIds.length === sortedProperties.length && sortedProperties.length > 0) {
      onSelectionChange([]);
    } else {
      // Select up to 4 properties
      onSelectionChange(sortedProperties.slice(0, 4).map(p => p.id));
    }
  };

  // Filter and search properties
  const filteredProperties = useMemo(() => {
    let filtered = properties;

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property => {
        // Search in property name
        if (property.name.toLowerCase().includes(query)) return true;
        
        // Search in tenant name
        if (property.tenant?.name.toLowerCase().includes(query)) return true;
        
        // Search in location
        if (property.location.address.toLowerCase().includes(query)) return true;
        if (property.location.node.toLowerCase().includes(query)) return true;
        if (property.location.region.toLowerCase().includes(query)) return true;
        
        // Search in type
        if (property.type.toLowerCase().includes(query)) return true;
        
        // Search in status
        if (property.status.toLowerCase().includes(query)) return true;
        
        return false;
      });
    }

    return filtered;
  }, [searchQuery, typeFilter, statusFilter]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];
    
    sorted.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'value':
          aValue = a.metrics.value;
          bValue = b.metrics.value;
          break;
        case 'occupancy':
          aValue = a.metrics.occupancyRate;
          bValue = b.metrics.occupancyRate;
          break;
        case 'roi':
          aValue = a.metrics.roi;
          bValue = b.metrics.roi;
          break;
        case 'revenue':
          aValue = a.metrics.annualRevenue;
          bValue = b.metrics.annualRevenue;
          break;
        case 'region':
          aValue = a.location.region;
          bValue = b.location.region;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
    });

    return sorted;
  }, [filteredProperties, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1 opacity-30" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 ml-1" />
      : <ArrowDown className="w-4 h-4 ml-1" />;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by property, tenant, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Under Development">Under Development</SelectItem>
                  <SelectItem value="Disposed">Disposed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Found {sortedProperties.length} {sortedProperties.length === 1 ? 'property' : 'properties'}
              </p>
              {sortedProperties.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-2xl">{sortedProperties.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl">
                {formatCompact(sortedProperties.reduce((sum, p) => sum + p.metrics.value, 0))}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Occupancy</p>
              <p className="text-2xl">
                {sortedProperties.length > 0 
                  ? (sortedProperties.reduce((sum, p) => sum + p.metrics.occupancyRate, 0) / sortedProperties.length).toFixed(1)
                  : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg ROI</p>
              <p className="text-2xl">
                {sortedProperties.length > 0
                  ? (sortedProperties.reduce((sum, p) => sum + p.metrics.roi, 0) / sortedProperties.length).toFixed(1)
                  : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedProperties.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {onSelectionChange && (
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedPropertyIds.length === sortedProperties.length && sortedProperties.length > 0}
                          onCheckedChange={handleToggleAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                    )}
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-1 px-0 hover:bg-transparent"
                      >
                        Property
                        <SortIcon field="name" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('type')}
                        className="flex items-center gap-1 px-0 hover:bg-transparent"
                      >
                        Type
                        <SortIcon field="type" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('region')}
                        className="flex items-center gap-1 px-0 hover:bg-transparent"
                      >
                        Location
                        <SortIcon field="region" />
                      </Button>
                    </TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('value')}
                        className="flex items-center gap-1 px-0 hover:bg-transparent ml-auto"
                      >
                        Value
                        <SortIcon field="value" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Size (m²)</TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('occupancy')}
                        className="flex items-center gap-1 px-0 hover:bg-transparent ml-auto"
                      >
                        Occupancy
                        <SortIcon field="occupancy" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('roi')}
                        className="flex items-center gap-1 px-0 hover:bg-transparent ml-auto"
                      >
                        ROI
                        <SortIcon field="roi" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('revenue')}
                        className="flex items-center gap-1 px-0 hover:bg-transparent ml-auto"
                      >
                        Annual Revenue
                        <SortIcon field="revenue" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProperties.map((property) => (
                    <TableRow 
                      key={property.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => onPropertySelect?.(property)}
                    >
                      {onSelectionChange && (
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedPropertyIds.includes(property.id)}
                            onCheckedChange={() => handleToggleSelection(property.id)}
                            aria-label={`Select ${property.name}`}
                            disabled={!selectedPropertyIds.includes(property.id) && selectedPropertyIds.length >= 4}
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="space-y-1">
                          <p>{property.name}</p>
                          <p className="text-xs text-muted-foreground">{property.location.node}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{property.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{property.location.region}</p>
                          <p className="text-xs text-muted-foreground">{property.location.address}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {property.tenant ? (
                          <div className="space-y-1">
                            <p className="text-sm">{property.tenant.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Expires: {new Date(property.tenant.leaseExpiry).toLocaleDateString('en-ZA', { 
                                year: 'numeric', 
                                month: 'short' 
                              })}
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {property.metrics.value > 0 ? formatCompact(property.metrics.value) : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {property.metrics.size.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {property.metrics.occupancyRate > 0 ? (
                          <span className={
                            property.metrics.occupancyRate >= 95 ? 'text-green-600' :
                            property.metrics.occupancyRate >= 80 ? 'text-blue-600' :
                            'text-orange-600'
                          }>
                            {property.metrics.occupancyRate}%
                          </span>
                        ) : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {property.metrics.roi > 0 ? `${property.metrics.roi}%` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {property.metrics.annualRevenue > 0 ? formatCompact(property.metrics.annualRevenue) : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            property.status === 'Active' ? 'default' :
                            property.status === 'Under Development' ? 'secondary' :
                            'outline'
                          }
                          className={property.status === 'Under Development' ? 'bg-orange-500 text-white' : ''}
                        >
                          {property.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Building2 className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-muted-foreground">No properties found</p>
              {searchQuery && (
                <Button
                  variant="link"
                  onClick={() => setSearchQuery('')}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
