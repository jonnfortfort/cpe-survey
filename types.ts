export enum QuestionCategory {
  INTRO = 'INTRO',
  CONTEXT = 'CONTEXT',
  THEME_A = 'PRATIQUES',
  THEME_B = 'DIFFICULTES',
  THEME_C = 'BESOINS',
}

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  tags: string[];
  answerTags?: string[];
  placeholder: string;
  imageUrl: string;
  isInfoOnly?: boolean;
}

export interface ResponseData {
  text: string;
  selectedTags: string[];
}

export interface SurveyResponse {
  [questionId: string]: ResponseData;
}

export interface AiAnalysisResult {
  personaTitle: string;
  summary: string;
  topPainPoints: string[];
  suggestion: string;
  sentimentScore: number;
  categoryScores: {
    label: string;
    score: number;
  }[];
}