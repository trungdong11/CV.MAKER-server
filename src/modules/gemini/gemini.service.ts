import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private modelMap = new Map<number, string>([
    [0, 'gemini-pro'],
    [1, 'gemini-1.5-flash'],
    [2, 'gemini-1.5-flash-latest'],
    [3, 'gemini-1.5-pro'],
    [4, 'gemini-1.5-pro-latest'],
  ]);

  private async callGeminiSummarize(modelName: string, prompt: string): Promise<string | null> {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? '');
    const generationConfig = {
      temperature: 0.2,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      this.logger.error(`Call Gemini error with model ${modelName}: ${error.message}`, error.stack);
      return null;
    }
  }

  private async retryWithBackoff(
    modelFn: (modelName: string) => Promise<string | null>,
    retries = 5,
  ): Promise<string | null> {
    let attempt = 0;
    let response = null;

    while (attempt < retries && !response) {
      const modelName = this.modelMap.get(attempt) || 'gemini-1.5-flash';
      response = await modelFn(modelName);
      attempt += 1;
    }
    return response;
  }

  private cleanJsonResponse(response: string): string {
    let cleaned = response.replace(/```json\n?|\n?```/g, '');
    
    cleaned = cleaned.trim();
    
    if (cleaned.startsWith('\n')) {
      cleaned = cleaned.substring(1);
    }
    
    return cleaned;
  }

  async generateSummary(jobTitle: string, seniority: string): Promise<string[]> {
    const prompt = `Generate an array of 10 JSON objects, each containing a 'summary' field with a string. Each summary should be 30 to 40 words long, describe past experience as a ${jobTitle} with ${seniority} level (focusing on skills and achievements), include future goals related to the ${jobTitle} role, be written in English and factually plausible. Output only the raw JSON array, no extra text or formatting.

Example format:
[
  {"summary": "As a ${jobTitle} with ${seniority} experience, I developed web applications and improved team efficiency. I aim to lead projects and master advanced technologies in the future."},
  {"summary": "With ${seniority} experience as a ${jobTitle}, I honed my coding skills on complex projects. I aspire to innovate solutions and mentor others in this role."}
]`;

    const response = await this.retryWithBackoff((modelName) =>
      this.callGeminiSummarize(modelName, prompt),
    );

    if (response) {
      try {
        const cleanedResponse = this.cleanJsonResponse(response);
        
        const jsonResponse = JSON.parse(cleanedResponse);
        if (!Array.isArray(jsonResponse)) {
          throw new Error('Response is not an array');
        }
        
        const summaries = jsonResponse.map((item: { summary: string }) => {
          if (!item.summary || typeof item.summary !== 'string') {
            throw new Error('Invalid summary format');
          }
          return item.summary;
        });
        
        return summaries;
      } catch (e) {
        return [];
      }
    }
    
    return [];
  }

  async enhanceText(text: string): Promise<string> {
    this.logger.debug(`Enhancing text: ${text}`);
    
    const prompt = `Enhance the following text to make it more professional, detailed, and impactful while maintaining its core message. The enhanced version should be more descriptive, use better vocabulary, and highlight achievements or skills if mentioned. Keep the tone professional and factual.

Original text: "${text}"

Requirements for enhancement:
1. Maintain the original meaning and key points
2. Add relevant details and context where appropriate
3. Use professional and impactful language
4. Keep the length reasonable (not more than 2-3 times the original)
5. Ensure the text flows naturally
6. Focus on achievements and skills if mentioned

Return only the enhanced text, no explanations or additional formatting.`;

    const response = await this.retryWithBackoff((modelName) =>
      this.callGeminiSummarize(modelName, prompt),
    );

    if (response) {
      try {
        const cleanedResponse = this.cleanJsonResponse(response);
        return cleanedResponse.trim();
      } catch (e) {
        this.logger.error('Failed to enhance text', {
          error: e.message,
          stack: e.stack,
          response: response
        });
        return text;
      }
    }
    
    this.logger.warn('Failed to enhance text after all retries');
    return text;
  }

  async fixText(text: string): Promise<string> {
    const prompt = `Fix the spelling and grammar in the following text while maintaining its original meaning and style. The text should be corrected for:
1. Spelling errors
2. Grammar mistakes
3. Punctuation
4. Subject-verb agreement
5. Article usage
6. Tense consistency
7. Word choice and usage

Original text: "${text}"

Requirements:
1. Keep the original meaning and tone
2. Only fix actual errors, don't change correct text
3. Maintain proper capitalization
4. Ensure proper sentence structure
5. Keep the text concise and clear

Return only the corrected text, no explanations or additional formatting.`;

    const response = await this.retryWithBackoff((modelName) =>
      this.callGeminiSummarize(modelName, prompt),
    );

    if (response) {
      try {
        const cleanedResponse = this.cleanJsonResponse(response);
        return cleanedResponse.trim();
      } catch (e) {
        this.logger.error('Failed to fix text', {
          error: e.message,
          stack: e.stack,
          response: response
        });
        return text;
      }
    }
    
    this.logger.warn('Failed to fix text after all retries');
    return text;
  }
}