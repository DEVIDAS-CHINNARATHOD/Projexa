"use client";

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProjectSuggestions } from "./actions";
import type { SuggestProjectIdeasOutput } from '@/ai/flows/suggest-project-ideas';
import { Badge } from '@/components/ui/badge';
import { Bot, Code, Lightbulb, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  branch: z.string().min(2, "Branch is too short").max(50, "Branch is too long"),
  skills: z.string().min(2, "Skills description is too short"),
  interests: z.string().min(2, "Interests description is too short"),
});

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="lg" className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
            Generate Ideas
        </Button>
    )
}

export default function ChatbotClient() {
  const [state, formAction] = useActionState(getProjectSuggestions, { message: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: "",
      skills: "",
      interests: "",
    },
  });
  
  const { pending } = useFormStatus();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Bot className="text-primary"/> Tell Us About Yourself</CardTitle>
                <CardDescription>The more details you provide, the better the suggestions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="branch"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field of Study / Branch</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Computer Science, Mechanical Engineering" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Technical Skills</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g., React, Node.js, Python, Firebase, Machine Learning" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="interests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Interests & Passions</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g., Gaming, Healthcare, Finance, AI Art" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SubmitButton />
                    </form>
                </Form>
            </CardContent>
        </Card>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-headline text-center lg:text-left">Project Suggestions</h2>
            {pending && (
                <div className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            )}
            {state.suggestions && state.suggestions.map((project, index) => (
                <ProjectIdeaCard key={index} project={project} />
            ))}
            {state.message && !state.suggestions && !pending && (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <Lightbulb className="w-10 h-10 mb-4" />
                    <p>{state.message}</p>
                 </div>
            )}
        </div>
    </div>
  );
}

function ProjectIdeaCard({ project }: { project: SuggestProjectIdeasOutput['suggestions'][0] }) {
    return (
        <Card className="bg-card/50 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <CardHeader>
                <CardTitle className="font-headline">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Tech Stack:</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-code">{tech}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
