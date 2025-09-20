import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { AlertTriangle, Phone, MapPin, Share2, Shield, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const [panicActivated, setPanicActivated] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const { toast } = useToast();

  const emergencyContacts = [
    { name: "Local Emergency", number: "112", type: "emergency" },
    { name: "Tourist Police", number: "+33 1-53-71-53-71", type: "police" },
    { name: "Sarah Johnson", number: "+44 20-7946-0958", type: "contact" },
    { name: "Mike Chen", number: "+81 3-1234-5678", type: "contact" }
  ];

  const handlePanicButton = () => {
    setPanicActivated(true);
    setLocationSharing(true);
    toast({
      title: "Emergency Activated!",
      description: "Your location is being shared with emergency contacts.",
      variant: "destructive"
    });

    // Simulate emergency response
    setTimeout(() => {
      toast({
        title: "Emergency Services Notified",
        description: "Local authorities have been contacted.",
      });
    }, 2000);
  };

  const handleShareLocation = () => {
    setLocationSharing(!locationSharing);
    toast({
      title: locationSharing ? "Location sharing stopped" : "Location sharing started",
      description: locationSharing ? "Your location is no longer being shared" : "Your live location is now being shared",
    });
  };

  const handleCallEmergency = (contact: any) => {
    toast({
      title: `Calling ${contact.name}`,
      description: `Dialing ${contact.number}`,
    });
  };

  return (
    <div className="min-h-screen bg-destructive/5 pb-20">
      {/* Header */}
      <header className="bg-destructive text-destructive-foreground p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Emergency
          </h1>
          <p className="text-destructive-foreground/90">Get help when you need it most</p>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Panic Button */}
        <Card className="shadow-emergency border-destructive/20">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-destructive">Emergency Panic Button</CardTitle>
            <CardDescription>Tap to immediately alert emergency services and contacts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Button
              size="lg"
              className={`w-32 h-32 rounded-full text-lg font-bold shadow-emergency transition-all duration-200 ${
                panicActivated 
                  ? 'bg-destructive/80 animate-pulse' 
                  : 'bg-destructive hover:bg-destructive/90 hover:shadow-lg'
              }`}
              onClick={handlePanicButton}
              disabled={panicActivated}
            >
              {panicActivated ? (
                <div className="flex flex-col items-center">
                  <AlertTriangle className="w-8 h-8 mb-1" />
                  <span>ACTIVE</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <AlertTriangle className="w-8 h-8 mb-1" />
                  <span>PANIC</span>
                </div>
              )}
            </Button>
            
            {panicActivated && (
              <div className="text-center space-y-2">
                <Badge variant="destructive" className="animate-pulse">
                  Emergency Activated
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Emergency services have been notified
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Location Sharing */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Location Sharing
            </CardTitle>
            <CardDescription>Share your real-time location with trusted contacts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${locationSharing ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                <span className="text-sm">
                  {locationSharing ? 'Sharing location live' : 'Location sharing off'}
                </span>
              </div>
              <Badge variant={locationSharing ? "default" : "secondary"} className={locationSharing ? "bg-success text-success-foreground" : ""}>
                {locationSharing ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            {locationSharing && (
              <div className="p-3 bg-success/10 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-success" />
                  <span>Current Location: Champs-Élysées, Paris</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  <span>Updated 30 seconds ago</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleShareLocation}
              variant={locationSharing ? "destructive" : "default"}
              className="w-full"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {locationSharing ? 'Stop Sharing' : 'Start Sharing Location'}
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>Quick access to important numbers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    contact.type === 'emergency' ? 'bg-destructive/20' :
                    contact.type === 'police' ? 'bg-warning/20' : 'bg-primary/20'
                  }`}>
                    {contact.type === 'emergency' || contact.type === 'police' ? (
                      <Shield className={`w-5 h-5 ${
                        contact.type === 'emergency' ? 'text-destructive' : 'text-warning'
                      }`} />
                    ) : (
                      <Users className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.number}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={contact.type === 'emergency' ? 'destructive' : 'outline'}
                  onClick={() => handleCallEmergency(contact)}
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Safety Instructions */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>Stay calm and find a safe location</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>Call local emergency services first (112)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>Share your location with trusted contacts</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>Follow instructions from emergency responders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Emergency;