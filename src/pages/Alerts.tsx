import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Bell, AlertTriangle, Shield, MapPin, Clock, Settings } from "lucide-react";

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Weather Advisory",
      message: "Heavy rain and thunderstorms expected in your area today. Take necessary precautions.",
      location: "Paris, France",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      type: "info",
      title: "Geo-fence Alert",
      message: "You've entered a safe zone. Local emergency services are 5 minutes away.",
      location: "Champs-Élysées",
      time: "4 hours ago",
      isRead: false
    },
    {
      id: 3,
      type: "success",
      title: "Safety Check Complete",
      message: "Your scheduled safety check-in was successful. Next check-in in 6 hours.",
      location: "Hotel Le Meurice",
      time: "6 hours ago",
      isRead: true
    },
    {
      id: 4,
      type: "warning",
      title: "Anomaly Detected",
      message: "Unusual movement pattern detected. Please confirm you are safe.",
      location: "Louvre District",
      time: "1 day ago",
      isRead: true
    },
    {
      id: 5,
      type: "info",
      title: "Friend Location Update",
      message: "Sarah Johnson has arrived safely in London and updated her location.",
      location: "London, UK",
      time: "2 days ago",
      isRead: true
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "success": return <Shield className="w-5 h-5 text-success" />;
      default: return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning": return "warning";
      case "success": return "success";
      default: return "primary";
    }
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Bell className="w-6 h-6" />
                Alerts & Notifications
              </h1>
              <p className="text-primary-foreground/90">Stay informed about your safety</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary-foreground">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Alert Summary */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-warning">{unreadCount}</div>
                <div className="text-xs text-muted-foreground">Unread</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{alerts.length}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">3</div>
                <div className="text-xs text-muted-foreground">Safety Checks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest notifications and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  alert.isRead ? 'bg-background border-border' : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{alert.title}</h3>
                      {!alert.isRead && (
                        <Badge variant={getAlertColor(alert.type) as any} className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Customize your alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <p className="font-medium text-sm">Safety Alerts</p>
                <p className="text-xs text-muted-foreground">Emergency and safety notifications</p>
              </div>
              <Badge variant="default" className="bg-success text-success-foreground">Enabled</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <p className="font-medium text-sm">Geo-fence Alerts</p>
                <p className="text-xs text-muted-foreground">Location-based notifications</p>
              </div>
              <Badge variant="default" className="bg-success text-success-foreground">Enabled</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div>
                <p className="font-medium text-sm">Friend Updates</p>
                <p className="text-xs text-muted-foreground">Updates from travel companions</p>
              </div>
              <Badge variant="secondary">Disabled</Badge>
            </div>

            <Button variant="outline" className="w-full mt-4">
              <Settings className="w-4 h-4 mr-2" />
              Manage All Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Alerts;