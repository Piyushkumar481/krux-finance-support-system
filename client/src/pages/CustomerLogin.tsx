import { useState } from "react";
import { useLocation } from "wouter";
import { Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";

// Mock customer data
const mockCustomers = [
  { id: "cust-1", name: "Rahul Sharma", phone: "+919876543210", role: "customer" },
  { id: "cust-2", name: "Priya Patel", phone: "+919876543211", role: "customer" },
];

export default function CustomerLogin() {
  const [phone, setPhone] = useState("");
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const customer = mockCustomers.find((c) => c.phone === phone);
    
    if (customer) {
      login({
        ...customer,
        username: null,
        password: null,
        status: "online",
      });
      toast({
        title: "Login successful",
        description: `Welcome back, ${customer.name}!`,
      });
      setLocation("/chat");
    } else {
      toast({
        title: "Invalid phone number",
        description: "Please check your phone number and try again.",
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
            <div className="mx-auto h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Customer Login</CardTitle>
            <CardDescription>
              Enter your phone number to start chatting with our support team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-phone"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-login">
                Continue to Chat
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Demo Credentials:
              </p>
              <div className="space-y-2 text-xs">
                {mockCustomers.map((customer) => (
                  <div key={customer.id} className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="font-medium">{customer.name}</span>
                    <span className="font-mono">{customer.phone}</span>
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
