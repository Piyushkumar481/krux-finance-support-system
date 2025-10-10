import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Conversation } from "@shared/schema";

interface TicketCardProps {
  conversation: Conversation;
  customerName: string;
  lastMessage: string;
  isActive?: boolean;
  onClick?: () => void;
}

const priorityColors = {
  low: "border-chart-3",
  medium: "border-chart-4",
  high: "border-chart-1",
  urgent: "border-destructive",
};

const statusVariants = {
  active: "default" as const,
  pending: "secondary" as const,
  resolved: "outline" as const,
  escalated: "destructive" as const,
};

export default function TicketCard({
  conversation,
  customerName,
  lastMessage,
  isActive = false,
  onClick,
}: TicketCardProps) {
  return (
    <div
      className={cn(
        "p-4 border-l-4 cursor-pointer hover-elevate active-elevate-2 transition-colors rounded-md",
        priorityColors[conversation.priority as keyof typeof priorityColors] || priorityColors.medium,
        isActive ? "bg-accent" : "bg-card"
      )}
      onClick={onClick}
      data-testid={`ticket-${conversation.id}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">{customerName}</span>
        </div>
        <Badge variant={statusVariants[conversation.status as keyof typeof statusVariants] || "secondary"} className="text-xs">
          {conversation.status}
        </Badge>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
        {lastMessage}
      </p>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>
            {new Date(conversation.lastMessageAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        {conversation.category && (
          <Badge variant="outline" className="text-xs">
            {conversation.category.replace("_", " ")}
          </Badge>
        )}
      </div>
    </div>
  );
}
