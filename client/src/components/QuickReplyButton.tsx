import { Button } from "@/components/ui/button";

interface QuickReplyButtonProps {
  text: string;
  onClick: () => void;
}

export default function QuickReplyButton({ text, onClick }: QuickReplyButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="text-xs"
      data-testid={`quick-reply-${text.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {text}
    </Button>
  );
}
