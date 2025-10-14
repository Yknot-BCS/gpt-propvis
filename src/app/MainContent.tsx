'use client';

import dynamic from 'next/dynamic';
import { DashboardOverview } from '@/components/DashboardOverview';
import { FinancialMetrics } from '@/components/FinancialMetrics';
import { PropertyTable } from '@/components/PropertyTable';
import { TenantTable } from '@/components/TenantTable';
import { properties, tenants } from '@/lib/mockData';
import { usePortfolio } from './PortfolioProvider';
import { cn } from '@/lib/utils';

const MapView = dynamic(() => import('@/components/MapView').then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading map...</div>
});

export function MainContent() {
  const {
    currentView,
    selectedProperty,
    handlePropertySelect,
    setNotificationsOpen,
    handleNotificationClick,
    roleNotifications,
    selectedPropertyIds,
    setSelectedPropertyIds,
  } = usePortfolio();

  return (
    <main 
      className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        "mt-16 lg:mt-0"
      )}
    >
      <div className="container mx-auto p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="mb-2">
            {currentView === 'dashboard' && 'Portfolio Overview'}
            {currentView === 'properties' && 'All Properties'}
            {currentView === 'tenants' && 'Tenant Management'}
            {currentView === 'map' && 'Property Portfolio Map'}
            {currentView === 'financial' && 'Financial Performance'}
          </h1>
          <p className="text-muted-foreground">
            {currentView === 'dashboard' && 'Comprehensive view of your property portfolio performance and key metrics'}
            {currentView === 'properties' && 'Search and filter all properties with detailed statistics'}
            {currentView === 'tenants' && 'Browse and manage all tenants across the portfolio'}
            {currentView === 'map' && 'Interactive geospatial visualization of all Growthpoint properties'}
            {currentView === 'financial' && 'Detailed financial analysis, budget tracking, and forecasts'}
          </p>
        </div>

        {/* View Content */}
        {currentView === 'dashboard' && (
          <DashboardOverview 
            onPropertySelect={handlePropertySelect}
            notifications={roleNotifications}
            onViewAllNotifications={() => setNotificationsOpen(true)}
            onNotificationClick={handleNotificationClick}
          />
        )}
        {currentView === 'properties' && (
          <PropertyTable 
            onPropertySelect={handlePropertySelect}
            selectedPropertyIds={selectedPropertyIds}
            onSelectionChange={setSelectedPropertyIds}
          />
        )}
        {currentView === 'tenants' && (
          <TenantTable 
            tenants={tenants}
            onTenantSelect={(tenant) => {
              const property = properties.find(p => p.id === tenant.properties[0]?.propertyId);
              if (property) handlePropertySelect(property);
            }}
          />
        )}
        {currentView === 'map' && (
          <MapView 
            selectedProperty={selectedProperty} 
            onPropertySelect={(property) => {
              if (property) handlePropertySelect(property);
            }}
          />
        )}
        {currentView === 'financial' && <FinancialMetrics />}
      </div>
    </main>
  );
}

