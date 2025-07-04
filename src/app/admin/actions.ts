
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";

const projectFormSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    techStack: z.string().min(1, "Please enter at least one tech stack (comma-separated)."),
    price: z.coerce.number().positive("Please enter a valid positive price."),
    imageUrl: z.string().url("Please enter a valid image URL."),
    imageHint: z.string().min(2, "Please provide a short hint for the image."),
    tags: z.string().optional(),
});


type State = {
    message?: string | null;
    success?: boolean;
    errors?: {
        title?: string[];
        description?: string[];
        techStack?: string[];
        price?: string[];
        imageUrl?: string[];
        imageHint?: string[];
        tags?: string[];
    }
}

export async function uploadProject(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = projectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        techStack: formData.get('techStack'),
        price: formData.get('price'),
        imageUrl: formData.get('imageUrl'),
        imageHint: formData.get('imageHint'),
        tags: formData.get('tags'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to upload project.',
            success: false,
        };
    }

    const { title, description, techStack, price, imageUrl, imageHint, tags } = validatedFields.data;

    try {
        const newProject = {
            title,
            description,
            price,
            techStack: techStack.split(',').map(item => item.trim()),
            images: [{ url: imageUrl, hint: imageHint }],
            tags: tags ? tags.split(',').map(item => item.trim()) : [],
        };

        await addDoc(collection(db, "projects"), newProject);
        
    } catch (error) {
        console.error("Error adding document: ", error);
        return { message: "Database Error: Failed to upload project.", success: false };
    }

    revalidatePath('/projects');
    revalidatePath('/admin');
    
    return {
        message: `Project "${title}" uploaded successfully!`,
        success: true,
    }
}
