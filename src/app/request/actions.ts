"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  email: z.string().email("Please enter a valid email address."),
  description: z.string().min(20, "Please provide a more detailed description.").max(1000, "Description is too long."),
  deadline: z.string().optional(),
  budget: z.coerce.number().min(0, "Budget cannot be negative.").optional(),
});

type State = {
    message?: string | null;
    success?: boolean;
    errors?: {
        name?: string[];
        email?: string[];
        description?: string[];
        deadline?: string[];
        budget?: string[];
    }
}

// Simulate a delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function submitRequest(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    description: formData.get('description'),
    deadline: formData.get('deadline'),
    budget: formData.get('budget'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to submit request.',
      success: false,
    };
  }
  
  try {
    // Here you would typically save the data to a database
    await sleep(1500);
    console.log("New project request received:", validatedFields.data);
    
    return { 
        message: "Thank you! Your request has been submitted successfully. We'll get back to you shortly.",
        success: true,
    };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while submitting your request.", success: false };
  }
}
