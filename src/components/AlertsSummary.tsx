import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Notification } from '../lib/mockData';
import { AlertCircle, AlertTriangle, Bell, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertsSummaryProps {
  notifications: Notification[];
  onViewAll: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

export function AlertsSummary({
  notifications,
  onViewAll,
  onNotificationClick,
}: AlertsSummaryProps) {
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const criticalNotifications = unreadNotifications.filter(n => n.type === 'critical');
  const warningNotifications = unreadNotifications.filter(n => n.type === 'warning');

  const recentAlerts = unreadNotifications.slice(0, 3);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Active Alerts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Alert Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Critical</span>
            </div>
            <p className="text-2xl">{criticalNotifications.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Warning</span>
            </div>
            <p className="text-2xl">{warningNotifications.length}</p>
          </div>
        </div>

        {/* Recent Alerts */}
        {recentAlerts.length > 0 ? (
          <div className="space-y-2">
            {recentAlerts.map((notification) => (
              <button
                key={notification.id}
                onClick={() => onNotificationClick?.(notification)}
                className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm line-clamp-1">{notification.title}</p>
                  <Badge
                    variant={notification.type === 'critical' ? 'destructive' : 'default'}
                    className={cn(
                      "flex-shrink-0 text-xs",
                      notification.type === 'warning' && "bg-orange-500 hover:bg-orange-600"
                    )}
                  >
                    {notification.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {notification.propertyName && (
                    <Badge variant="outline" className="text-xs">
                      {notification.propertyName}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No active alerts
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All systems running smoothly
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
