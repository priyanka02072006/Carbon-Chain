'use server';

/**
 * @fileOverview This file defines a Genkit flow to determine a carbon credit score based on uploaded plantation and restoration data.
 *
 * - determineCarbonCreditScore - An async function that takes plantation and restoration data as input and returns a carbon credit score.
 * - DetermineCarbonCreditScoreInput - The input type for the determineCarbonCreditScore function.
 * - DetermineCarbonCreditScoreOutput - The return type for the determineCarbonCreditScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetermineCarbonCreditScoreInputSchema = z.object({
  plantationData: z
    .string()
    .describe('The plantation data, including species, area, and location.'),
  restorationData: z
    .string()
    .describe('The restoration data, including techniques used, area, and location.'),
});
export type DetermineCarbonCreditScoreInput = z.infer<
  typeof DetermineCarbonCreditScoreInputSchema
>;

const DetermineCarbonCreditScoreOutputSchema = z.object({
  carbonCreditScore: z
    .number()
    .describe(
      'The calculated carbon credit score based on the provided data.'
    ),
  justification: z.string().describe('The reasoning behind the assigned score.'),
});
export type DetermineCarbonCreditScoreOutput = z.infer<
  typeof DetermineCarbonCreditScoreOutputSchema
>;

export async function determineCarbonCreditScore(
  input: DetermineCarbonCreditScoreInput
): Promise<DetermineCarbonCreditScoreOutput> {
  return determineCarbonCreditScoreFlow(input);
}

const determineCarbonCreditScorePrompt = ai.definePrompt({
  name: 'determineCarbonCreditScorePrompt',
  input: {schema: DetermineCarbonCreditScoreInputSchema},
  output: {schema: DetermineCarbonCreditScoreOutputSchema},
  prompt: `You are an expert in evaluating carbon credit scores for blue carbon ecosystem restoration projects.

  Based on the following plantation and restoration data, determine a carbon credit score on a scale of 0 to 100, with 100 being the highest possible score. Provide a justification for the assigned score.

  Plantation Data: {{{plantationData}}}
  Restoration Data: {{{restorationData}}}

  Consider factors such as:
  - The area of the plantation/restoration site
  - The species planted/restored and their carbon sequestration potential
  - The techniques used for restoration
  - The location of the site and its environmental conditions

  Output the carbon credit score and a detailed justification for the score.
`,
});

const determineCarbonCreditScoreFlow = ai.defineFlow(
  {
    name: 'determineCarbonCreditScoreFlow',
    inputSchema: DetermineCarbonCreditScoreInputSchema,
    outputSchema: DetermineCarbonCreditScoreOutputSchema,
  },
  async input => {
    const {output} = await determineCarbonCreditScorePrompt(input);
    return output!;
  }
);
