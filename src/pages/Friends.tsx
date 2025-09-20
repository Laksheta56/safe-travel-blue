import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Users, Search, UserPlus, MapPin, Shield, MessageCircle } from "lucide-react";

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const friends = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "London, UK",
      status: "online",
      safetyScore: 92,
      isOnTrip: true,
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Mike Chen",
      location: "Tokyo, Japan",
      status: "traveling",
      safetyScore: 88,
      isOnTrip: true,
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "New York, USA",
      status: "offline",
      safetyScore: 85,
      isOnTrip: false,
      avatar: "EW"
    }
  ];

  const suggestions = [
    { id: 4, name: "Alex Rodriguez", mutualFriends: 3, avatar: "AR" },
    { id: 5, name: "Lisa Zhang", mutualFriends: 1, avatar: "LZ" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "success";
      case "traveling": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" />
            Friends & Companions
          </h1>
          <p className="text-primary-foreground/90">Stay connected while traveling</p>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Search */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Friend Suggestions */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Suggested Friends
            </CardTitle>
            <CardDescription>People you might know</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{suggestion.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium">{suggestion.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {suggestion.mutualFriends} mutual friends
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Friends List */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle>Your Friends ({friends.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {friends.map((friend) => (
              <div key={friend.id} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="font-medium text-primary">{friend.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{friend.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {friend.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(friend.status) as any}>
                    {friend.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">
                      Safety Score: {friend.safetyScore}
                    </span>
                  </div>
                  {friend.isOnTrip && (
                    <Badge variant="outline" className="text-primary border-primary">
                      On Trip
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add Friend Button */}
        <Button className="w-full bg-gradient-primary shadow-button">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Friend
        </Button>
      </div>

      <Navigation />
    </div>
  );
};

export default Friends;