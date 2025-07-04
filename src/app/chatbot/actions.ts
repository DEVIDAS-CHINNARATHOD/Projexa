"use server";

import { suggestProjectIdeas, type SuggestProjectIdeasInput, type SuggestProjectIdeasOutput } from "@/ai/flows/suggest-project-ideas";
import { z } from "zod";

const formSchema = z.object({
  branch: z.string().min(2, "Branch is too short").max(50, "Branch is too long"),
  skills: z.string().min(2, "Skills description is too short"),
  interests: z.string().min(2, "Interests description is too short"),
});

type State = {
    message?: string | null;
    suggestions?: SuggestProjectIdeasOutput['suggestions'];
    errors?: {
        branch?: string[];
        skills?: string[];
        interests?: string[];
    }
}

export async function getProjectSuggestions(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = formSchema.safeParse({
    branch: formData.get('branch'),
    skills: formData.get('skills'),
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Get Suggestions.',
    };
  }
  
  const { branch, skills, interests } = validatedFields.data;

  try {
    const result = await suggestProjectIdeas({ branch, skills, interests });
    if (result.suggestions && result.suggestions.length > 0) {
        return { suggestions: result.suggestions, message: "Here are some project ideas for you!" };
    }
    return { message: "Could not generate suggestions based on your input." };
  } catch (error) {
    console.error(error);
    return { message: "An error occurred while generating project ideas." };
  }
}
