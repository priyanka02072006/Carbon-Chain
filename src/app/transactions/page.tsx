import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "TXN-7a2b9cde",
    date: "2024-06-10",
    type: "Mint",
    project: "Sundarban Restoration",
    amount: 1200,
    status: "Completed",
  },
  {
    id: "TXN-f4e61ab3",
    date: "2024-06-09",
    type: "Transfer",
    details: "From 'Panchayat A' to 'NGO B'",
    amount: 500,
    status: "Completed",
  },
  {
    id: "TXN-8d0c5f7e",
    date: "2024-06-08",
    type: "Mint",
    project: "Vembanad Lake Initiative",
    amount: 1500,
    status: "Completed",
  },
    {
    id: "TXN-3b9e2a4f",
    date: "2024-06-07",
    type: "Retirement",
    details: "Retired by 'Corporate Partner X'",
    amount: 1000,
    status: "Completed",
  },
  {
    id: "TXN-c1a5d8b3",
    date: "2024-06-05",
    type: "Mint",
    project: "Pichavaram Plantation",
    amount: 850,
    status: "Pending",
  },
    {
    id: "TXN-9f8e7d6c",
    date: "2024-06-02",
    type: "Transfer",
    details: "From 'NGO B' to 'Community C'",
    amount: 250,
    status: "Completed",
  },
    {
    id: "TXN-e4d3c2b1",
    date: "2024-05-28",
    type: "Mint",
    project: "Bhitarkanika Conservation",
    amount: 2500,
    status: "Completed",
  },
];


export default function TransactionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Ledger</CardTitle>
        <CardDescription>
          An immutable record of all carbon credit transactions on the CarbonChain registry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Amount (CO2e tons)</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>
                    <Badge variant={tx.type === 'Mint' ? 'default' : 'secondary'}>{tx.type}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{tx.project || tx.details}</TableCell>
                <TableCell className="text-right font-medium">{tx.amount.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                    <Badge variant={tx.status === 'Completed' ? 'outline' : 'destructive'}
                    className={
                        tx.status === 'Completed' ? 'border-green-500 text-green-700' :
                        tx.status === 'Pending' ? 'border-yellow-500 text-yellow-700' : ''
                    }
                    >
                    {tx.status}
                    </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
