import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Send, Search, MoreVertical, X, Check, AlertTriangle, LogOut, User as UserIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import MessageBubble from "@/components/MessageBubble";
import TicketCard from "@/components/TicketCard";
import QuickReplyButton from "@/components/QuickReplyButton";
import CustomerInfoPanel from "@/components/CustomerInfoPanel";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import type { Conversation, Message } from "@shared/schema";

// Mock data
const mockConversations: (Conversation & { customerName: string; lastMessage: string })[] = [
  {
    id: "conv-1",
    customerId: "cust-1",
    agentId: "agent-1",
    status: "active",
    priority: "high",
    category: "loan_application",
    lastMessageAt: new Date(),
    createdAt: new Date(),
    customerName: "Rahul Sharma",
    lastMessage: "I need help with my business loan documents",
  },
  {
    id: "conv-2",
    customerId: "cust-2",
    agentId: null,
    status: "pending",
    priority: "medium",
    category: "status_check",
    lastMessageAt: new Date(Date.now() - 300000),
    createdAt: new Date(Date.now() - 600000),
    customerName: "Priya Patel",
    lastMessage: "What is the status of application APP-2024-001?",
  },
];

const mockMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "cust-1",
      senderType: "customer",
      content: "I need help with my business loan documents",
      timestamp: new Date(Date.now() - 600000),
      status: "read",
    },
  ],
};

const quickReplies = [
  "Thank you for contacting KRUX Finance",
  "Let me check that for you",
  "I'll escalate this to our senior team",
  "Your application is being processed",
  "Could you please provide your Application ID?",
];

export default function SupportDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeConversation, setActiveConversation] = useState<string | null>("conv-1");
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
  const [agentMessages, setAgentMessages] = useState<Record<string, Message[]>>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || user.role !== "agent") {
      setLocation("/agent-login");
    }
  }, [user, setLocation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [agentMessages, activeConversation]);

  const activeConv = mockConversations.find((c) => c.id === activeConversation);
  const currentMessages = activeConversation ? agentMessages[activeConversation] || [] : [];
  
  const handleSend = () => {
    if (!input.trim() || !activeConversation || !user) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation,
      senderId: user.id,
      senderType: "agent",
      content: input.trim(),
      timestamp: new Date(),
      status: "sent",
    };

    setAgentMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newMessage],
    }));
    setInput("");
  };

  const handleResolve = () => {
    console.log("Ticket resolved:", activeConversation);
  };

  const handleEscalate = () => {
    console.log("Ticket escalated:", activeConversation);
  };

  if (!user) return null;

  const mockCustomer = {
    id: "cust-1",
    name: "Rahul Sharma",
    phone: "+919876543210",
    username: null,
    password: null,
    role: "customer",
    status: "online",
  };

  const mockLoans = [
    {
      id: "loan-1",
      customerId: "cust-1",
      loanType: "Business",
      amount: 500000,
      status: "under_review" as const,
      applicationDate: new Date("2025-01-05"),
    },
  ];

  return (
    <div className="h-screen flex bg-background">
      {/* Ticket Queue Sidebar */}
      <div className="w-80 border-r flex flex-col bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Support Queue</h2>
            <Badge variant="secondary">{mockConversations.length}</Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {mockConversations.map((conv) => (
              <TicketCard
                key={conv.id}
                conversation={conv}
                customerName={conv.customerName}
                lastMessage={conv.lastMessage}
                isActive={activeConversation === conv.id}
                onClick={() => setActiveConversation(conv.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Conversation Panel */}
      <div className="flex-1 flex flex-col">
        {activeConv ? (
          <>
            <header className="border-b bg-card px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {activeConv.customerName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{activeConv.customerName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeConv.category?.replace("_", " ")} • {activeConv.priority} priority
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCustomerInfo(!showCustomerInfo)}
                    data-testid="button-toggle-info"
                  >
                    {showCustomerInfo ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" data-testid="button-actions">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleResolve}>
                        <Check className="mr-2 h-4 w-4" />
                        Resolve Ticket
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleEscalate}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Escalate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <X className="mr-2 h-4 w-4" />
                        Close Conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      logout();
                      setLocation("/");
                    }}
                    data-testid="button-logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-2 max-w-4xl mx-auto">
                {currentMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.senderType === "agent"}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t bg-card p-4">
              <div className="flex flex-wrap gap-2 mb-3 max-w-4xl mx-auto">
                {quickReplies.map((reply) => (
                  <QuickReplyButton
                    key={reply}
                    text={reply}
                    onClick={() => setInput(reply)}
                  />
                ))}
              </div>
              
              <div className="flex gap-2 max-w-4xl mx-auto">
                <Textarea
                  placeholder="Type your response..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="min-h-[80px] resize-none"
                  data-testid="input-message"
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
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <UserIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a ticket to start conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Customer Info Panel */}
      {showCustomerInfo && activeConv && (
        <div className="w-80 border-l bg-card overflow-y-auto">
          <CustomerInfoPanel customer={mockCustomer} loanApplications={mockLoans} />
        </div>
      )}
    </div>
  );
}
