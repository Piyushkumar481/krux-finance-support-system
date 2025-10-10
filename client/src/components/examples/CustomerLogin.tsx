import CustomerLogin from "../../pages/CustomerLogin";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function CustomerLoginExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CustomerLogin />
      </AuthProvider>
    </ThemeProvider>
  );
}
