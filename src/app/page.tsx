'use client';

import { useState, useEffect } from 'react';
import { Building2, LayoutDashboard, MapIcon, TrendingUp, Users, Menu, List, UserCheck } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { DashboardOverview } from '@/components/DashboardOverview';
import { MapView } from '@/components/MapView';
import { FinancialMetrics } from '@/components/FinancialMetrics';
import { PropertyTable } from '@/components/PropertyTable';
import { TenantTable } from '@/components/TenantTable';
import { PropertySidebar } from '@/components/PropertySidebar';
import { TopNav } from '@/components/TopNav';
import { ChatDialog } from '@/components/ChatDialog';
import { MinimizedChat } from '@/components/MinimizedChat';
import { ComparisonToolbar } from '@/components/ComparisonToolbar';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { NotificationPanel } from '@/components/NotificationPanel';
import { NotificationDialog } from '@/components/NotificationDialog';
import { NotificationSettings } from '@/components/NotificationSettings';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import type { Property, Notification, Tenant } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { properties, tenants } from '@/lib/mockData';

type ViewType = 'dashboard' | 'map' | 'financial' | 'properties' | 'tenants';
type UserRole = 'executive' | 'asset-manager' | 'employee';

const initialNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'critical',
    category: 'lease',
    title: 'Critical Lease Expiration',
    message: 'Sandton City Office Tower - Major tenant lease expires in 30 days',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    propertyId: 'P001',
    propertyName: 'Sandton City Office Tower',
    isRead: false,
    roles: ['executive', 'asset-manager'],
  },
  {
    id: 'N002',
    type: 'warning',
    category: 'maintenance',
    title: 'Scheduled Maintenance',
    message: 'HVAC system maintenance scheduled for V&A Waterfront Retail Center',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    propertyId: 'P002',
    propertyName: 'V&A Waterfront Retail Center',
    isRead: false,
    roles: ['asset-manager', 'employee'],
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('executive');
  const [openSearch, setOpenSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationSettingsOpen, setNotificationSettingsOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Search: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpenSearch(true);
      }
      // AI Assistant: Cmd/Ctrl + /
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        if (chatMinimized) {
          setChatMinimized(false);
          setChatOpen(true);
        } else {
          setChatOpen(!chatOpen);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [chatOpen, chatMinimized]);

  // Simulate new notifications (in production, this would come from a WebSocket or polling)
  useEffect(() => {
    const simulatedNotifications: Notification[] = [
      {
        id: 'N_SIM_1',
        type: 'critical',
        category: 'lease',
        title: 'Lease Renewal Required',
        message: 'Multiple Corporate Tenants lease renewal decision needed within 30 days',
        timestamp: new Date().toISOString(),
        propertyId: 'P001',
        propertyName: 'Sandton City Office Tower',
        isRead: false,
        roles: ['executive', 'asset-manager'],
      },
    ];

    let notificationIndex = 0;

    const interval = setInterval(() => {
      if (notificationIndex < simulatedNotifications.length) {
        const newNotification = simulatedNotifications[notificationIndex]!;
        
        // Only add if it's for the current user role and notification dialog is not open
        if (newNotification.roles.includes(userRole) && !notificationsOpen) {
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show toast notification only if dialog is not open
          const getToastType = (type: string) => {
            switch (type) {
              case 'critical':
                return 'error';
              case 'warning':
                return 'warning';
              case 'success':
                return 'success';
              default:
                return 'info';
            }
          };

          const toastType = getToastType(newNotification.type);
          
          if (toastType === 'error') {
            toast.error(newNotification.title, {
              description: newNotification.message,
              action: newNotification.propertyId ? {
                label: 'View',
                onClick: () => {
                  const property = properties.find(p => p.id === newNotification.propertyId);
                  if (property) handlePropertySelect(property);
                },
              } : undefined,
            });
          } else if (toastType === 'warning') {
            toast.warning(newNotification.title, {
              description: newNotification.message,
            });
          } else if (toastType === 'success') {
            toast.success(newNotification.title, {
              description: newNotification.message,
            });
          } else {
            toast.info(newNotification.title, {
              description: newNotification.message,
            });
          }
        }
        
        notificationIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20000); // New notification every 20 seconds

    return () => clearInterval(interval);
  }, [userRole, notificationsOpen]);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'executive': return 'Executive View';
      case 'asset-manager': return 'Asset Manager View';
      case 'employee': return 'Employee View';
    }
  };

  const getAvailableViews = (role: UserRole) => {
    switch (role) {
      case 'executive':
        return ['dashboard', 'properties', 'tenants', 'map', 'financial'];
      case 'asset-manager':
        return ['dashboard', 'properties', 'tenants', 'map', 'financial'];
      case 'employee':
        return ['map'];
      default:
        return ['dashboard'];
    }
  };

  const handleSearchSelect = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      setSidebarOpen(true);
      setOpenSearch(false);
    }
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    // Don't clear selected property immediately to allow for smooth transition
    setTimeout(() => {
      if (!sidebarOpen) {
        setSelectedProperty(null);
      }
    }, 300);
  };

  const handleTogglePin = () => {
    setSidebarPinned(!sidebarPinned);
  };

  const handleChatMinimize = () => {
    setChatOpen(false);
    setChatMinimized(true);
  };

  const handleChatMaximize = () => {
    setChatMinimized(false);
    setChatOpen(true);
  };

  const handleCompare = () => {
    setComparisonOpen(true);
  };

  const handleClearComparison = () => {
    setSelectedPropertyIds([]);
  };

  const handleRemoveFromComparison = (propertyId: string) => {
    setSelectedPropertyIds(prev => prev.filter(id => id !== propertyId));
  };

  const selectedProperties = properties.filter(p => selectedPropertyIds.includes(p.id));

  const availableViews = getAvailableViews(userRole);

  // Filter notifications based on user role
  const roleNotifications = notifications.filter(n => n.roles.includes(userRole));
  const unreadCount = roleNotifications.filter(n => !n.isRead).length;

  // Notification handlers
  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => n.roles.includes(userRole) ? { ...n, isRead: true } : n)
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications(prev =>
      prev.filter(n => !n.roles.includes(userRole) || n.isRead)
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.propertyId) {
      const property = properties.find(p => p.id === notification.propertyId);
      if (property) {
        handlePropertySelect(property);
        setNotificationsOpen(false);
      }
    }
  };

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
            // Reset to first available view for new role
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
    <div className="flex h-screen bg-background overflow-hidden">
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav
          onSearchClick={() => setOpenSearch(true)}
          onAIAssistantClick={() => setChatOpen(true)}
          onNotificationsClick={() => setNotificationsOpen(true)}
          selectedPropertyName={selectedProperty?.name}
          unreadNotificationsCount={unreadCount}
        />

        {/* Content + Sidebar Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Content Area */}
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
                    // Find the first property for this tenant and select it
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

          {/* Property Details Sidebar - Docked when pinned */}
          {sidebarPinned && (
            <PropertySidebar
              property={selectedProperty}
              isOpen={sidebarOpen}
              isPinned={sidebarPinned}
              onClose={handleSidebarClose}
              onTogglePin={handleTogglePin}
              onClickOutside={handleSidebarClose}
              onAskAI={() => setChatOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Property Details Sidebar - Overlay when not pinned */}
      {!sidebarPinned && (
        <PropertySidebar
          property={selectedProperty}
          isOpen={sidebarOpen}
          isPinned={sidebarPinned}
          onClose={handleSidebarClose}
          onTogglePin={handleTogglePin}
          onClickOutside={handleSidebarClose}
          onAskAI={() => setChatOpen(true)}
        />
      )}

      {/* Global Search Command Dialog */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search properties, tenants, locations..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Properties">
            {properties.map((property) => (
              <CommandItem
                key={property.id}
                value={`${property.name} ${property.location.node} ${property.location.region} ${property.tenant?.name || ''}`}
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

      {/* AI Chat Assistant */}
      <ChatDialog
        open={chatOpen}
        onOpenChange={setChatOpen}
        userRole={userRole}
        currentView={currentView === 'tenants' ? 'properties' : currentView}
        selectedProperty={selectedProperty}
        onPropertySelect={handlePropertySelect}
        onViewChange={(view) => setCurrentView(view as ViewType)}
        onMinimize={handleChatMinimize}
      />

      {/* Minimized Chat Floating Button */}
      {chatMinimized && !chatOpen && (
        <MinimizedChat onMaximize={handleChatMaximize} />
      )}

      {/* Comparison Toolbar */}
      <ComparisonToolbar
        selectedProperties={selectedProperties}
        onCompare={handleCompare}
        onClear={handleClearComparison}
        onRemove={handleRemoveFromComparison}
      />

      {/* Comparison Panel */}
      <ComparisonPanel
        properties={selectedProperties}
        open={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        userRole={userRole}
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" className="lg:!top-20 !top-24" />

      {/* Notification Dialog */}
      <NotificationDialog
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      >
        <NotificationPanel
          notifications={roleNotifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAllNotifications}
          onNotificationClick={handleNotificationClick}
          onSettingsClick={() => {
            setNotificationsOpen(false);
            setNotificationSettingsOpen(true);
          }}
        />
      </NotificationDialog>

      {/* Notification Settings */}
      <NotificationSettings
        open={notificationSettingsOpen}
        onOpenChange={setNotificationSettingsOpen}
      />
    </div>
  );
}
