'use client';
import { useEffect, useRef } from 'react';
import type { Property } from '../lib/data';
import { Button } from './ui/button';
import { Pin, PinOff, X, Sparkles } from 'lucide-react';
import { PropertyDetailView } from './PropertyDetailView';
import { cn } from '@/lib/utils';

interface PropertySidebarProps {
  property: Property | null;
  isOpen: boolean;
  isPinned: boolean;
  onClose: () => void;
  onTogglePin: () => void;
  onClickOutside?: () => void;
  onAskAI?: () => void;
}

export function PropertySidebar({ 
  property, 
  isOpen, 
  isPinned,
  onClose, 
  onTogglePin,
  onClickOutside,
  onAskAI
}: PropertySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only handle click outside if sidebar is open but not pinned
      if (isOpen && !isPinned && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClickOutside?.();
      }
    };

    // Add slight delay to prevent immediate closing when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isPinned, onClickOutside]);

  if (!isOpen || !property) {
    return null;
  }

  return (
    <>
      {/* Backdrop - only show when not pinned and on overlay mode */}
      {!isPinned && isOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "bg-background border-l shadow-lg transition-all duration-300 ease-in-out flex flex-col",
          isPinned 
            ? "relative w-[600px] flex-shrink-0" // Docked mode - part of layout
            : "fixed right-0 top-16 bottom-0 z-40 w-full sm:w-[600px]", // Overlay mode - fixed position below nav
          !isPinned && (isOpen ? "translate-x-0" : "translate-x-full")
        )}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center justify-between gap-2">
          <h3 className="flex-1 truncate">Property Details</h3>
          <div className="flex items-center gap-2">
            {onAskAI && (
              <Button
                variant="outline"
                size="sm"
                onClick={onAskAI}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Ask AI</span>
              </Button>
            )}
            <Button
              variant={isPinned ? 'default' : 'ghost'}
              size="sm"
              onClick={onTogglePin}
              className="gap-2"
            >
              {isPinned ? (
                <>
                  <PinOff className="w-4 h-4" />
                  <span className="hidden sm:inline">Unpin</span>
                </>
              ) : (
                <>
                  <Pin className="w-4 h-4" />
                  <span className="hidden sm:inline">Pin</span>
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <PropertyDetailView property={property} />
        </div>
      </div>
    </>
  );
}
