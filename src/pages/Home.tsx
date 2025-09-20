import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Shield, MapPin, Calendar, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-primary-foreground/90">Stay safe on your travels</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Safety Score Card */}
        <Card className="shadow-card bg-gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Safety Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{safetyScore}</span>
                </div>
                <div>
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    {getSafetyLabel(safetyScore)}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Keep up the good work!</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </CardContent>
        </Card>

        {/* Current Trip */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Current Trip
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Paris, France</h3>
                <p className="text-sm text-muted-foreground">3 days remaining</p>
              </div>
              <Badge variant="outline" className="text-primary border-primary">Active</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Dec 15-22</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>7 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-auto flex-col py-4 space-y-2"
              onClick={() => navigate("/trip-planning")}
            >
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-sm">Plan Trip</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto flex-col py-4 space-y-2"
              onClick={() => navigate("/friends")}
            >
              <Shield className="w-6 h-6 text-success" />
              <span className="text-sm">Start Trip</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto flex-col py-4 space-y-2 col-span-2"
              onClick={() => navigate("/emergency")}
            >
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <span className="text-sm">Emergency</span>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              Recent Alerts
              <Button variant="ghost" size="sm" onClick={() => navigate("/alerts")}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Weather Advisory</p>
                  <p className="text-xs text-muted-foreground">Heavy rain expected in Paris today</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
                <Shield className="w-4 h-4 text-success mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Safety Check</p>
                  <p className="text-xs text-muted-foreground">You're in a safe area</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Home;