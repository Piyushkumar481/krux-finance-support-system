import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";

import Landing from "@/pages/Landing";
import CustomerLogin from "@/pages/CustomerLogin";
import AgentLogin from "@/pages/AgentLogin";
import CustomerChat from "@/pages/CustomerChat";
import SupportDashboard from "@/pages/SupportDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/customer-login" component={CustomerLogin} />
      <Route path="/customer-chat">
        <Redirect to="/customer-login" />
      </Route>
      <Route path="/chat" component={CustomerChat} />
      <Route path="/agent-login" component={AgentLogin} />
      <Route path="/support-dashboard">
        <Redirect to="/agent-login" />
      </Route>
      <Route path="/dashboard" component={SupportDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <ChatProvider>
              <Router />
              <Toaster />
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
