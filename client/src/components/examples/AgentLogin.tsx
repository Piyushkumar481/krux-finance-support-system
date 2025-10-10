import AgentLogin from "../../pages/AgentLogin";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AgentLoginExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AgentLogin />
      </AuthProvider>
    </ThemeProvider>
  );
}
