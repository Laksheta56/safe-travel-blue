import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { User, Shield, MapPin, Clock, Settings, Star, TrendingUp, Calendar } from "lucide-react";

const Profile = () => {
  const [realTimeTracking, setRealTimeTracking] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [safetyAlerts, setSafetyAlerts] = useState(true);

  const safetyScore = 85;
  const getSafetyColor = (score: number) => {
    if (score >= 80) return "safety-excellent";
    if (score >= 60) return "safety-good"; 
    if (score >= 40) return "safety-moderate";
    return "safety-poor";
  };

  const getSafetyLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Moderate";
    return "Needs Attention";
  };

  const tripHistory = [
    {
      id: 1,
      destination: "Paris, France",
      duration: "7 days",
      date: "Dec 15-22, 2024",
      status: "Active",
      safetyScore: 92
    },
    {
      id: 2,
      destination: "London, UK", 
      duration: "5 days",
      date: "Nov 10-15, 2024",
      status: "Completed",
      safetyScore: 88
    },
    {
      id: 3,
      destination: "Tokyo, Japan",
      duration: "10 days", 
      date: "Oct 1-11, 2024",
      status: "Completed",
      safetyScore: 95
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6" />
            Profile
          </h1>
          <p className="text-primary-foreground/90">Manage your safety settings</p>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* User Profile */}
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">john.doe@email.com</p>
                <Badge variant="outline" className="mt-1">Verified Traveler</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Score */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety Score
            </CardTitle>
            <CardDescription>Your overall travel safety rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{safetyScore}</span>
                </div>
                <div>
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    {getSafetyLabel(safetyScore)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">+5 from last month</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Trip Completion</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Safety Check-ins</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Emergency Preparedness</span>
                <span className="font-medium">90%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip History */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Trip History
            </CardTitle>
            <CardDescription>Your recent travels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tripHistory.map((trip) => (
              <div key={trip.id} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{trip.destination}</span>
                  </div>
                  <Badge variant={trip.status === 'Active' ? 'default' : 'secondary'}>
                    {trip.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {trip.duration}
                    </div>
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-success" />
                    <span>{trip.safetyScore}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              View All Trips
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Safety Settings */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Privacy & Safety Settings
            </CardTitle>
            <CardDescription>Control your safety preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="real-time-tracking">Real-time Tracking</Label>
                <p className="text-xs text-muted-foreground">
                  Allow continuous location monitoring during trips
                </p>
              </div>
              <Switch
                id="real-time-tracking"
                checked={realTimeTracking}
                onCheckedChange={setRealTimeTracking}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="location-sharing">Location Sharing</Label>
                <p className="text-xs text-muted-foreground">
                  Share location with emergency contacts
                </p>
              </div>
              <Switch
                id="location-sharing"
                checked={locationSharing}
                onCheckedChange={setLocationSharing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="safety-alerts">Safety Alerts</Label>
                <p className="text-xs text-muted-foreground">
                  Receive notifications about safety issues
                </p>
              </div>
              <Switch
                id="safety-alerts"
                checked={safetyAlerts}
                onCheckedChange={setSafetyAlerts}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;