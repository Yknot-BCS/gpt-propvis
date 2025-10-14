import type { Property } from '../lib/mockData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, 
  Building2, 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign,
  Square,
  Percent,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyDetailViewProps {
  property: Property;
  onClose?: () => void;
}

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
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

  // Get property image based on type
  const getPropertyImage = (type: string) => {
    switch (type) {
      case 'Office':
        return 'https://images.unsplash.com/photo-1560922604-d08a31f8f7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDA1ODc4M3ww&ixlib=rb-4.1.0&q=80&w=1080';
      case 'Retail':
        return 'https://images.unsplash.com/photo-1595879171931-4ca27febc4bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hbGwlMjByZXRhaWwlMjBjZW50ZXJ8ZW58MXx8fHwxNzYwMDg5MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080';
      case 'Industrial':
        return 'https://images.unsplash.com/photo-1669003153363-6d7ba8e20c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlJTIwbG9naXN0aWNzfGVufDF8fHx8MTc2MDAxMDY4OHww&ixlib=rb-4.1.0&q=80&w=1080';
      default:
        return 'https://images.unsplash.com/photo-1709015207441-4c148b5c5928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwcHJvcGVydHklMjBza3lsaW5lfGVufDF8fHx8MTc2MDA4OTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080';
    }
  };

  return (
    <div className="h-full overflow-auto">
      {/* Property Image Hero */}
      <div className="relative w-full h-64 lg:h-80 overflow-hidden">
        <ImageWithFallback
          src={getPropertyImage(property.type)}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {property.type}
            </Badge>
            <Badge 
              variant={property.status === 'Active' ? 'default' : 'secondary'}
              className={property.status === 'Active' ? 'bg-green-500' : property.status === 'Under Development' ? 'bg-orange-500' : ''}
            >
              {property.status}
            </Badge>
          </div>
          <h1 className="mb-2 text-white">{property.name}</h1>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span>{property.location.node}, {property.location.region}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Property Value</p>
                  <p className="text-xl">{formatCompact(property.metrics.value)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Percent className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Occupancy</p>
                  <p className="text-xl">{property.metrics.occupancyRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-xl">{property.metrics.roi}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Square className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="text-xl">{property.metrics.size.toLocaleString()} m²</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="tenancy">Tenancy</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Full Address</p>
                      <p>{property.location.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Node</p>
                      <p>{property.location.node}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Region</p>
                      <p>{property.location.region}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Property Type</p>
                      <p>{property.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <p>{property.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Gross Lettable Area</p>
                      <p>{property.metrics.size.toLocaleString()} m²</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Annual Revenue</p>
                    <p className="text-2xl">{formatCurrency(property.metrics.annualRevenue)}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Yield Rate</p>
                    <p className="text-2xl">{property.metrics.yieldRate}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Return on Investment</p>
                    <p className="text-2xl text-green-600">{property.metrics.roi}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.financial.acquisitionDate && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Acquisition Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p>{new Date(property.financial.acquisitionDate).toLocaleDateString('en-ZA', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                  )}
                  {property.financial.acquisitionPrice && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Acquisition Price</p>
                      <p className="text-xl">{formatCurrency(property.financial.acquisitionPrice)}</p>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Valuation</p>
                    <p className="text-2xl">{formatCurrency(property.financial.currentValue)}</p>
                  </div>
                  {property.financial.acquisitionPrice && property.financial.currentValue > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Value Appreciation</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-2xl text-green-600">
                            {formatCurrency(property.financial.currentValue - property.financial.acquisitionPrice)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            +{(((property.financial.currentValue - property.financial.acquisitionPrice) / property.financial.acquisitionPrice) * 100).toFixed(1)}% increase
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {property.financial.disposalDate && (
                  <>
                    <Separator />
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="mb-4">Disposal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Disposal Date</p>
                          <p>{new Date(property.financial.disposalDate).toLocaleDateString('en-ZA')}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Disposal Price</p>
                          <p>{property.financial.disposalPrice ? formatCurrency(property.financial.disposalPrice) : '-'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Profit/Loss</p>
                          <p className={property.financial.profitLoss && property.financial.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {property.financial.profitLoss ? formatCurrency(property.financial.profitLoss) : '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue & Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Revenue</p>
                      <p className="text-xl">{formatCurrency(property.metrics.annualRevenue)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Revenue per m²</p>
                    <p className="text-xl">
                      {formatCurrency(property.metrics.annualRevenue / property.metrics.size)} / m²
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tenancy Tab */}
          <TabsContent value="tenancy" className="space-y-6">
            {property.tenant ? (
              <Card>
                <CardHeader>
                  <CardTitle>Current Tenancy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{property.tenant.name}</h3>
                      <p className="text-sm text-muted-foreground">Primary Tenant</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Lease Expiry Date</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p>{new Date(property.tenant.leaseExpiry).toLocaleDateString('en-ZA', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Time Remaining</p>
                      <p>
                        {Math.ceil((new Date(property.tenant.leaseExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Occupancy Rate</p>
                        <p className="text-2xl">{property.metrics.occupancyRate}%</p>
                      </div>
                      <div className={`text-sm px-3 py-1 rounded-full ${
                        property.metrics.occupancyRate >= 95 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                          : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                      }`}>
                        {property.metrics.occupancyRate >= 95 ? 'Excellent' : 'Good'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">No tenant information available</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>Map View</p>
                    <p className="text-sm">Lat: {property.location.lat}, Lng: {property.location.lng}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View on Google Maps
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
