import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GeoZone } from '@/pages/GeoFencing';
import { MapPin, Shield, AlertTriangle, Info } from 'lucide-react';

interface ZoneListProps {
  zones: GeoZone[];
}

const ZoneList: React.FC<ZoneListProps> = ({ zones }) => {
  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'moderate':
        return <Info className="w-4 h-4 text-warning" />;
      default:
        return <Shield className="w-4 h-4 text-success" />;
    }
  };

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'destructive';
      case 'moderate':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return '';
      case 'moderate':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Monitored Zones ({zones.length})
        </CardTitle>
        <CardDescription>
          All geofenced areas in your vicinity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="p-4 border border-border rounded-lg space-y-3 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRiskIcon(zone.riskLevel)}
                <div>
                  <h3 className="font-semibold text-sm">{zone.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {zone.center[0].toFixed(4)}, {zone.center[1].toFixed(4)}
                  </p>
                </div>
              </div>
              <Badge 
                variant={getRiskBadgeVariant(zone.riskLevel) as any}
                className={getRiskBadgeClass(zone.riskLevel)}
              >
                {zone.riskLevel}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {zone.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Radius: {zone.radius}m</span>
                <div className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: zone.color }}
                  />
                  <span>Zone Color</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ZoneList;