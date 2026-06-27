'use server';

/**
 * @fileOverview A flow for analyzing uploaded data and supporting evidence for blue carbon projects.
 *
 * - analyzeUploadedData - A function that orchestrates the analysis process.
 * - AnalyzeUploadedDataInput - The input type for the analyzeUploadedData function.
 * - AnalyzeUploadedDataOutput - The return type for the analyzeUploadedData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUploadedDataInputSchema = z.object({
  plantationData: z
    .string()
    .describe('Verified plantation and restoration data, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'),
  supportingEvidence: z
    .string()
    .describe(
      'Supporting evidence for the plantation data, such as images or documents, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type AnalyzeUploadedDataInput = z.infer<typeof AnalyzeUploadedDataInputSchema>;

const AnalyzeUploadedDataOutputSchema = z.object({
  validationResult: z.object({
    isValid: z.boolean().describe('Whether the plantation data is valid.'),
    confidenceScore: z
      .number()
      .describe('The confidence score of the validation, from 0 to 1.'),
    reason: z.string().describe('The reason for the validation result.'),
  }),
  carbonCreditScore: z
    .number()
    .describe('The estimated carbon credit score based on the uploaded data.'),
});
export type AnalyzeUploadedDataOutput = z.infer<typeof AnalyzeUploadedDataOutputSchema>;

export async function analyzeUploadedData(
  input: AnalyzeUploadedDataInput
): Promise<AnalyzeUploadedDataOutput> {
  return analyzeUploadedDataFlow(input);
}

const analyzeDataPrompt = ai.definePrompt({
  name: 'analyzeDataPrompt',
  input: {schema: AnalyzeUploadedDataInputSchema},
  output: {schema: AnalyzeUploadedDataOutputSchema},
  prompt: `You are an assistant that validates blue carbon project data.

You will receive plantation data and supporting evidence.  Assess the provided plantation data using the supporting evidence to validate claims and calculate carbon credit score based on the uploaded plantation and restoration data.

Consider the following factors when validating the plantation data:

- Consistency of the data with the supporting evidence
- Completeness of the data
- Accuracy of the data
- Reliability of the data source

Based on your analysis, determine whether the plantation data is valid and provide a confidence score (0 to 1) and a reason for your validation result. Also, determine the carbon credit score based on the uploaded plantation and restoration data.

Plantation Data: {{media url=plantationData}}
Supporting Evidence: {{media url=supportingEvidence}}`,
});

const analyzeUploadedDataFlow = ai.defineFlow(
  {
    name: 'analyzeUploadedDataFlow',
    inputSchema: AnalyzeUploadedDataInputSchema,
    outputSchema: AnalyzeUploadedDataOutputSchema,
  },
  async input => {
    const {output} = await analyzeDataPrompt(input);
    return output!;
  }
);
