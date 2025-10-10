import { CheckCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
  isOwn?: boolean;
}

export default function MessageBubble({ message, isOwn = false }: MessageBubbleProps) {
  const isBot = message.senderType === "bot";
  const isAgent = message.senderType === "agent";
  
  return (
    <div
      className={cn(
        "flex w-full mb-2",
        isOwn ? "justify-end" : "justify-start"
      )}
      data-testid={`message-${message.id}`}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 text-sm",
          isOwn
            ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
            : isAgent
            ? "bg-chart-2 text-white rounded-2xl rounded-tl-sm"
            : "bg-card rounded-2xl rounded-tl-sm"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div
          className={cn(
            "flex items-center gap-1 mt-1 text-xs",
            isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          <span>
            {new Date(message.timestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isOwn && (
            <span>
              {message.status === "read" ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
