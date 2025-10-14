'use client';

import { PortfolioProvider } from './PortfolioProvider';
import { NavigationSidebar } from './NavigationSidebar';
import { TopNavWrapper } from './TopNavWrapper';
import { MainContent } from './MainContent';
import { GlobalSearch } from './GlobalSearch';
import { DialogsAndOverlays } from './DialogsAndOverlays';

export default function Page() {
  return (
    <PortfolioProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <NavigationSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavWrapper />

          {/* Content + Sidebar Container */}
          <div className="flex-1 flex overflow-hidden">
            <MainContent />
          </div>
        </div>

        <GlobalSearch />
        <DialogsAndOverlays />
      </div>
    </PortfolioProvider>
  );
}
