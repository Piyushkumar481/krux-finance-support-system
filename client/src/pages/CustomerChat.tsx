import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Send, Menu, ArrowLeft, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MessageBubble from "@/components/MessageBubble";
import TypingIndicator from "@/components/TypingIndicator";
import QuickReplyButton from "@/components/QuickReplyButton";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import type { Message } from "@shared/schema";

const botResponses: Record<string, string> = {
  greeting: "Hello! Welcome to KRUX Finance. I'm here to help you with:\n\n1. Loan applications\n2. Document requirements\n3. Application status\n4. Connect with an agent\n\nHow can I assist you today?",
  loan_types: "We offer three types of loans:\n\n1. **Business Loan**: For business expansion and operations\n2. **Personal Loan**: For personal financial needs\n3. **MSME Loan**: For Micro, Small & Medium Enterprises\n\nWhich type interests you?",
  documents: "Here are the required documents for loan applications:\n\n• PAN Card\n• Aadhaar Card\n• Bank statements (6 months)\n• Income proof\n• Business registration (for Business/MSME loans)\n\nAll documents should be in PDF format, max 5MB each.",
  status: "To check your application status, please provide your Application ID. It starts with 'APP-' followed by numbers.",
  agent: "I'll connect you with a human agent right away. Please wait while I create a support ticket for you.",
};

export default function CustomerChat() {
  const { user, logout } = useAuth();
  const { addMessage, addConversation, messages, conversations } = useChat();
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [conversationId] = useState(`conv-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || user.role !== "customer") {
      setLocation("/customer-login");
    }
  }, [user, setLocation]);

  useEffect(() => {
    if (currentMessages.length === 0) {
      const welcomeMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: "bot",
        senderType: "bot",
        content: botResponses.greeting,
        timestamp: new Date(),
        status: "sent",
      };
      setCurrentMessages([welcomeMessage]);
    }
  }, [conversationId, currentMessages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("loan") && (msg.includes("type") || msg.includes("kind"))) {
      return botResponses.loan_types;
    }
    if (msg.includes("document") || msg.includes("paper")) {
      return botResponses.documents;
    }
    if (msg.includes("status") || msg.includes("check") || msg.includes("track")) {
      return botResponses.status;
    }
    if (msg.includes("agent") || msg.includes("human") || msg.includes("person")) {
      return botResponses.agent;
    }
    if (msg.includes("business") || msg.includes("personal") || msg.includes("msme")) {
      return `Great choice! For ${msg.includes("business") ? "Business" : msg.includes("personal") ? "Personal" : "MSME"} loans, you'll need specific documents. Would you like to know the document requirements?`;
    }
    
    return "I understand. Let me help you with that. Could you please provide more details or choose from the following:\n\n• Loan types and options\n• Document requirements\n• Application status\n• Speak with an agent";
  };

  const handleSend = () => {
    if (!input.trim() || !user) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: user.id,
      senderType: "customer",
      content: input.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    setCurrentMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        conversationId,
        senderId: "bot",
        senderType: "bot",
        content: getBotResponse(input),
        timestamp: new Date(),
        status: "sent",
      };
      
      setCurrentMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (text: string) => {
    setInput(text);
  };

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                logout();
                setLocation("/");
              }}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary">
                KF
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-sm">KRUX Finance Support</h2>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" data-testid="button-menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {currentMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderType === "customer"}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-card p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <QuickReplyButton text="Loan types" onClick={() => handleQuickReply("What loan types do you offer?")} />
          <QuickReplyButton text="Documents needed" onClick={() => handleQuickReply("What documents are required?")} />
          <QuickReplyButton text="Check status" onClick={() => handleQuickReply("Check my application status")} />
          <QuickReplyButton text="Speak to agent" onClick={() => handleQuickReply("I need to speak with an agent")} />
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            data-testid="input-message"
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim()}
            data-testid="button-send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
