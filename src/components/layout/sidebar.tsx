import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sprout, LayoutDashboard, FileCheck, Coins, ArrowRightLeft, Users, Home, Info, Settings } from "lucide-react";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/verify-data", label: "Verify Data", icon: FileCheck },
  { href: "/tokenize-credits", label: "Tokenize Credits", icon: Coins },
  { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
  { href: "/users", label: "Users", icon: Users },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r" variant="sidebar">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary/20">
            <Sprout className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-primary font-headline">CarbonChain</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start"
                size="lg"
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
           <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/40/40" alt="User" data-ai-hint="person face" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-col hidden group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">nccr@gov.in</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
