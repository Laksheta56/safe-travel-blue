import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { MapPin, Calendar, QrCode, Users, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TripPlanning = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [showQRScanner, setShowQRScanner] = useState(false);
  const { toast } = useToast();

  const handleSaveTripPlan = () => {
    toast({
      title: "Trip Saved!",
      description: "Your trip plan has been saved successfully.",
    });
  };

  const handleQRScan = () => {
    setShowQRScanner(true);
    // Simulate QR code scan
    setTimeout(() => {
      setShowQRScanner(false);
      toast({
        title: "QR Code Scanned",
        description: "Blockchain verification completed successfully.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Trip Planning
          </h1>
          <p className="text-primary-foreground/90">Plan your safe journey</p>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Trip Details Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>Enter your travel information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Trip Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your trip plans..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleSaveTripPlan} className="w-full">
              Save Trip Plan
            </Button>
          </CardContent>
        </Card>

        {/* Blockchain QR Scanner */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Blockchain Verification
            </CardTitle>
            <CardDescription>
              Scan QR code to verify your trip on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showQRScanner ? (
              <div className="flex flex-col items-center space-y-4 py-8">
                <div className="w-32 h-32 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <p className="text-sm text-muted-foreground">Scanning QR code...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <QrCode className="w-16 h-16 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Secure your trip with blockchain verification
                  </p>
                </div>
                <Button onClick={handleQRScan} variant="outline" className="w-full">
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Travel Companions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Travel Companions
            </CardTitle>
            <CardDescription>Add friends to your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Travel companions</p>
                  <p className="text-sm text-muted-foreground">Not added yet</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Add Companions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default TripPlanning;