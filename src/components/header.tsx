"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Code, Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/request", label: "Request a Project" },
    { href: "/chatbot", label: "AI Assistant" },
];

export default function Header() {
    const pathname = usePathname();

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/admin" className="w-full cursor-pointer">Admin</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
