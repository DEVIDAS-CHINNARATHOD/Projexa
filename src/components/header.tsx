"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Code, Menu, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    const navLinks = [
        { href: "/projects", label: "Projects" },
        { href: "/request", label: "Request a Project" },
        { href: "/chatbot", label: "AI Assistant" },
    ];

    if (user) {
        navLinks.push({ href: "/admin", label: "Admin" });
    }

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length > 1) {
            return names[0][0] + names[names.length - 1][0];
        }
        return names[0][0];
    }

    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="/" className="mr-6 flex items-center" prefetch={false}>
                        <Code className="h-6 w-6 text-primary" />
                        <span className="sr-only">Projexa AI</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        {navLinks.map((link) => (
                             <Link
                                key={link.href}
                                href={link.href}
                                className={cn("flex w-full items-center py-2 text-lg font-semibold", pathname === link.href ? "text-primary" : "text-foreground/80 hover:text-foreground")}
                                prefetch={false}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="/" className="mr-6 hidden lg:flex items-center gap-2" prefetch={false}>
                <Code className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg font-headline">Projexa AI</span>
            </Link>
            <nav className="hidden w-full justify-center lg:flex items-center gap-4 sm:gap-6">
                 {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn("text-sm font-medium transition-colors", pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary")}
                        prefetch={false}
                    >
                        {link.label}
                    </Link>
                 ))}
            </nav>
            <div className="ml-auto">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{user.displayName || 'My Account'}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild><Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
