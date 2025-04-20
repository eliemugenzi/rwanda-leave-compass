
interface LeavePolicyItem {
  title: string;
  description: string;
}

const policyItems: LeavePolicyItem[] = [
  {
    title: "Annual Leave/PTO",
    description: "Employees are entitled to 20 days of annual leave per year."
  },
  {
    title: "Sick Leave",
    description: "Up to 12 days of paid sick leave per year with medical certificate required for leaves exceeding 3 consecutive days."
  },
  {
    title: "Maternity Leave",
    description: "Female employees are entitled to 12 weeks (84 days) of paid maternity leave."
  },
  {
    title: "Paternity Leave",
    description: "Male employees are entitled to 2 weeks (14 days) of paid paternity leave."
  }
];

export function LeavePolicy() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-4">Leave Policy Information</h3>
      <div className="space-y-4 text-sm">
        {policyItems.map((item) => (
          <div key={item.title}>
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
