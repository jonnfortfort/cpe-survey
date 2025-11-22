import { GoogleGenAI, Type } from "@google/genai";
import { AiAnalysisResult, SurveyResponse, Question } from '../types';

export const analyzeSurvey = async (responses: SurveyResponse, questions: Question[]): Promise<AiAnalysisResult> => {
  
  // --- 本地模拟算法 (当没有 API Key 时使用) ---
  if (!process.env.API_KEY) {
    console.log("Utilisation de l'analyse locale (Pas de clé API)");
    
    // Calculer le score de sentiment basé sur les tags sélectionnés
    let sentimentScore = 75; // Départ neutre/positif
    const negativeKeywords = ['Difficile', 'Froid', 'Chute', 'Stress', 'Cri', 'Conflit', 'Fatigue', 'Risque', 'Manque'];
    const positiveKeywords = ['Plaisir', 'Jeu', 'Nature', 'Rire', 'Calme', 'Autonomie', 'Collaboration'];
    
    let painPoints: string[] = [];
    let ideas: string[] = [];

    Object.values(responses).forEach(r => {
      r.selectedTags.forEach(tag => {
        if (negativeKeywords.some(k => tag.includes(k))) sentimentScore -= 5;
        if (positiveKeywords.some(k => tag.includes(k))) sentimentScore += 5;
      });
      if (r.text.length > 10 && painPoints.length < 3) painPoints.push(r.text.substring(0, 40) + "...");
    });
    
    // Bornes
    sentimentScore = Math.max(10, Math.min(95, sentimentScore));

    return {
      personaTitle: "Profil Éducateur(trice) Engagé(e)",
      summary: "L'analyse des réponses montre une personne soucieuse de la sécurité mais désireuse d'offrir des expériences riches aux enfants malgré les défis logistiques.",
      topPainPoints: painPoints.length > 0 ? painPoints : ["Gestion de l'habillage", "Manque de rangement", "Froid intense"],
      suggestion: "Améliorer l'ergonomie du vestiaire pour réduire le stress des transitions.",
      sentimentScore: sentimentScore,
      categoryScores: [
        { label: "Sécurité", score: Math.floor(Math.random() * 4) + 3 },
        { label: "Organisation", score: Math.floor(Math.random() * 5) + 5 },
        { label: "Équipement", score: Math.floor(Math.random() * 4) + 4 }
      ]
    };
  }

  // --- VRAIE IA (Si vous mettez une clé dans Vercel) ---
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let transcript = "";
  questions.forEach(q => {
    if (!q.isInfoOnly) {
      const r = responses[q.id];
      transcript += `Q: ${q.text}\nReponse: ${r?.text || ''} [Tags: ${r?.selectedTags?.join(',')}]\n\n`;
    }
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyse ces réponses d'éducatrice CPE. Génère un JSON avec personaTitle, summary, topPainPoints, suggestion, sentimentScore (0-100), categoryScores (label, score 0-10). \n\n ${transcript}`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}") as AiAnalysisResult;
  } catch (e) {
    return {
       personaTitle: "Erreur", summary: "Erreur analyse", topPainPoints: [], suggestion: "", sentimentScore: 0, categoryScores: []
    };
  }
};