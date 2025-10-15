'use client';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, Building2, DollarSign, Percent, ArrowRight, MapPin } from 'lucide-react';
import { properties, calculatePortfolioMetrics, calculatePortfolioByType, calculateRegionalDistribution, monthlyPerformance } from '../lib/data';
import type { Property, Notification } from '../lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Badge } from './ui/badge';
import { AlertsSummary } from './AlertsSummary';

// Dynamically import CompactMapView to avoid SSR issues with Leaflet
const CompactMapView = dynamic(() => import('./CompactMapView').then(mod => ({ default: mod.CompactMapView })), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64">Loading map...</div>
});

interface DashboardOverviewProps {
  onPropertySelect?: (property: Property) => void;
  notifications?: Notification[];
  onViewAllNotifications?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

export function DashboardOverview({ 
  onPropertySelect,
  notifications = [],
  onViewAllNotifications,
  onNotificationClick,
}: DashboardOverviewProps) {
  const portfolioMetrics = calculatePortfolioMetrics(properties);
  const portfolioByType = calculatePortfolioByType(properties);
  const regionalDistribution = calculateRegionalDistribution(properties);

  // Find specific properties for the insight cards
  const topPerformer = properties.find(p => p.name === 'Gateway Theatre of Shopping');
  const highestOccupancy = properties.find(p => p.name === 'Waterfall Logistics Park');
  const developmentProperty = properties.find(p => p.name === 'Rosebank Link Development');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompact = (value: number) => {
    if (value >= 1000000000) return `R${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `R${(value / 1000000).toFixed(1)}M`;
    return formatCurrency(value);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Portfolio Value</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{formatCompact(portfolioMetrics.totalValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+12.5%</span> from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Properties</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{portfolioMetrics.totalProperties}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {portfolioMetrics.totalSize.toLocaleString()} m² total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Average Occupancy</CardTitle>
            <Percent className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{portfolioMetrics.averageOccupancy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+2.3%</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Annual Revenue</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{formatCompact(portfolioMetrics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average ROI: {portfolioMetrics.averageROI.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `R${(value / 1000000).toFixed(0)}M`} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts Summary */}
        {notifications && onViewAllNotifications && (
          <AlertsSummary
            notifications={notifications}
            onViewAll={onViewAllNotifications}
            onNotificationClick={onNotificationClick}
          />
        )}
      </div>

      {/* Portfolio Distribution and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio by Asset Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Portfolio Map Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CompactMapView 
              onPropertySelect={onPropertySelect}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Regional Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalDistribution.map((region, index) => {
              const percentage = (region.value / portfolioMetrics.totalValue) * 100;
              return (
                <div key={region.region} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{region.region}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{region.properties} properties</Badge>
                      <span className="text-sm text-muted-foreground">{formatCompact(region.value)}</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topPerformer && (
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow group"
            onClick={() => onPropertySelect?.(topPerformer)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Top Performer
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="group-hover:text-primary transition-colors">{topPerformer.name}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{topPerformer.type}</Badge>
                  <Badge variant="outline">{topPerformer.location.node}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ROI: {topPerformer.metrics.roi}% | Occupancy: {topPerformer.metrics.occupancyRate}%
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {highestOccupancy && (
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow group"
            onClick={() => onPropertySelect?.(highestOccupancy)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Highest Occupancy
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="group-hover:text-primary transition-colors">{highestOccupancy.name}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{highestOccupancy.type}</Badge>
                  <Badge variant="outline">{highestOccupancy.location.node}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Occupancy: {highestOccupancy.metrics.occupancyRate}% | Long-term lease
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {developmentProperty && (
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow group"
            onClick={() => onPropertySelect?.(developmentProperty)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Development Pipeline
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="group-hover:text-primary transition-colors">{developmentProperty.name}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{developmentProperty.type}</Badge>
                  <Badge className="bg-orange-500">Under Development</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Expected completion: Q2 2026</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
