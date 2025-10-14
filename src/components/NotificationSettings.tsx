import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
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
  TrendingUp,
} from 'lucide-react';

interface NotificationSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NotificationPreferences {
  critical: boolean;
  warning: boolean;
  info: boolean;
  success: boolean;
  occupancy: boolean;
  financial: boolean;
  lease: boolean;
  maintenance: boolean;
  transaction: boolean;
  system: boolean;
  soundEnabled: boolean;
  emailEnabled: boolean;
}

export function NotificationSettings({
  open,
  onOpenChange,
}: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    critical: true,
    warning: true,
    info: true,
    success: true,
    occupancy: true,
    financial: true,
    lease: true,
    maintenance: true,
    transaction: true,
    system: false,
    soundEnabled: false,
    emailEnabled: false,
  });

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>
            Customize which notifications you want to receive
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* By Severity */}
          <div className="space-y-4">
            <h4>By Severity</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <Label htmlFor="critical" className="cursor-pointer">
                    Critical Alerts
                  </Label>
                </div>
                <Switch
                  id="critical"
                  checked={preferences.critical}
                  onCheckedChange={() => handleToggle('critical')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <Label htmlFor="warning" className="cursor-pointer">
                    Warnings
                  </Label>
                </div>
                <Switch
                  id="warning"
                  checked={preferences.warning}
                  onCheckedChange={() => handleToggle('warning')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <Label htmlFor="info" className="cursor-pointer">
                    Information
                  </Label>
                </div>
                <Switch
                  id="info"
                  checked={preferences.info}
                  onCheckedChange={() => handleToggle('info')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <Label htmlFor="success" className="cursor-pointer">
                    Success Messages
                  </Label>
                </div>
                <Switch
                  id="success"
                  checked={preferences.success}
                  onCheckedChange={() => handleToggle('success')}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* By Category */}
          <div className="space-y-4">
            <h4>By Category</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <Label htmlFor="occupancy" className="cursor-pointer">
                    Occupancy Updates
                  </Label>
                </div>
                <Switch
                  id="occupancy"
                  checked={preferences.occupancy}
                  onCheckedChange={() => handleToggle('occupancy')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <Label htmlFor="financial" className="cursor-pointer">
                    Financial Alerts
                  </Label>
                </div>
                <Switch
                  id="financial"
                  checked={preferences.financial}
                  onCheckedChange={() => handleToggle('financial')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <Label htmlFor="lease" className="cursor-pointer">
                    Lease & Renewals
                  </Label>
                </div>
                <Switch
                  id="lease"
                  checked={preferences.lease}
                  onCheckedChange={() => handleToggle('lease')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-orange-500" />
                  <Label htmlFor="maintenance" className="cursor-pointer">
                    Maintenance
                  </Label>
                </div>
                <Switch
                  id="maintenance"
                  checked={preferences.maintenance}
                  onCheckedChange={() => handleToggle('maintenance')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <Label htmlFor="transaction" className="cursor-pointer">
                    Transactions
                  </Label>
                </div>
                <Switch
                  id="transaction"
                  checked={preferences.transaction}
                  onCheckedChange={() => handleToggle('transaction')}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Options */}
          <div className="space-y-4">
            <h4>Delivery Options</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound" className="cursor-pointer">
                    Sound Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound for new alerts
                  </p>
                </div>
                <Switch
                  id="sound"
                  checked={preferences.soundEnabled}
                  onCheckedChange={() => handleToggle('soundEnabled')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email" className="cursor-pointer">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive critical alerts via email
                  </p>
                </div>
                <Switch
                  id="email"
                  checked={preferences.emailEnabled}
                  onCheckedChange={() => handleToggle('emailEnabled')}
                />
              </div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Notification preferences are saved locally and apply to this device only.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
