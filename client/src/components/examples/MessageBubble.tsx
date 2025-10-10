import MessageBubble from "../MessageBubble";

export default function MessageBubbleExample() {
  const mockMessages = [
    {
      id: "1",
      conversationId: "conv-1",
      senderId: "bot",
      senderType: "bot" as const,
      content: "Hello! Welcome to KRUX Finance. How can I assist you today?",
      timestamp: new Date(),
      status: "sent" as const,
    },
    {
      id: "2",
      conversationId: "conv-1",
      senderId: "user-1",
      senderType: "customer" as const,
      content: "I need information about business loans",
      timestamp: new Date(),
      status: "read" as const,
    },
    {
      id: "3",
      conversationId: "conv-1",
      senderId: "agent-1",
      senderType: "agent" as const,
      content: "I'm here to help! Let me provide you with details about our business loan options.",
      timestamp: new Date(),
      status: "sent" as const,
    },
  ];

  return (
    <div className="p-4 space-y-2 max-w-2xl">
      <MessageBubble message={mockMessages[0]} isOwn={false} />
      <MessageBubble message={mockMessages[1]} isOwn={true} />
      <MessageBubble message={mockMessages[2]} isOwn={false} />
    </div>
  );
}
