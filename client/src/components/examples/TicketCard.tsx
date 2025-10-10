import TicketCard from "../TicketCard";

export default function TicketCardExample() {
  const mockConversation = {
    id: "conv-1",
    customerId: "cust-1",
    agentId: "agent-1",
    status: "active" as const,
    priority: "high" as const,
    category: "loan_application" as const,
    lastMessageAt: new Date(),
    createdAt: new Date(),
  };

  return (
    <div className="p-4 space-y-4 max-w-md">
      <TicketCard
        conversation={mockConversation}
        customerName="Rahul Sharma"
        lastMessage="I need help with my business loan application documents"
        isActive={true}
        onClick={() => console.log("Ticket clicked")}
      />
      <TicketCard
        conversation={{ ...mockConversation, status: "pending", priority: "medium" }}
        customerName="Priya Patel"
        lastMessage="What is the status of my application?"
        onClick={() => console.log("Ticket clicked")}
      />
    </div>
  );
}
