'use client';

import { Building2, UserCheck } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { properties, tenants } from '@/lib/mockData';
import { usePortfolio } from './PortfolioProvider';

export function GlobalSearch() {
  const { openSearch, setOpenSearch, setSelectedProperty, setSidebarOpen } = usePortfolio();

  const handleSearchSelect = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setSidebarOpen(true);
      setOpenSearch(false);
    }
  };

  return (
    <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
      <CommandInput placeholder="Search properties, tenants, locations..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Properties">
          {properties.map((property) => (
            <CommandItem
              key={property.id}
              value={`${property.name} ${property.location.node} ${property.location.region} ${property.tenant?.name ?? ''}`}
              onSelect={() => handleSearchSelect(property.id)}
            >
              <Building2 className="w-4 h-4 mr-2" />
              <div className="flex-1">
                <p>{property.name}</p>
                <p className="text-xs text-muted-foreground">
                  {property.location.node}, {property.location.region}
                  {property.tenant && ` • ${property.tenant.name}`}
                </p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Tenants">
          {tenants.map((tenant) => (
            <CommandItem
              key={tenant.id}
              value={`${tenant.name} ${tenant.industry} ${tenant.properties.map(p => p.propertyName).join(' ')}`}
              onSelect={() => {
                const property = properties.find(p => p.id === tenant.properties[0]!.propertyId);
                if (property) {
                  handleSearchSelect(property.id);
                }
                setOpenSearch(false);
              }}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              <div className="flex-1">
                <p>{tenant.name}</p>
                <p className="text-xs text-muted-foreground">
                  {tenant.industry} • {tenant.properties.length} {tenant.properties.length === 1 ? 'property' : 'properties'}
                </p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

