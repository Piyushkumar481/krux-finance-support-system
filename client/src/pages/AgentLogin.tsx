import { useState } from "react";
import { useLocation } from "wouter";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";

// Mock agent data
const mockAgents = [
  { id: "agent-1", name: "Amit Kumar", username: "amit.kumar", password: "demo123", role: "agent" },
  { id: "agent-2", name: "Sneha Singh", username: "sneha.singh", password: "demo123", role: "agent" },
];

export default function AgentLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const agent = mockAgents.find(
      (a) => a.username === username && a.password === password
    );
    
    if (agent) {
      login({
        ...agent,
        phone: null,
        status: "online",
      });
      toast({
        title: "Login successful",
        description: `Welcome back, ${agent.name}!`,
      });
      setLocation("/dashboard");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-chart-2" />
            </div>
            <CardTitle>Agent Login</CardTitle>
            <CardDescription>
              Access the support dashboard to manage customer conversations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="input-username"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-login">
                Login to Dashboard
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Demo Credentials:
              </p>
              <div className="space-y-2 text-xs">
                {mockAgents.map((agent) => (
                  <div key={agent.id} className="p-2 rounded bg-muted/50">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{agent.name}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Username: {agent.username}</span>
                      <span>Password: {agent.password}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
