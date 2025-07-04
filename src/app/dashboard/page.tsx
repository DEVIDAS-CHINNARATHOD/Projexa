
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const purchasedProjects = [
    { id: '1', title: 'Smart Attendance System', date: '2024-05-10', price: 499 },
    { id: '2', title: 'AI-Powered Blog Generator', date: '2024-04-22', price: 650 },
];

const requestedProjects = [
    { id: 'req1', title: 'MERN-based Chat App', date: '2024-05-01', status: 'Approved' },
    { id: 'req2', title: 'Fitness Tracker Mobile App', date: '2024-05-15', status: 'Pending' },
    { id: 'req3', title: 'Portfolio Website', date: '2024-04-18', status: 'Rejected' },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl mb-10">Your Dashboard</h1>
      
      <Card className="mb-10 bg-secondary/30 border-primary/50">
        <CardHeader>
            <CardTitle>Your User Information</CardTitle>
            <CardDescription>Use this UID to grant yourself admin access.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Your Firebase UID is:</p>
            <code className="text-lg font-bold font-code bg-muted px-2 py-1 rounded-md mt-1 block overflow-x-auto">
            {user.uid}
            </code>
            <p className="text-xs text-muted-foreground mt-4">
                Copy this value and add it to the <code className="font-code bg-muted px-1 rounded-md">.env</code> file in the root of your project, like this:
            </p>
            <pre className="text-sm bg-background p-3 rounded-md overflow-x-auto font-code mt-2">
{`NEXT_PUBLIC_ADMIN_UIDS=${user.uid}`}
            </pre>
        </CardContent>
      </Card>
      
      <div className="grid gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Purchased Projects</CardTitle>
            <CardDescription>Here are the projects you have purchased. You can download the files from here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchasedProjects.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>₹{p.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Project Requests</CardTitle>
            <CardDescription>Track the status of your custom project requests.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestedProjects.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.title}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={r.status === 'Approved' ? 'default' : r.status === 'Pending' ? 'secondary' : 'destructive'}>
                        {r.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
