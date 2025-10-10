import QuickReplyButton from "../QuickReplyButton";

export default function QuickReplyButtonExample() {
  const quickReplies = [
    "Thank you for contacting us",
    "Let me check that for you",
    "I'll escalate this to our team",
    "Your application is being processed",
  ];

  return (
    <div className="p-4 flex flex-wrap gap-2">
      {quickReplies.map((reply) => (
        <QuickReplyButton
          key={reply}
          text={reply}
          onClick={() => console.log("Quick reply:", reply)}
        />
      ))}
    </div>
  );
}
