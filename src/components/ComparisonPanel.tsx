'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  X, 
  Download, 
  TrendingUp, 
  Building2,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';
import type { Property } from '../lib/data';
import { cn } from '@/lib/utils';

interface ComparisonPanelProps {
  properties: Property[];
  open: boolean;
  onClose: () => void;
  userRole: 'executive' | 'asset-manager' | 'employee' | 'finance';
}

export function ComparisonPanel({ properties, open, onClose, userRole }: ComparisonPanelProps) {
  if (!open || properties.length < 2) return null;

  const hasFinancialAccess = userRole === 'executive' || userRole === 'finance';

  // Helper to find best/worst values
  const getBestValue = (values: (number | undefined)[], higher = true) => {
    const validValues = values.filter((v): v is number => v !== undefined);
    if (validValues.length === 0) return undefined;
    return higher ? Math.max(...validValues) : Math.min(...validValues);
  };

  const getValueIndicator = (value: number | undefined, best: number | undefined, _higher = true) => {
    if (value === undefined || best === undefined) return null;
    const isBest = value === best;
    if (isBest) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    }
    return null;
  };

  // Calculate comparisons
  const occupancyRates = properties.map(p => p.metrics.occupancyRate);
  const bestOccupancy = getBestValue(occupancyRates, true);

  const revenues = properties.map(p => p.metrics.annualRevenue);
  const highestRevenue = getBestValue(revenues, true);

  const yields = properties.map(p => p.metrics.yieldRate);
  const bestYield = getBestValue(yields, true);

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting comparison report...', properties);
    alert('Export feature would generate a PDF/Excel report with this comparison');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Property Comparison
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Comparing {properties.length} properties side-by-side
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              <div className="space-y-8">
                {/* Property Headers */}
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                  <div /> {/* Empty cell for row labels */}
                  {properties.map((property) => (
                    <div key={property.id} className="bg-muted/50 rounded-xl p-4 border">
                      <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-1">{property.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {property.location.node}
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {property.type}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Basic Information */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    {/* Location */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        Location
                      </div>
                      {properties.map((property) => (
                        <div key={property.id} className="bg-muted/30 rounded-lg p-3">
                          <p className="text-sm">{property.location.node}, {property.location.region}</p>
                        </div>
                      ))}
                    </div>

                    {/* Size */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        Total Size
                      </div>
                      {properties.map((property) => (
                        <div key={property.id} className="bg-muted/30 rounded-lg p-3">
                          <p className="text-sm">{property.metrics.size.toLocaleString()} sqm</p>
                        </div>
                      ))}
                    </div>

                    {/* Property Type */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        Property Type
                      </div>
                      {properties.map((property) => (
                        <div key={property.id} className="bg-muted/30 rounded-lg p-3">
                          <Badge variant="secondary">{property.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tenancy Information */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Tenancy & Occupancy
                  </h3>
                  <div className="space-y-3">
                    {/* Tenant */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        Current Tenant
                      </div>
                      {properties.map((property) => (
                        <div key={property.id} className="bg-muted/30 rounded-lg p-3">
                          <p className="text-sm">{property.tenant?.name ?? 'Vacant'}</p>
                        </div>
                      ))}
                    </div>

                    {/* Occupancy Rate */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        Occupancy Rate
                      </div>
                      {properties.map((property, index) => {
                        const value = occupancyRates[index];
                        const isBest = value === bestOccupancy;
                        return (
                          <div 
                            key={property.id} 
                            className={cn(
                              "rounded-lg p-3 flex items-center justify-between",
                              isBest ? "bg-green-500/10 border border-green-500/20" : "bg-muted/30"
                            )}
                          >
                            <p className="text-sm">{value !== undefined ? `${value}%` : 'N/A'}</p>
                            {getValueIndicator(value, bestOccupancy, true)}
                          </div>
                        );
                      })}
                    </div>

                    {/* Lease Expiry */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        Lease Expiry
                      </div>
                      {properties.map((property) => (
                        <div key={property.id} className="bg-muted/30 rounded-lg p-3">
                          <p className="text-sm">{property.tenant?.leaseExpiry ?? 'N/A'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                {hasFinancialAccess && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="mb-4 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Financial Performance
                      </h3>
                      <div className="space-y-3">
                        {/* Annual Revenue */}
                        <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                          <div className="flex items-center text-sm font-medium text-muted-foreground">
                            Annual Revenue
                          </div>
                          {properties.map((property, index) => {
                            const value = revenues[index];
                            const isBest = value === highestRevenue;
                            return (
                              <div 
                                key={property.id}
                                className={cn(
                                  "rounded-lg p-3 flex items-center justify-between",
                                  isBest ? "bg-green-500/10 border border-green-500/20" : "bg-muted/30"
                                )}
                              >
                                <p className="text-sm">
                                  {value !== undefined ? `R ${value.toLocaleString()}` : 'N/A'}
                                </p>
                                {getValueIndicator(value, highestRevenue, true)}
                              </div>
                            );
                          })}
                        </div>

                        {/* Property Value */}
                        <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                          <div className="flex items-center text-sm font-medium text-muted-foreground">
                            Property Value
                          </div>
                          {properties.map((property) => (
                            <div key={property.id} className="bg-muted/30 rounded-lg p-3">
                              <p className="text-sm">
                                {property.financial?.currentValue 
                                  ? `R ${property.financial.currentValue.toLocaleString()}` 
                                  : 'N/A'}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Net Yield */}
                        <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                          <div className="flex items-center text-sm font-medium text-muted-foreground">
                            Net Yield
                          </div>
                          {properties.map((property, index) => {
                            const value = yields[index];
                            const isBest = value === bestYield;
                            return (
                              <div 
                                key={property.id}
                                className={cn(
                                  "rounded-lg p-3 flex items-center justify-between",
                                  isBest ? "bg-green-500/10 border border-green-500/20" : "bg-muted/30"
                                )}
                              >
                                <p className="text-sm">{value !== undefined ? `${value}%` : 'N/A'}</p>
                                {getValueIndicator(value, bestYield, true)}
                              </div>
                            );
                          })}
                        </div>

                        {/* ROI */}
                        <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
                          <div className="flex items-center text-sm font-medium text-muted-foreground">
                            Return on Investment
                          </div>
                          {properties.map((property) => (
                            <div key={property.id} className="bg-muted/30 rounded-lg p-3">
                              <p className="text-sm">{property.metrics.roi}%</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!hasFinancialAccess && (
                  <div className="bg-muted/50 border rounded-xl p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Financial data access is restricted to Executive and Finance team members.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-muted/30 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Green highlights indicate best values in each category</span>
                </div>
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close Comparison
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
