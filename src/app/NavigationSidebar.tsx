'use client';

import { Building2, LayoutDashboard, MapIcon, TrendingUp, Users, Menu, List, UserCheck } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { usePortfolio } from './PortfolioProvider';

type ViewType = 'dashboard' | 'map' | 'financial' | 'properties' | 'tenants';
type UserRole = 'executive' | 'asset-manager' | 'employee';

export function NavigationSidebar() {
  const { currentView, setCurrentView, userRole, setUserRole, getRoleLabel, getAvailableViews } = usePortfolio();
  const availableViews = getAvailableViews(userRole);

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2>Growthpoint</h2>
            <p className="text-sm text-muted-foreground">Portfolio Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {availableViews.includes('dashboard') && (
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('dashboard')}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        )}

        {availableViews.includes('properties') && (
          <Button
            variant={currentView === 'properties' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('properties')}
          >
            <List className="w-4 h-4 mr-2" />
            All Properties
          </Button>
        )}

        {availableViews.includes('tenants') && (
          <Button
            variant={currentView === 'tenants' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('tenants')}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Tenants
          </Button>
        )}

        {availableViews.includes('map') && (
          <Button
            variant={currentView === 'map' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('map')}
          >
            <MapIcon className="w-4 h-4 mr-2" />
            Portfolio Map
          </Button>
        )}

        {availableViews.includes('financial') && (
          <Button
            variant={currentView === 'financial' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setCurrentView('financial')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Financial Metrics
          </Button>
        )}
      </nav>

      <div className="p-4 border-t">
        <div className="space-y-2 p-2">
          <Select value={userRole} onValueChange={(value: string) => {
            setUserRole(value as UserRole);
            const views = getAvailableViews(value as UserRole);
            if (!views.includes(currentView)) {
              setCurrentView(views[0] as ViewType);
            }
          }}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm truncate">{getRoleLabel(userRole)}</p>
                  <p className="text-xs text-muted-foreground">
                    {userRole === 'executive' ? 'Full Access' : 
                     userRole === 'asset-manager' ? 'Full Access' : 'Map View Only'}
                  </p>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="executive">
                <div className="flex flex-col items-start">
                  <span>Executive</span>
                  <span className="text-xs text-muted-foreground">Full Access</span>
                </div>
              </SelectItem>
              <SelectItem value="asset-manager">
                <div className="flex flex-col items-start">
                  <span>Asset Manager</span>
                  <span className="text-xs text-muted-foreground">Full Access</span>
                </div>
              </SelectItem>
              <SelectItem value="employee">
                <div className="flex flex-col items-start">
                  <span>Employee</span>
                  <span className="text-xs text-muted-foreground">Map View Only</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 border-r bg-card flex-shrink-0">
        <NavigationContent />
      </aside>

      {/* Mobile Navigation Sheet */}
      <Sheet>
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              <h2>Growthpoint</h2>
            </div>
            <SheetTrigger asChild>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent side="left" className="w-80 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate between different sections of the portfolio management system
          </SheetDescription>
          <NavigationContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

