import { Link } from "wouter";
import { MessageSquare, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold">K</span>
            </div>
            <span className="text-xl font-semibold">KRUX Finance</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Customer Support System</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get instant help with loan applications, document requirements, and application status.
            Connect with our AI assistant or speak with a support agent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover-elevate">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Customer Chat</CardTitle>
              <CardDescription>
                Start a conversation with our AI assistant for quick help with your loan queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/customer-chat">
                <Button className="w-full" data-testid="button-customer-chat">
                  Start Chat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <div className="h-12 w-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-chart-2" />
              </div>
              <CardTitle>Support Dashboard</CardTitle>
              <CardDescription>
                Agent access for managing customer conversations and support tickets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/support-dashboard">
                <Button variant="outline" className="w-full" data-testid="button-support-dashboard">
                  Agent Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Start Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customers can start a chat about loan applications, documents, or check application status
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. AI Assistant Help</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get instant responses from our intelligent bot trained on loan processes and requirements
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3. Human Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Escalate to a live agent anytime for personalized assistance with complex queries
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
