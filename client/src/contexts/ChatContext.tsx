import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Message, Conversation } from "@shared/schema";

interface ChatContextType {
  conversations: Conversation[];
  messages: { [conversationId: string]: Message[] };
  activeConversationId: string | null;
  setActiveConversation: (id: string | null) => void;
  addMessage: (conversationId: string, message: Message) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const stored = localStorage.getItem("krux-conversations");
    return stored ? JSON.parse(stored) : [];
  });

  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>(() => {
    const stored = localStorage.getItem("krux-messages");
    return stored ? JSON.parse(stored) : {};
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("krux-conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("krux-messages", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (conversationId: string, message: Message) => {
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), message],
    }));
    
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, lastMessageAt: message.timestamp }
          : conv
      )
    );
  };

  const addConversation = (conversation: Conversation) => {
    setConversations((prev) => [conversation, ...prev]);
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, ...updates } : conv))
    );
  };

  const setActiveConversation = (id: string | null) => {
    setActiveConversationId(id);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        activeConversationId,
        setActiveConversation,
        addMessage,
        addConversation,
        updateConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
