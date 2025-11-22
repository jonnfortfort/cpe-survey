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

    // Format data for email
    const formattedData: {[key: string]: string} = {};
    
    SURVEY_DATA.forEach(q => {
      if (!q.isInfoOnly) {
        const r = responses[q.id];
        const answer = r?.text || "Pas de réponse";
        const tags = r?.selectedTags?.join(", ") || "Aucun tag";
        formattedData[`${q.category} - ${q.text.substring(0, 50)}...`] = `Réponse: ${answer} \n Tags: ${tags}`;
      }
    });

    // Add AI Analysis summary to the email as well
    if (result) {
      formattedData['__ANALYSE_IA_SENTIMENT'] = `${result.sentimentScore}/100`;
      formattedData['__ANALYSE_IA_RESUME'] = result.summary;
    }

    try {
      // Using FormSubmit.co to send email without backend
      // Note: The first time this runs for a new email, FormSubmit will ask to confirm the address via email.
      const response = await fetch(`https://formsubmit.co/ajax/${RESEARCHER_EMAIL}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "Nouvelle Réponse - Enquête CPE Hiver",
          ...formattedData
        })
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        setSendError(true);
      }
    } catch (error) {
      console.error("Failed to send", error);
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 animate-pulse">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <p className="text-xl text-slate-800 font-bold">Analyse en cours...</p>
          <p className="text-slate-500 mt-1">Génération du rapport...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const getSentimentColor = (score: number) => {
    if (score < 40) return 'text-rose-500';
    if (score < 70) return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 print:shadow-none print:border-none">
      
      {/* Header Section */}
      <div className="text-center space-y-4 pb-8 border-b border-slate-100">
        <div className="inline-block px-4 py-1.5 bg-sky-50 text-sky-700 text-sm font-bold rounded-full tracking-wider uppercase print:hidden">
          Rapport d'Entrevue
        </div>
        <h2 className="text-5xl font-extrabold text-slate-900">
          {result.personaTitle}
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Sentiment Gauge */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center print:bg-white print:border-slate-300">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-wide">Moral Hivernal Global</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
             <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * result.sentimentScore / 100)}
                  className={`transition-all duration-1000 ease-out ${getSentimentColor(result.sentimentScore)}`}
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute flex flex-col items-center">
               <span className={`text-4xl font-bold ${getSentimentColor(result.sentimentScore)}`}>
                 {result.sentimentScore}%
               </span>
               <span className="text-xs text-slate-400 font-semibold">Positivité</span>
             </div>
          </div>
        </div>

        {/* Right: Category Bar Charts */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center print:bg-white print:border-slate-300">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-wide">Intensité des Défis (0-10)</h3>
          <div className="space-y-5">
            {result.categoryScores.map((cat, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
                  <span>{cat.label}</span>
                  <span>{cat.score}/10</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden print:border print:border-slate-300">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-1000 print:bg-slate-800"
                    style={{ width: `${(cat.score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Pain Points */}
        <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow print:border-slate-300 print:shadow-none">
           <div className="flex items-center mb-4 text-rose-600">
              <h3 className="text-lg font-bold text-slate-800">Irritants Majeurs</h3>
           </div>
           <ul className="space-y-3">
             {result.topPainPoints.map((point, i) => (
               <li key={i} className="flex items-start text-slate-600 leading-snug">
                 <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-rose-400 rounded-full flex-shrink-0"></span>
                 {point}
               </li>
             ))}
           </ul>
        </div>

        {/* Innovation Suggestion */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow print:border-slate-300 print:shadow-none">
           <div className="flex items-center mb-4 text-emerald-600">
              <h3 className="text-lg font-bold text-slate-800">Piste de Solution</h3>
           </div>
           <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 print:border-none print:p-0">
             <p className="text-slate-700 italic font-medium leading-relaxed">
               "{result.suggestion}"
             </p>
           </div>
        </div>
      </div>

      {/* ACTION AREA: SEND DATA & PRINT */}
      <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-center space-y-6 print:hidden">
        
        {!emailSent ? (
          <div className="space-y-4">
             <h3 className="text-white text-xl font-bold">Finaliser et envoyer</h3>
             <p className="text-slate-400 max-w-md mx-auto text-sm">
               Cliquez ci-dessous pour transmettre vos réponses anonymes à l'équipe de recherche.
             </p>
             
             {RESEARCHER_EMAIL.includes('votre_email') && (
                <div className="p-3 bg-amber-100 text-amber-800 text-sm rounded-lg mb-4">
                  ⚠️ Attention: Le développeur doit configurer l'email dans le fichier constants.ts
                </div>
             )}

             <button
               onClick={handleSendResults}
               disabled={isSending}
               className="w-full md:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
             >
               {isSending ? (
                 <>
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Envoi en cours...
                 </>
               ) : (
                 <>
                   Envoyer mes réponses
                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                 </>
               )}
             </button>
             {sendError && <p className="text-rose-400 text-sm mt-2">Erreur lors de l'envoi. Veuillez réessayer.</p>}
          </div>
        ) : (
          <div className="p-6 bg-emerald-500/20 border border-emerald-500/50 rounded-xl animate-fadeIn">
             <div className="flex flex-col items-center text-emerald-400">
               <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               <h3 className="text-xl font-bold text-white">Réponses envoyées avec succès !</h3>
               <p className="text-slate-300 mt-1">Merci pour votre participation.</p>
             </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-800 flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="text-slate-400 hover:text-white text-sm font-semibold flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Sauvegarder en PDF
          </button>
          
          <button
            onClick={onRestart}
            className="text-slate-400 hover:text-white text-sm font-semibold flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Nouvelle entrevue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
