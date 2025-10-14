'use client';

import { ChatDialog } from '@/components/ChatDialog';
import { MinimizedChat } from '@/components/MinimizedChat';
import { ComparisonToolbar } from '@/components/ComparisonToolbar';
import { ComparisonPanel } from '@/components/ComparisonPanel';
import { NotificationPanel } from '@/components/NotificationPanel';
import { NotificationDialog } from '@/components/NotificationDialog';
import { NotificationSettings } from '@/components/NotificationSettings';
import { PropertySidebar } from '@/components/PropertySidebar';
import { Toaster } from '@/components/ui/sonner';
import { properties } from '@/lib/mockData';
import { usePortfolio } from './PortfolioProvider';

type ViewType = 'dashboard' | 'map' | 'financial' | 'properties' | 'tenants';

export function DialogsAndOverlays() {
  const {
    selectedProperty,
    sidebarOpen,
    sidebarPinned,
    handleSidebarClose,
    handleTogglePin,
    chatOpen,
    setChatOpen,
    chatMinimized,
    handleChatMinimize,
    handleChatMaximize,
    userRole,
    currentView,
    setCurrentView,
    handlePropertySelect,
    selectedPropertyIds,
    handleCompare,
    handleClearComparison,
    handleRemoveFromComparison,
    comparisonOpen,
    setComparisonOpen,
    notificationsOpen,
    setNotificationsOpen,
    roleNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleClearAllNotifications,
    handleNotificationClick,
    notificationSettingsOpen,
    setNotificationSettingsOpen,
  } = usePortfolio();

  const selectedProperties = properties.filter(p => selectedPropertyIds.includes(p.id));

  return (
    <>
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
    </>
  );
}

