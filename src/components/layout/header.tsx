import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, UserCircle, Sprout, LayoutDashboard, FileCheck, Coins, ArrowRightLeft, Users, Home, Info, Settings, Menu, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/mrv-system", label: "MRV System", icon: Map },
  { href: "/verify-data", label: "Verify Data", icon: FileCheck },
  { href: "/tokenize-credits", label: "Tokenize Credits", icon: Coins },
  { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
  { href: "/users", label: "Users", icon: Users },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
      <Link href="/" className="flex items-center gap-2 mr-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Sprout className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-semibold text-primary font-headline hidden md:block">CarbonChain</h1>
      </Link>

      <div className="flex-1 items-center gap-2 hidden md:flex">
        <nav className="flex items-center gap-1">
          {menuItems.map((item) => (
            <Button asChild variant="ghost" key={item.href}
              className={cn("text-sm font-medium",
                pathname === item.href ? "text-primary-foreground" : "text-muted-foreground"
              )}
            >
              <Link href={item.href}>
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-background/90 backdrop-blur-sm">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Sprout className="w-6 h-6 text-primary" />
              </div>
              <span className="text-primary font-headline">CarbonChain</span>
            </Link>
            {menuItems.map((item) => (
              <Link href={item.href} key={item.href} className={cn("flex items-center gap-4 text-muted-foreground hover:text-foreground", pathname === item.href && 'text-foreground')}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle className="h-6 w-6" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}

