import { SettlementItem, UserRole } from "@/types/settlement";

const mockBorrowerName = "James Thornton";
const mockBrokerName = "Apex Finance Group";

export function filterSettlementsByRole(role: UserRole, rows: SettlementItem[]) {
  if (role === "Borrower") {
    return rows.filter((row) => row.borrowerName === mockBorrowerName);
  }
  if (role === "Broker") {
    return rows.filter((row) => row.brokerName === mockBrokerName);
  }
  return rows;
}
