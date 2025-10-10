import CustomerInfoPanel from "../CustomerInfoPanel";

export default function CustomerInfoPanelExample() {
  const mockCustomer = {
    id: "cust-123",
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
      customerId: "cust-123",
      loanType: "Business",
      amount: 500000,
      status: "under_review" as const,
      applicationDate: new Date("2025-01-05"),
    },
    {
      id: "loan-2",
      customerId: "cust-123",
      loanType: "Personal",
      amount: 200000,
      status: "approved" as const,
      applicationDate: new Date("2024-12-15"),
    },
  ];

  return (
    <div className="max-w-md">
      <CustomerInfoPanel customer={mockCustomer} loanApplications={mockLoans} />
    </div>
  );
}
