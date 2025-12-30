
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Message, GroundingLink } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getGeminiResponse = async (
  prompt: string,
  history: Message[],
  location?: { lat: number; lng: number }
): Promise<{ text: string; links: GroundingLink[] }> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Use 2.5 Flash for Maps grounding as per instructions
  const modelName = 'gemini-2.5-flash';

  const contents = [
    ...history.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    })),
    { role: 'user', parts: [{ text: prompt }] }
  ];

  try {
    const config: any = {
      systemInstruction: `You are EstateAI, a world-class real estate advisor. 
      You help users find properties, understand market trends, calculate mortgages, and analyze neighborhoods.
      Use Google Search and Google Maps tools to provide factual, up-to-date information.
      When suggesting locations, refer to local amenities, schools, and transit.
      Always be professional, objective, and helpful.`,
      tools: [{ googleSearch: {} }, { googleMaps: {} }],
    };

    if (location) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.lat,
            longitude: location.lng
          }
        }
      };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents,
      config,
    });

    const text = response.text || "I'm sorry, I couldn't generate a response.";
    const links: GroundingLink[] = [];

    // Extract grounding chunks
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          links.push({ title: chunk.web.title, uri: chunk.web.uri });
        }
        if (chunk.maps) {
          links.push({ title: chunk.maps.title, uri: chunk.maps.uri });
        }
      });
    }

    return { text, links };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I encountered an error while processing your request. Please try again later.",
      links: []
    };
  }
};
