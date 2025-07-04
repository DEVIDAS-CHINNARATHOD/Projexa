
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Upload, CheckCircle } from "lucide-react";

import React, { useEffect } from "react";
import { useActionState, useFormStatus } from 'react-dom';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { uploadProject } from "./actions";
import { Label } from "@/components/ui/label";


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

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="lg" className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Upload Project
        </Button>
    )
}

function ProjectUploadForm() {
    const initialState = { message: null, errors: {}, success: false };
    const [state, formAction] = useActionState(uploadProject, initialState);
    const formRef = React.useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    return (
        <form ref={formRef} action={formAction} className="space-y-6">
            {state.success && state.message && (
                 <Alert variant="default" className="bg-accent/20 border-accent/50 text-foreground">
                    <CheckCircle className="h-4 w-4 !text-accent" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
             {!state.success && state.message && (
                 <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
            
            <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" placeholder="e.g., MERN-based Chat App" required />
                {state.errors?.title && <p className="text-sm font-medium text-destructive">{state.errors.title[0]}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="A real-time chat application built on the MERN stack..." className="min-h-[120px]" required />
                {state.errors?.description && <p className="text-sm font-medium text-destructive">{state.errors.description[0]}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                    <Input id="techStack" name="techStack" placeholder="MongoDB, Express, React, Node.js" required />
                    {state.errors?.techStack && <p className="text-sm font-medium text-destructive">{state.errors.techStack[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price (INR)</Label>
                    <Input id="price" name="price" type="number" placeholder="799" required />
                    {state.errors?.price && <p className="text-sm font-medium text-destructive">{state.errors.price[0]}</p>}
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="imageUrl">Primary Image URL</Label>
                    <Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/800x600.png" required />
                    {state.errors?.imageUrl && <p className="text-sm font-medium text-destructive">{state.errors.imageUrl[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="imageHint">Image Hint</Label>
                    <Input id="imageHint" name="imageHint" placeholder="e.g., chat application" required />
                    {state.errors?.imageHint && <p className="text-sm font-medium text-destructive">{state.errors.imageHint[0]}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" name="tags" placeholder="e.g., Web Dev, AI, Full-stack" />
                {state.errors?.tags && <p className="text-sm font-medium text-destructive">{state.errors.tags[0]}</p>}
            </div>

            <SubmitButton />
        </form>
    )
}

export default function AdminPage() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push('/');
        }
    }, [user, loading, isAdmin, router]);
    
    if (loading || !user || !isAdmin) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl mb-2">
                Welcome, {user.displayName || 'Admin'}!
            </h1>
            <p className="text-lg text-muted-foreground">
                This is your central hub for managing projects, requests, and analytics.
            </p>
        </div>
      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          <TabsTrigger value="requests">Manage Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Project</CardTitle>
              <CardDescription>Fill in the details to add a project to the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ProjectUploadForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Requests</CardTitle>
              <CardDescription>Approve or reject custom project requests from users.</CardDescription>
            </Header>
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
