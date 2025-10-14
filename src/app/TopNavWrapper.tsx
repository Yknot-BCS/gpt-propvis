'use client';

import { TopNav } from '@/components/TopNav';
import { usePortfolio } from './PortfolioProvider';

export function TopNavWrapper() {
  const {
    setOpenSearch,
    setChatOpen,
    setNotificationsOpen,
    selectedProperty,
    unreadCount,
  } = usePortfolio();

  return (
    <TopNav
      onSearchClick={() => setOpenSearch(true)}
      onAIAssistantClick={() => setChatOpen(true)}
      onNotificationsClick={() => setNotificationsOpen(true)}
      selectedPropertyName={selectedProperty?.name}
      unreadNotificationsCount={unreadCount}
    />
  );
}

