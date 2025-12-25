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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const users = [
  {
    name: "Sundarban Community Collective",
    email: "contact@sundarbancc.org",
    role: "Community",
    location: "West Bengal",
    joined: "2023-03-15",
    avatar: "SC",
    avatarImg: "https://picsum.photos/40/40?random=1"
  },
  {
    name: "Pichavaram Panchayat",
    email: "sarpanch@pichavaram.gov.in",
    role: "Panchayat",
    location: "Tamil Nadu",
    joined: "2023-05-20",
    avatar: "PP",
    avatarImg: "https://picsum.photos/40/40?random=2"
  },
  {
    name: "Coastal Green Initiative",
    email: "info@coastalgreen.org",
    role: "NGO",
    location: "Odisha",
    joined: "2023-08-01",
    avatar: "CG",
    avatarImg: "https://picsum.photos/40/40?random=3"
  },
  {
    name: "Kutch Ecological Foundation",
    email: "admin@kutchef.org",
    role: "NGO",
    location: "Gujarat",
    joined: "2023-11-12",
    avatar: "KE",
    avatarImg: "https://picsum.photos/40/40?random=4"
  },
  {
    name: "Vembanad Fisherfolk Union",
    email: "union@vembanad.local",
    role: "Community",
    location: "Kerala",
    joined: "2024-01-05",
    avatar: "VF",
    avatarImg: "https://picsum.photos/40/40?random=5"
  },
    {
    name: "Mahanadi Delta Authority",
    email: "contact@mda.gov.in",
    role: "Panchayat",
    location: "Odisha",
    joined: "2024-02-21",
    avatar: "MD",
    avatarImg: "https://picsum.photos/40/40?random=6"
  }
];

const roleVariant: { [key: string]: "default" | "secondary" | "outline" } = {
    NGO: 'default',
    Community: 'secondary',
    Panchayat: 'outline',
}


export default function UsersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Onboarded NGOs, communities, and coastal panchayats on the CarbonChain platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatarImg} alt={user.name} data-ai-hint="organization logo"/>
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
                </TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
