"use client";

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from 'react';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Send } from 'lucide-react';
import { submitRequest } from './actions';
import { cn } from '@/lib/utils';


const formSchema = z.object({
    name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
    email: z.string().email("Please enter a valid email address."),
    description: z.string().min(20, "Please provide a more detailed description.").max(1000, "Description is too long."),
    deadline: z.string().optional(),
    budget: z.string().optional(), // Keep as string for the form input
  });

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="lg" className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Submit Request
        </Button>
    )
}

export default function RequestClientForm() {
  const [state, formAction] = useActionState(submitRequest, { message: null, errors: {}, success: false });
  const formRef = React.useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      deadline: "",
      budget: "",
    },
  });

  React.useEffect(() => {
    if (state.success && formRef.current) {
      form.reset();
      formRef.current.reset();
    }
  }, [state.success, form]);


  if (state.success && state.message) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-96 bg-card/50">
            <CheckCircle className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
            <p className="text-muted-foreground">{state.message}</p>
        </div>
    )
  }

  return (
    <Form {...form}>
        <form 
            ref={formRef}
            action={formAction} 
            className="space-y-6"
            onSubmit={form.handleSubmit(data => formAction(new FormData(formRef.current!)))}
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage>{state.errors?.name?.[0]}</FormMessage>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage>{state.errors?.email?.[0]}</FormMessage>
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe your project requirements in detail..." className="min-h-[150px]" {...field} />
                        </FormControl>
                         <FormMessage>{state.errors?.description?.[0]}</FormMessage>
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ideal Deadline</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                             <FormMessage>{state.errors?.deadline?.[0]}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Budget (INR)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 10000" {...field} />
                            </FormControl>
                             <FormMessage>{state.errors?.budget?.[0]}</FormMessage>
                        </FormItem>
                    )}
                />
            </div>
            
            <SubmitButton />

             {state.message && !state.success && (
                <p className={cn("text-sm font-medium text-center", !state.success ? "text-destructive" : "text-primary")}>
                    {state.message}
                </p>
             )}
        </form>
    </Form>
  );
}
