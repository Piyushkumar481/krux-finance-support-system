import Landing from "../../pages/Landing";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function LandingExample() {
  return (
    <ThemeProvider>
      <Landing />
    </ThemeProvider>
  );
}
