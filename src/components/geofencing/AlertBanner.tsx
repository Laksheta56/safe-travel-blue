import { Alert } from '@/pages/GeoFencing';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, X, Shield } from 'lucide-react';

interface AlertBannerProps {
  alert: Alert;
  onDismiss: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alert, onDismiss }) => {
  const getAlertStyles = () => {
    switch (alert.riskLevel) {
      case 'high':
        return {
          container: 'bg-destructive/10 border-destructive/20 text-destructive-foreground',
          icon: 'text-destructive',
          badge: 'bg-destructive text-destructive-foreground'
        };
      case 'moderate':
        return {
          container: 'bg-warning/10 border-warning/20 text-warning-foreground',
          icon: 'text-warning',
          badge: 'bg-warning text-warning-foreground'
        };
      default:
        return {
          container: 'bg-success/10 border-success/20 text-success-foreground',
          icon: 'text-success',
          badge: 'bg-success text-success-foreground'
        };
    }
  };

  const styles = getAlertStyles();
  const isEntry = alert.type === 'entry';

  return (
    <div className={`relative p-4 rounded-lg border animate-in slide-in-from-top-2 ${styles.container}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {alert.riskLevel === 'high' ? (
            <AlertTriangle className={`w-5 h-5 ${styles.icon}`} />
          ) : (
            <Shield className={`w-5 h-5 ${styles.icon}`} />
          )}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">
              {isEntry ? 'Entered Zone' : 'Exited Zone'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-6 w-6 p-0 hover:bg-black/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{alert.zoneName}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
              {alert.riskLevel}
            </span>
          </div>
          
          <p className="text-xs opacity-90">
            {isEntry ? 'You have entered' : 'You have left'} a monitored area at{' '}
            {alert.timestamp.toLocaleTimeString()}
          </p>
          
          {alert.riskLevel === 'high' && isEntry && (
            <div className="mt-2 p-2 bg-destructive/20 rounded text-xs">
              <strong>⚠️ High Risk Area:</strong> Exercise extra caution and consider leaving if possible.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;