import CustomerChat from "../../pages/CustomerChat";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";

export default function CustomerChatExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <CustomerChat />
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
