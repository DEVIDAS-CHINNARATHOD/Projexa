"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Loader2, Upload } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


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

const projectFormSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    description: z.string().min(20, { message: "Description must be at least 20 characters." }),
    techStack: z.string().min(1, { message: "Please enter at least one tech stack (comma-separated)." }),
    price: z.coerce.number().positive({ message: "Please enter a valid positive price." }),
    imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
    imageHint: z.string().min(2, { message: "Please provide a short hint for the image." }),
});

function ProjectUploadForm() {
    const form = useForm<z.infer<typeof projectFormSchema>>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: "",
            description: "",
            techStack: "",
            price: undefined,
            imageUrl: "",
            imageHint: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof projectFormSchema>) {
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("Project data submitted:", values);
        alert("Project submitted successfully! Check the console for data.");
        
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., MERN-based Chat App" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A real-time chat application built on the MERN stack..." className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="techStack"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tech Stack (comma-separated)</FormLabel>
                                <FormControl>
                                    <Input placeholder="MongoDB, Express, React, Node.js" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price (INR)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="799" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Primary Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://placehold.co/800x600.png" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="imageHint"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image Hint</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., chat application" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Upload Project
                </Button>
            </form>
        </Form>
    )
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl mb-10">Admin Panel</h1>
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
