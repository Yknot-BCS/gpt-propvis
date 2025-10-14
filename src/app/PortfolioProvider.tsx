'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { toast } from 'sonner';
import type { Property, Notification } from '@/lib/mockData';
import { properties } from '@/lib/mockData';

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

interface PortfolioContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarPinned: boolean;
  setSidebarPinned: (pinned: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMinimized: boolean;
  setChatMinimized: (minimized: boolean) => void;
  selectedPropertyIds: string[];
  setSelectedPropertyIds: (ids: string[]) => void;
  comparisonOpen: boolean;
  setComparisonOpen: (open: boolean) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[] | ((prev: Notification[]) => Notification[])) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  notificationSettingsOpen: boolean;
  setNotificationSettingsOpen: (open: boolean) => void;
  handlePropertySelect: (property: Property) => void;
  handleSidebarClose: () => void;
  handleTogglePin: () => void;
  handleChatMinimize: () => void;
  handleChatMaximize: () => void;
  handleCompare: () => void;
  handleClearComparison: () => void;
  handleRemoveFromComparison: (propertyId: string) => void;
  handleMarkAsRead: (notificationId: string) => void;
  handleMarkAllAsRead: () => void;
  handleClearAllNotifications: () => void;
  handleNotificationClick: (notification: Notification) => void;
  getRoleLabel: (role: UserRole) => string;
  getAvailableViews: (role: UserRole) => string[];
  roleNotifications: Notification[];
  unreadCount: number;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
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

  const getRoleLabel = useCallback((role: UserRole) => {
    switch (role) {
      case 'executive': return 'Executive View';
      case 'asset-manager': return 'Asset Manager View';
      case 'employee': return 'Employee View';
    }
  }, []);

  const getAvailableViews = useCallback((role: UserRole) => {
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
  }, []);

  const handlePropertySelect = useCallback((property: Property) => {
    setSelectedProperty(property);
    setSidebarOpen(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
    setTimeout(() => {
      setSidebarOpen(prev => {
        if (!prev) {
          setSelectedProperty(null);
        }
        return prev;
      });
    }, 300);
  }, []);

  const handleTogglePin = useCallback(() => {
    setSidebarPinned(prev => !prev);
  }, []);

  const handleChatMinimize = useCallback(() => {
    setChatOpen(false);
    setChatMinimized(true);
  }, []);

  const handleChatMaximize = useCallback(() => {
    setChatMinimized(false);
    setChatOpen(true);
  }, []);

  const handleCompare = useCallback(() => {
    setComparisonOpen(true);
  }, []);

  const handleClearComparison = useCallback(() => {
    setSelectedPropertyIds([]);
  }, []);

  const handleRemoveFromComparison = useCallback((propertyId: string) => {
    setSelectedPropertyIds(prev => prev.filter(id => id !== propertyId));
  }, []);

  const handleMarkAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => n.roles.includes(userRole) ? { ...n, isRead: true } : n)
    );
  }, [userRole]);

  const handleClearAllNotifications = useCallback(() => {
    setNotifications(prev =>
      prev.filter(n => !n.roles.includes(userRole) || n.isRead)
    );
  }, [userRole]);

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (notification.propertyId) {
      const property = properties.find(p => p.id === notification.propertyId);
      if (property) {
        handlePropertySelect(property);
        setNotificationsOpen(false);
      }
    }
  }, [handlePropertySelect]);

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


  const roleNotifications = notifications.filter(n => n.roles.includes(userRole));
  const unreadCount = roleNotifications.filter(n => !n.isRead).length;

  const value: PortfolioContextType = {
    currentView,
    setCurrentView,
    selectedProperty,
    setSelectedProperty,
    userRole,
    setUserRole,
    openSearch,
    setOpenSearch,
    sidebarOpen,
    setSidebarOpen,
    sidebarPinned,
    setSidebarPinned,
    chatOpen,
    setChatOpen,
    chatMinimized,
    setChatMinimized,
    selectedPropertyIds,
    setSelectedPropertyIds,
    comparisonOpen,
    setComparisonOpen,
    notifications,
    setNotifications,
    notificationsOpen,
    setNotificationsOpen,
    notificationSettingsOpen,
    setNotificationSettingsOpen,
    handlePropertySelect,
    handleSidebarClose,
    handleTogglePin,
    handleChatMinimize,
    handleChatMaximize,
    handleCompare,
    handleClearComparison,
    handleRemoveFromComparison,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleClearAllNotifications,
    handleNotificationClick,
    getRoleLabel,
    getAvailableViews,
    roleNotifications,
    unreadCount,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

