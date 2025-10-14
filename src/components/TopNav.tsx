import { Search, Sparkles, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface TopNavProps {
  onSearchClick: () => void;
  onAIAssistantClick: () => void;
  onNotificationsClick?: () => void;
  selectedPropertyName?: string;
  unreadNotificationsCount?: number;
}

export function TopNav({ 
  onSearchClick,
  onAIAssistantClick,
  onNotificationsClick,
  selectedPropertyName,
  unreadNotificationsCount = 0,
}: TopNavProps) {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Left side - could add breadcrumbs here */}
        <div className="flex-1"></div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onSearchClick}
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* Notifications */}
          <Button
            variant="outline"
            size="sm"
            className="relative"
            onClick={onNotificationsClick}
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-[10px]">
                {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
              </span>
            )}
          </Button>

          <Button
            variant="default"
            size="sm"
            className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            onClick={onAIAssistantClick}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Assistant</span>
            <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/90 opacity-100">
              <span className="text-xs">⌘</span>/
            </kbd>
          </Button>
        </div>
      </div>
    </div>
  );
}
