import SupportDashboard from "../../pages/SupportDashboard";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";

export default function SupportDashboardExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <SupportDashboard />
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
