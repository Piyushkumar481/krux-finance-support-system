import { User, Phone, FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { User as UserType, LoanApplication } from "@shared/schema";

interface CustomerInfoPanelProps {
  customer: UserType;
  loanApplications?: LoanApplication[];
}

const loanStatusColors = {
  pending: "secondary" as const,
  under_review: "default" as const,
  approved: "outline" as const,
  rejected: "destructive" as const,
};

export default function CustomerInfoPanel({ customer, loanApplications = [] }: CustomerInfoPanelProps) {
  return (
    <div className="p-6 space-y-4" data-testid="customer-info-panel">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{customer.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-mono text-xs">{customer.phone || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Customer ID</span>
            <span className="font-mono text-xs">{customer.id}</span>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="loans">
          <AccordionTrigger className="text-sm">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Loan Applications ({loanApplications.length})
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {loanApplications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No loan applications
                </p>
              ) : (
                loanApplications.map((loan) => (
                  <Card key={loan.id} className="border">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{loan.loanType} Loan</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{loan.amount.toLocaleString()}
                          </p>
                        </div>
                        <Badge variant={loanStatusColors[loan.status as keyof typeof loanStatusColors]}>
                          {loan.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(loan.applicationDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
