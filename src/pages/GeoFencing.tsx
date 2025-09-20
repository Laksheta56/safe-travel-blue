import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import GeoFencingMap from "@/components/geofencing/GeoFencingMap";
import AlertBanner from "@/components/geofencing/AlertBanner";
import ZoneList from "@/components/geofencing/ZoneList";
import { MapPin, Shield, AlertTriangle, Clock, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface GeoZone {
  id: string;
  name: string;
  center: [number, number];
  radius: number;
  riskLevel: 'safe' | 'moderate' | 'high';
  color: string;
  description: string;
}

export interface Alert {
  id: string;
  type: 'entry' | 'exit';
  zoneName: string;
  timestamp: Date;
  riskLevel: 'safe' | 'moderate' | 'high';
}

const GeoFencing = () => {
  const [geoFencingEnabled, setGeoFencingEnabled] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number]>([48.8566, 2.3522]); // Paris center
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Mock geofenced zones around Paris
  const geoZones: GeoZone[] = [
    {
      id: 'zone-1',
      name: 'Champs-Élysées Safe Zone',
      center: [48.8738, 2.2950],
      radius: 500,
      riskLevel: 'safe',
      color: '#22c55e',
      description: 'Tourist-friendly area with high security'
    },
    {
      id: 'zone-2',
      name: 'Louvre District',
      center: [48.8606, 2.3376],
      radius: 400,
      riskLevel: 'safe',
      color: '#22c55e',
      description: 'Museum district with regular patrols'
    },
    {
      id: 'zone-3',
      name: 'Montmartre Caution Zone',
      center: [48.8867, 2.3431],
      radius: 300,
      riskLevel: 'moderate',
      color: '#f59e0b',
      description: 'Crowded tourist area, watch for pickpockets'
    },
    {
      id: 'zone-4',
      name: 'Gare du Nord High Risk',
      center: [48.8809, 2.3553],
      radius: 250,
      riskLevel: 'high',
      color: '#ef4444',
      description: 'High crime area, avoid at night'
    },
    {
      id: 'zone-5',
      name: 'Latin Quarter',
      center: [48.8534, 2.3488],
      radius: 350,
      riskLevel: 'safe',
      color: '#22c55e',
      description: 'Historic district with good lighting'
    }
  ];

  // Check if user is inside any geofenced zone
  const checkGeofenceStatus = (location: [number, number]) => {
    if (!geoFencingEnabled) return;

    const [lat, lng] = location;
    
    geoZones.forEach(zone => {
      const distance = calculateDistance(lat, lng, zone.center[0], zone.center[1]);
      const isInside = distance <= zone.radius;
      
      // Check if this is a new entry or exit
      const wasInside = checkIfWasInside(zone.id);
      
      if (isInside && !wasInside) {
        // Entry detected
        const alert: Alert = {
          id: `alert-${Date.now()}-${zone.id}`,
          type: 'entry',
          zoneName: zone.name,
          timestamp: new Date(),
          riskLevel: zone.riskLevel
        };
        
        setAlerts(prev => [alert, ...prev.slice(0, 9)]); // Keep last 10 alerts
        setCurrentAlert(alert);
        
        toast({
          title: `Entered ${zone.name}`,
          description: zone.description,
          variant: zone.riskLevel === 'high' ? 'destructive' : 'default'
        });
        
        // Store zone status
        localStorage.setItem(`zone-${zone.id}`, 'inside');
        
        // Clear alert after 5 seconds
        setTimeout(() => setCurrentAlert(null), 5000);
        
      } else if (!isInside && wasInside) {
        // Exit detected
        const alert: Alert = {
          id: `alert-${Date.now()}-${zone.id}`,
          type: 'exit',
          zoneName: zone.name,
          timestamp: new Date(),
          riskLevel: zone.riskLevel
        };
        
        setAlerts(prev => [alert, ...prev.slice(0, 9)]);
        setCurrentAlert(alert);
        
        toast({
          title: `Exited ${zone.name}`,
          description: "You have left the monitored area",
        });
        
        // Remove zone status
        localStorage.removeItem(`zone-${zone.id}`);
        
        // Clear alert after 5 seconds
        setTimeout(() => setCurrentAlert(null), 5000);
      }
    });
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Check if user was previously inside a zone
  const checkIfWasInside = (zoneId: string): boolean => {
    return localStorage.getItem(`zone-${zoneId}`) === 'inside';
  };

  // Simulate user movement for testing
  const startSimulation = () => {
    if (isSimulating) {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
        simulationRef.current = null;
      }
      setIsSimulating(false);
      return;
    }

    setIsSimulating(true);
    let step = 0;
    
    // Predefined path that will trigger zone entries/exits
    const simulationPath: [number, number][] = [
      [48.8566, 2.3522], // Start at Paris center
      [48.8600, 2.3400], // Move towards Louvre
      [48.8606, 2.3376], // Enter Louvre zone
      [48.8650, 2.3200], // Exit Louvre, move towards Champs-Élysées
      [48.8738, 2.2950], // Enter Champs-Élysées zone
      [48.8800, 2.3200], // Move towards Montmartre
      [48.8867, 2.3431], // Enter Montmartre zone
      [48.8809, 2.3553], // Move to Gare du Nord (high risk)
      [48.8750, 2.3500], // Move away from high risk area
      [48.8534, 2.3488], // Move to Latin Quarter
    ];

    simulationRef.current = setInterval(() => {
      if (step < simulationPath.length) {
        setUserLocation(simulationPath[step]);
        step++;
      } else {
        // Reset simulation
        step = 0;
      }
    }, 3000); // Move every 3 seconds
  };

  // Check geofence status when user location changes
  useEffect(() => {
    checkGeofenceStatus(userLocation);
  }, [userLocation, geoFencingEnabled]);

  // Cleanup simulation on unmount
  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, []);

  const handleToggleGeofencing = (enabled: boolean) => {
    setGeoFencingEnabled(enabled);
    if (!enabled) {
      setCurrentAlert(null);
      // Clear all zone statuses
      geoZones.forEach(zone => {
        localStorage.removeItem(`zone-${zone.id}`);
      });
    }
    
    toast({
      title: enabled ? "Geo-fencing Enabled" : "Geo-fencing Disabled",
      description: enabled ? "You will receive zone alerts" : "Zone monitoring is paused",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Geo-Fencing
          </h1>
          <p className="text-primary-foreground/90">Monitor safe zones and alerts</p>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Alert Banner */}
        {currentAlert && (
          <AlertBanner 
            alert={currentAlert} 
            onDismiss={() => setCurrentAlert(null)} 
          />
        )}

        {/* Controls */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Geo-Fencing Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="geofencing-toggle">Enable Geo-Fencing</Label>
                <p className="text-xs text-muted-foreground">
                  Monitor zone entries and exits
                </p>
              </div>
              <Switch
                id="geofencing-toggle"
                checked={geoFencingEnabled}
                onCheckedChange={handleToggleGeofencing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Test Movement</Label>
                <p className="text-xs text-muted-foreground">
                  Simulate user movement for testing
                </p>
              </div>
              <Button
                size="sm"
                variant={isSimulating ? "destructive" : "outline"}
                onClick={startSimulation}
              >
                {isSimulating ? "Stop" : "Start"} Simulation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Map
            </CardTitle>
            <CardDescription>
              Your location and monitored zones
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 rounded-lg overflow-hidden">
              <GeoFencingMap
                userLocation={userLocation}
                geoZones={geoZones}
                enabled={geoFencingEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Zone List */}
        <ZoneList zones={geoZones} />

        {/* Recent Alerts */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Latest zone entry/exit events
            </CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No alerts yet</p>
                <p className="text-xs">Move around to trigger zone alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.type === 'entry' ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">
                          {alert.type === 'entry' ? 'Entered' : 'Exited'} {alert.zoneName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        alert.riskLevel === 'high' ? 'destructive' :
                        alert.riskLevel === 'moderate' ? 'warning' : 'default'
                      }
                      className={
                        alert.riskLevel === 'safe' ? 'bg-success text-success-foreground' :
                        alert.riskLevel === 'moderate' ? 'bg-warning text-warning-foreground' : ''
                      }
                    >
                      {alert.riskLevel}
                    </Badge>
                  </div>
                ))}
                
                {alerts.length > 5 && (
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Alerts ({alerts.length})
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default GeoFencing;