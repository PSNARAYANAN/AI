import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const analyzeFoodImage = async (imageBuffer: Buffer, mimeType: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Identify the food items in this image.
    Estimate portion sizes and return a JSON object with:
    - name: string
    - estimatedWeightGrams: number
    - calories: number
    - proteinG: number
    - carbsG: number
    - fatG: number
    - fiberG: number
    - fitsGoalAdvice: string (Give advice for someone either wanting to lose weight or gain muscle)
    Return ONLY the JSON.
  `;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType
      }
    }
  ]);

  const response = await result.response;
  const text = response.text();
  return JSON.parse(text.replace(/```json|```/g, ''));
};

export const analyzeLabelImage = async (imageBuffer: Buffer, mimeType: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Read this nutrition label. Extract:
    - name: product name if visible
    - caloriesPer100g: number
    - sugarPer100g: number
    - sodiumMgPer100g: number
    - proteinPer100g: number
    - fiberPer100g: number
    - saturatedFatPer100g: number
    - additives: string[]
    Calculate a health score from 0-100 based on these criteria:
    + High protein, high fiber, low sugar, low sodium, no additives.
    - High sugar (>10g), high sodium (>500mg), saturated fat, many additives.
    Return a JSON object with:
    - name: string
    - score: number
    - nutritionalInfo: object (containing the extracted values)
    - advice: string[] (bullets explaining why the score is what it is and advice based on goal)
    Return ONLY the JSON.
  `;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType
      }
    }
  ]);

  const response = await result.response;
  const text = response.text();
  return JSON.parse(text.replace(/```json|```/g, ''));
};
