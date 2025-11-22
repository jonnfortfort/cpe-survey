import React, { useState } from 'react';
import { AiAnalysisResult, SurveyResponse } from '../types';
import { RESEARCHER_EMAIL, SURVEY_DATA } from '../constants';

interface AnalysisViewProps {
  result: AiAnalysisResult | null;
  loading: boolean;
  onRestart: () => void;
  responses: SurveyResponse;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ result, loading, onRestart, responses }) => {
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSendResults = async () => {
    setIsSending(true);
    setSendError(false);
    const formattedData: {[key: string]: string} = {};
    SURVEY_DATA.forEach(q => {
      if (!q.isInfoOnly) {
        const r = responses[q.id];
        const answer = r?.text || "Pas de réponse";
        const tags = r?.selectedTags?.join(", ") || "Aucun tag";
        formattedData[`${q.category} - ${q.text.substring(0, 50)}`] = `Réponse: ${answer} | Tags: ${tags}`;
      }
    });
    if (result) {
      formattedData['__ANALYSE_IA_SENTIMENT'] = `${result.sentimentScore}/100`;
      formattedData['__ANALYSE_IA_RESUME'] = result.summary;
    }
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${RESEARCHER_EMAIL}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: "Nouvelle Réponse - Enquête CPE Hiver", ...formattedData })
      });
      if (response.ok) setEmailSent(true); else setSendError(true);
    } catch (error) { setSendError(true); } finally { setIsSending(false); }
  };

  if (loading) {
    return <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse"><div className="text-xl font-bold">Analyse en cours...</div></div>;
  }
  if (!result) return null;

  const getSentimentColor = (score: number) => score < 40 ? 'text-rose-500' : score < 70 ? 'text-amber-500' : 'text-emerald-500';

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 print:shadow-none print:border-none">
      <div className="text-center space-y-4 pb-8 border-b border-slate-100">
        <h2 className="text-5xl font-extrabold text-slate-900">{result.personaTitle}</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">{result.summary}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl border flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Moral Global</h3>
          <div className="text-4xl font-bold">{result.sentimentScore}%</div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6">Intensité des Défis</h3>
          <div className="space-y-5">
            {result.categoryScores.map((cat, idx) => (
              <div key={idx}><div className="flex justify-between text-sm font-bold"><span>{cat.label}</span><span>{cat.score}/10</span></div><div className="w-full bg-slate-200 h-3 rounded-full"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${(cat.score / 10) * 100}%` }} /></div></div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-2xl border border-rose-100"><h3 className="font-bold text-slate-800 mb-4">Irritants</h3><ul>{result.topPainPoints.map((p,i)=><li key={i}>- {p}</li>)}</ul></div>
        <div className="bg-white p-6 rounded-2xl border border-emerald-100"><h3 className="font-bold text-slate-800 mb-4">Solution</h3><p>{result.suggestion}</p></div>
      </div>
      <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-center space-y-6 print:hidden">
        {!emailSent ? (
          <>
            <button onClick={handleSendResults} disabled={isSending} className="px-8 py-4 bg-sky-500 text-white font-bold rounded-xl">{isSending ? "Envoi..." : "Envoyer mes réponses"}</button>
            {sendError && <p className="text-rose-400">Erreur d'envoi.</p>}
          </>
        ) : <div className="text-emerald-400 font-bold">Réponses envoyées avec succès !</div>}
        <div className="flex justify-center gap-4">
          <button onClick={() => window.print()} className="text-slate-400">Sauvegarder en PDF</button>
          <button onClick={onRestart} className="text-slate-400">Nouvelle entrevue</button>
        </div>
      </div>
    </div>
  );
};
export default AnalysisView;