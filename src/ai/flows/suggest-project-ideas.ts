'use server';

/**
 * @fileOverview AI-powered project idea suggestion flow.
 *
 * - suggestProjectIdeas - A function that suggests project ideas based on user input.
 * - SuggestProjectIdeasInput - The input type for the suggestProjectIdeas function.
 * - SuggestProjectIdeasOutput - The return type for the suggestProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectIdeasInputSchema = z.object({
  branch: z.string().describe('The user\u2019s field of study or area of expertise.'),
  skills: z.string().describe('The user\u2019s existing technical skills.'),
  interests: z.string().describe('The user\u2019s interests and passions.'),
});
export type SuggestProjectIdeasInput = z.infer<typeof SuggestProjectIdeasInputSchema>;

const SuggestProjectIdeasOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string().describe('The title of the project idea.'),
      techStack: z.array(z.string()).describe('The tech stack for the project.'),
      description: z.string().describe('A brief description of the project.'),
    })
  ).describe('A list of project suggestions.'),
});
export type SuggestProjectIdeasOutput = z.infer<typeof SuggestProjectIdeasOutputSchema>;

export async function suggestProjectIdeas(input: SuggestProjectIdeasInput): Promise<SuggestProjectIdeasOutput> {
  return suggestProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectIdeasPrompt',
  input: {schema: SuggestProjectIdeasInputSchema},
  output: {schema: SuggestProjectIdeasOutputSchema},
  prompt: `You are an AI project idea assistant. You will suggest 3-5 project ideas based on the user's input.

  Branch: {{{branch}}}
  Skills: {{{skills}}}
  Interests: {{{interests}}}

  Project Suggestions:
  `,
});

const suggestProjectIdeasFlow = ai.defineFlow(
  {
    name: 'suggestProjectIdeasFlow',
    inputSchema: SuggestProjectIdeasInputSchema,
    outputSchema: SuggestProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
