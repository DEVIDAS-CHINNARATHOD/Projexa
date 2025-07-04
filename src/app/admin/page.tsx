"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const monthlySalesData = [
  { month: "Jan", sales: 12, revenue: 84000 },
  { month: "Feb", sales: 19, revenue: 133000 },
  { month: "Mar", sales: 15, revenue: 105000 },
  { month: "Apr", sales: 22, revenue: 154000 },
  { month: "May", sales: 25, revenue: 175000 },
  { month: "Jun", sales: 18, revenue: 126000 },
];

const userGrowthData = [
    { date: "2024-01-01", users: 150 },
    { date: "2024-02-01", users: 280 },
    { date: "2024-03-01", users: 450 },
    { date: "2024-04-01", users: 600 },
    { date: "2024-05-01", users: 820 },
    { date: "2024-06-01", users: 1100 },
  ];

export default function AdminPage() {
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
      <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl mb-10">Admin Panel</h1>
      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          <TabsTrigger value="requests">Manage Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Upload, edit, or remove projects from the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Project management interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Requests</CardTitle>
              <CardDescription>Approve or reject custom project requests from users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Request management interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                    <CardTitle>Monthly Sales</CardTitle>
                    <CardDescription>Number of projects sold and revenue generated per month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[300px] w-full">
                            <BarChart accessibilityLayer data={monthlySalesData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" hide />
                                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" hide />
                                <Tooltip
                                    cursor={false}
                                    content={<ChartTooltipContent
                                        formatter={(value, name) => {
                                            if (name === "revenue") {
                                                return `₹${Number(value).toLocaleString()}`
                                            }
                                            return `${value} sales`;
                                        }}
                                        indicator="dot" 
                                    />}
                                />
                                <Bar dataKey="sales" name="Sales" yAxisId="left" fill="hsl(var(--primary))" radius={4} />
                                <Bar dataKey="revenue" name="Revenue" yAxisId="right" fill="hsl(var(--accent))" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>Total registered users over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <LineChart accessibilityLayer data={userGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                            />
                            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
