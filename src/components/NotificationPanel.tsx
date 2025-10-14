'use client';
import { useState } from 'react';
import type { Notification } from '../lib/mockData';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  DollarSign,
  Calendar,
  Wrench,
  Settings2,
  TrendingUp,
  X,
  Check,
  CheckCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onNotificationClick?: (notification: Notification) => void;
  onSettingsClick?: () => void;
}

export function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
  onSettingsClick,
}: NotificationPanelProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string, category: string) => {
    if (type === 'critical') {
      return <AlertCircle className="w-5 h-5 text-destructive" />;
    }
    if (type === 'warning') {
      return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    }
    if (type === 'success') {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }

    // Category-based icons for info
    switch (category) {
      case 'financial':
        return <DollarSign className="w-5 h-5 text-blue-500" />;
      case 'lease':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-orange-500" />;
      case 'occupancy':
        return <Building2 className="w-5 h-5 text-blue-500" />;
      case 'transaction':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b space-y-3 flex-shrink-0">
        <div className="flex items-center justify-between ">
          <div>
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 p-2">
            {onSettingsClick && (
              <Button variant="ghost" size="sm" onClick={onSettingsClick} title="Notification settings">
                <Settings2 className="w-4 h-4" />
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearAll} title="Clear all">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
            className="flex-1"
          >
            All
            <Badge variant="secondary" className="ml-2">
              {notifications.length}
            </Badge>
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
            className="flex-1"
          >
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="w-full"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <ScrollArea className="flex-1">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              You&apos;re all caught up!
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={cn(
                  "w-full text-left p-4 transition-colors hover:bg-muted/50",
                  !notification.isRead && "bg-accent/30"
                )}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type, notification.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={cn(
                        "text-sm",
                        !notification.isRead && "font-medium"
                      )}>
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {notification.propertyName && (
                        <Badge variant="outline" className="text-xs">
                          <Building2 className="w-3 h-3 mr-1" />
                          {notification.propertyName}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Mark as read button */}
                  {!notification.isRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(notification.id);
                      }}
                      className="flex-shrink-0 p-1 rounded hover:bg-accent"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
