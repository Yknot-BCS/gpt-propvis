'use client';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface NotificationDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function NotificationDialog({
  open,
  onClose,
  children,
}: NotificationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add a small delay to prevent immediate closing when opening
    const timeout = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  // Handle escape key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Dialog */}
      <div
        ref={dialogRef}
        className={cn(
          "fixed z-50 bg-card border rounded-lg shadow-lg",
          "w-[calc(100vw-2rem)] sm:w-[400px]",
          "h-[calc(100vh-8rem)] sm:h-[600px]",
          "top-[72px] right-4 sm:right-6",
          "flex flex-col overflow-hidden"
        )}
        style={{ animation: 'slideInFromTop 200ms ease-out' }}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-8 h-8 p-0 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
