import { GoogleGenAI, Type } from "@google/genai";
import { AiAnalysisResult, SurveyResponse, Question } from '../types';

export const analyzeSurvey = async (
  responses: SurveyResponse,
  questions: Question[]
): Promise<AiAnalysisResult> => {
  
  if (!process.env.API_KEY) {
    console.error("API Key not found");
    return {
      personaTitle: "Mode Démo",
      summary: "Clé API manquante. Ceci est une réponse de démonstration.",
      topPainPoints: ["Manque de clé API", "Données non analysées"],
      suggestion: "Ajoutez votre clé API pour voir la magie opérer.",
      sentimentScore: 50,
      categoryScores: [
        { label: "Sécurité", score: 5 },
        { label: "Organisation", score: 5 },
        { label: "Matériel", score: 5 }
      ]
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Format inputs for the prompt
  let transcript = "";
  questions.forEach(q => {
    if (!q.isInfoOnly) {
      const response = responses[q.id];
      const answerText = response?.text || "Pas de réponse textuelle";
      const tagsList = response?.selectedTags?.length 
        ? response.selectedTags.join(", ") 
        : "Aucun tag sélectionné";

      transcript += `Question (${q.category}): ${q.text}\n`;
      transcript += `Tags choisis: [${tagsList}]\n`;
      transcript += `Détails: ${answerText}\n\n`;
    }
  });

  const prompt = `
    Tu es un expert en recherche UX spécialisé dans la petite enfance.
    Voici les réponses d'une éducatrice en CPE concernant les sorties hivernales.
    
    Tâche : Analyse les réponses pour générer un profil, des points de friction, et des DONNÉES QUANTITATIVES pour des graphiques.
    
    Pour 'sentimentScore' : Évalue le moral global de l'éducatrice face à l'hiver (0 = Épuisée/Négative, 100 = Enthousiaste/Positive).
    Pour 'categoryScores' : Évalue l'intensité des PROBLÈMES dans ces catégories (0 = Aucun problème, 10 = Problème Critique/Majeur).
    
    TRANSCRIPT:
    ${transcript}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personaTitle: { type: Type.STRING },
            summary: { type: Type.STRING },
            topPainPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestion: { type: Type.STRING },
            sentimentScore: { type: Type.INTEGER, description: "0 to 100" },
            categoryScores: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING, enum: ["Sécurité", "Organisation", "Équipement"] },
                  score: { type: Type.INTEGER, description: "0 to 10 severity of issues" }
                }
              }
            }
          },
          required: ["personaTitle", "summary", "topPainPoints", "suggestion", "sentimentScore", "categoryScores"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AiAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      personaTitle: "Profil Non Analysé",
      summary: "Une erreur est survenue lors de l'analyse des résultats.",
      topPainPoints: ["Erreur de connexion"],
      suggestion: "Veuillez réessayer plus tard.",
      sentimentScore: 0,
      categoryScores: []
    };
  }
};
