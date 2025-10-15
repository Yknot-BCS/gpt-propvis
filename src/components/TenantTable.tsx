'use client';
import { useState } from 'react';
import { Building2, Search, Mail, Phone, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { Tenant } from '../lib/data';

interface TenantTableProps {
  tenants: Tenant[];
  onTenantSelect?: (tenant: Tenant) => void;
}

export function TenantTable({ tenants, onTenantSelect }: TenantTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rental' | 'area' | 'expiry'>('name');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatArea = (sqm: number) => {
    return new Intl.NumberFormat('en-ZA').format(sqm) + ' m²';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getEarliestLeaseExpiry = (tenant: Tenant) => {
    const dates = tenant.properties.map(p => new Date(p.leaseExpiry));
    return new Date(Math.min(...dates.map(d => d.getTime())));
  };

  const getDaysUntilExpiry = (tenant: Tenant) => {
    const earliestExpiry = getEarliestLeaseExpiry(tenant);
    const today = new Date();
    const diffTime = earliestExpiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Expiring Soon':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Expiring Soon</Badge>;
      case 'Expired':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCreditRatingBadge = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return (
          <Badge variant="outline" className="border-green-300 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Excellent
          </Badge>
        );
      case 'Good':
        return (
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Good
          </Badge>
        );
      case 'Fair':
        return (
          <Badge variant="outline" className="border-amber-300 text-amber-700">
            <Clock className="w-3 h-3 mr-1" />
            Fair
          </Badge>
        );
      case 'Poor':
        return (
          <Badge variant="outline" className="border-red-300 text-red-700">
            <AlertCircle className="w-3 h-3 mr-1" />
            Poor
          </Badge>
        );
      default:
        return <Badge variant="outline">{rating}</Badge>;
    }
  };

  const getPaymentHistoryBadge = (history: string) => {
    switch (history) {
      case 'On Time':
        return <Badge variant="outline" className="border-green-300 text-green-700">On Time</Badge>;
      case 'Occasional Delays':
        return <Badge variant="outline" className="border-amber-300 text-amber-700">Occasional Delays</Badge>;
      case 'Frequent Delays':
        return <Badge variant="outline" className="border-red-300 text-red-700">Frequent Delays</Badge>;
      default:
        return <Badge variant="outline">{history}</Badge>;
    }
  };

  // Get unique industries for filter
  const industries = Array.from(new Set(tenants.map(t => t.industry))).sort();

  // Filter and sort tenants
  const filteredTenants = tenants
    .filter(tenant => {
      const matchesSearch = 
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.properties.some(p => p.propertyName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
      const matchesIndustry = industryFilter === 'all' || tenant.industry === industryFilter;

      return matchesSearch && matchesStatus && matchesIndustry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rental':
          return b.totalMonthlyRental - a.totalMonthlyRental;
        case 'area':
          return b.totalArea - a.totalArea;
        case 'expiry':
          return getDaysUntilExpiry(a) - getDaysUntilExpiry(b);
        default:
          return 0;
      }
    });

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'Active').length;
  const expiringTenants = tenants.filter(t => t.status === 'Expiring Soon').length;
  const totalMonthlyRental = tenants.reduce((sum, t) => sum + t.totalMonthlyRental, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tenants</p>
                <h3 className="mt-1">{totalTenants}</h3>
              </div>
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Tenants</p>
                <h3 className="mt-1">{activeTenants}</h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <h3 className="mt-1">{expiringTenants}</h3>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rental</p>
                <h3 className="mt-1">{formatCurrency(totalMonthlyRental / 1000000)}M</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants, properties, contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'name' | 'rental' | 'area' | 'expiry')}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rental">Monthly Rental</SelectItem>
                <SelectItem value="area">Total Area</SelectItem>
                <SelectItem value="expiry">Lease Expiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tenants Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead className="text-right">Total Area</TableHead>
                  <TableHead className="text-right">Monthly Rental</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credit Rating</TableHead>
                  <TableHead>Payment History</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      No tenants found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p>{tenant.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {tenant.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {tenant.phone}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{tenant.industry}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {tenant.properties.map((prop, idx) => (
                            <div key={idx} className="text-sm">
                              <p>{prop.propertyName}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Expires: {formatDate(prop.leaseExpiry)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{formatArea(tenant.totalArea)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(tenant.totalMonthlyRental)}</TableCell>
                      <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                      <TableCell>{getCreditRatingBadge(tenant.creditRating)}</TableCell>
                      <TableCell>{getPaymentHistoryBadge(tenant.paymentHistory)}</TableCell>
                      <TableCell>
                        {onTenantSelect && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onTenantSelect(tenant)}
                          >
                            View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredTenants.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredTenants.length} of {totalTenants} tenants
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
