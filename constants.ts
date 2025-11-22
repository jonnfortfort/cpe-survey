import { Question, QuestionCategory } from './types';


export const RESEARCHER_EMAIL = « han.peng@umontreal.ca »; « cloe.guichard@umontreal.ca »;« leyla.lakrioui@umontreal.ca »;« philippine.cornet@umontreal.ca »;« ambre.marie.jeanne.laveau@umontreal.ca »

export const SURVEY_DATA: Question[] = [
  {
    id: 'intro_01',
    category: QuestionCategory.INTRO,
    text: "Bienvenue à l'entrevue : Sorties Hivernales en CPE",
    tags: ['Recherche', 'Design', 'Innovation'],
    placeholder: "",
    imageUrl: "https://picsum.photos/seed/winter_intro/800/600",
    isInfoOnly: true
  },
  {
    id: 'context_01',
    category: QuestionCategory.CONTEXT,
    text: "Cadre de la recherche",
    tags: ['Contexte', 'Objectifs'],
    placeholder: "Notre recherche porte sur les besoins concrets liés aux sorties hivernales avec les enfants en CPE. L’objectif est de mieux comprendre les défis rencontrés au quotidien (matériels, organisationnels) afin d’identifier des pistes d’amélioration réalistes.",
    imageUrl: "https://picsum.photos/seed/winter_research/800/600",
    isInfoOnly: true
  },
  {
    id: 'icebreaker',
    category: QuestionCategory.CONTEXT,
    text: "Pour commencer, pouvez-vous vous présenter brièvement et décrire votre rôle au sein du CPE ?",
    tags: ['Présentation', 'Rôle', 'Expérience'],
    answerTags: ['Éducatrice 0-2 ans', 'Éducatrice 3-5 ans', 'Rotation', 'Direction', 'Conseillère Pédagogique', '> 10 ans exp.', '< 5 ans exp.'],
    placeholder: "Ex: Je suis éducatrice depuis 10 ans auprès des 4-5 ans...",
    imageUrl: "https://picsum.photos/seed/teacher/800/600"
  },
  
  // --- COVER THEME A ---
  {
    id: 'cover_theme_a',
    category: QuestionCategory.THEME_A,
    text: "Thématique A : Décrire vos pratiques hivernales",
    tags: ['Routine', 'Activités'],
    placeholder: "Objectif : Comprendre concrètement comment se déroulent les sorties hivernales en CPE, de la préparation jusqu’au retour à l’intérieur.",
    imageUrl: "",
    isInfoOnly: true
  },
  {
    id: 'theme_a_1',
    category: QuestionCategory.THEME_A,
    text: "Comment décririez-vous une journée hivernale typique ?",
    tags: ['Routine', 'Horaire', 'Déroulement'],
    answerTags: ['Sortie Matin', 'Sortie Après-midi', 'Habillage long', 'Transition difficile', 'Routine fluide', 'Manque de temps', 'Grande cour', 'Parc public'],
    placeholder: "Le matin on commence par...",
    imageUrl: "https://picsum.photos/seed/winter_day/800/600"
  },
  {
    id: 'theme_a_2',
    category: QuestionCategory.THEME_A,
    text: "Quels types d’activités ou de jeux privilégiez-vous en hiver ?",
    tags: ['Jeux', 'Pédagogie', 'Extérieur'],
    answerTags: ['Glissade', 'Châteaux de neige', 'Promenade', 'Hockey/Sports', 'Pelles/Sceaux', 'Jeu libre', 'Observation nature', 'Peinture sur neige'],
    placeholder: "On fait souvent des glissades, des châteaux...",
    imageUrl: "https://picsum.photos/seed/snow_play/800/600"
  },
  {
    id: 'theme_a_3',
    category: QuestionCategory.THEME_A,
    text: "Est-ce que vous adaptez vos activités selon les conditions du jour ? Comment ?",
    tags: ['Adaptation', 'Météo', 'Flexibilité'],
    answerTags: ['Grand froid', 'Verglas', 'Vent', 'Neige collante', 'Sortie raccourcie', 'Annulation', 'Marche seulement', 'Gymnase'],
    placeholder: "S'il fait très froid, on raccourcit la sortie...",
    imageUrl: "https://picsum.photos/seed/snow_storm/800/600"
  },
  {
    id: 'theme_a_4',
    category: QuestionCategory.THEME_A,
    text: "Comment percevez-vous l’équilibre entre sécurité, plaisir et prise de risque contrôlé ?",
    tags: ['Sécurité', 'Risque', 'Plaisir'],
    answerTags: ['Risque encouragé', 'Surprotection', 'Peur des chutes', 'Glace dangereuse', 'Surveillance constante', 'Confiance aux enfants', 'Environnement sécurisé'],
    placeholder: "C'est un défi constant, car...",
    imageUrl: "https://picsum.photos/seed/safety_kids/800/600"
  },

  // --- COVER THEME B ---
  {
    id: 'cover_theme_b',
    category: QuestionCategory.THEME_B,
    text: "Thématique B : Identifier les moments de difficulté",
    tags: ['Défis', 'Stress', 'Sécurité'],
    placeholder: "Objectifs : Guider la réflexion sur des situations spécifiques, les détails des stratégies d'adaptation et le stress quotidien.",
    imageUrl: "",
    isInfoOnly: true
  },
  {
    id: 'theme_b_1',
    category: QuestionCategory.THEME_B,
    text: "Quels sont les plus grands défis de gestion quotidienne en hiver ?",
    tags: ['Habillage', 'Transition', 'Vestiaire'],
    answerTags: ['Habillage difficile', 'Vestiaire trop petit', 'Mitaines perdues', 'Fermetures éclairs', 'Sueur', 'Impatience', 'Manque d\'autonomie'],
    placeholder: "L'habillage des 10 enfants en même temps est...",
    imageUrl: "https://picsum.photos/seed/winter_clothes/800/600"
  },
  {
    id: 'theme_b_2',
    category: QuestionCategory.THEME_B,
    text: "Y a-t-il des moments où vous vous sentez particulièrement impuissant(e) ou préoccupé(e) concernant la sécurité ?",
    tags: ['Stress', 'Chutes', 'Surveillance'],
    answerTags: ['Glace noire', 'Escaliers', 'Déneigement insuffisant', 'Chutes fréquentes', 'Visibilité réduite', 'Ratio enfants/adulte', 'Équipement brisé'],
    placeholder: "Quand c'est glacé près de la porte...",
    imageUrl: "https://picsum.photos/seed/ice/800/600"
  },
  {
    id: 'theme_b_3',
    category: QuestionCategory.THEME_B,
    text: "Certains enfants réagissent-ils différemment au froid (besoins particuliers, anxiété) ? Comment gérez-vous cela ?",
    tags: ['Émotion', 'Besoins Spéciaux', 'Inconfort'],
    answerTags: ['Pleurs', 'Refus de bouger', 'Mains gelées', 'Asthme', 'Peau sensible', 'Besoin de bras', 'Aime le froid', 'Déteste la neige'],
    placeholder: "J'ai un enfant qui refuse de mettre ses mitaines...",
    imageUrl: "https://picsum.photos/seed/crying_child/800/600"
  },
  {
    id: 'theme_b_4',
    category: QuestionCategory.THEME_B,
    text: "Quels impacts observez-vous sur l'organisation et les routines lors d'annulations dues à la météo ?",
    tags: ['Annulation', 'Confinement', 'Énergie'],
    answerTags: ['Excitation', 'Bruit intense', 'Conflits', 'Manque d\'espace', 'Routine perturbée', 'Fatigue éducatrice', 'Jeux moteurs intérieurs'],
    placeholder: "Les enfants sont plus agités à l'intérieur...",
    imageUrl: "https://picsum.photos/seed/indoor_play/800/600"
  },

  // --- COVER THEME C ---
  {
    id: 'cover_theme_c',
    category: QuestionCategory.THEME_C,
    text: "Thématique C : Faire émerger les besoins non satisfaits",
    tags: ['Besoins', 'Futur', 'Solutions'],
    placeholder: "Objectifs : Comprendre ce qui manque actuellement pour soutenir de meilleures expériences hivernales au sens des CPE.",
    imageUrl: "",
    isInfoOnly: true
  },
  {
    id: 'theme_c_1',
    category: QuestionCategory.THEME_C,
    text: "Quels soutiens matériels ou organisationnels vous manquent le plus pour faciliter les sorties ?",
    tags: ['Besoins', 'Matériel', 'Aide'],
    answerTags: ['Plus de rangement', 'Aide à l\'habillage', 'Meilleurs vêtements', 'Cour mieux déneigée', 'Abri extérieur', 'Chauffage d\'appoint', 'Vestiaire plus grand'],
    placeholder: "Il nous faudrait plus d'espace pour...",
    imageUrl: "https://picsum.photos/seed/empty_locker/800/600"
  },
  {
    id: 'theme_c_2',
    category: QuestionCategory.THEME_C,
    text: "Comment gérez-vous le séchage et le rangement des équipements mouillés ?",
    tags: ['Séchage', 'Rangement', 'Humidité'],
    answerTags: ['Sécheuse domestique', 'Sèche-mitaines mural', 'Radiateurs', 'Plancher mouillé', 'Odeurs', 'Manque de crochets', 'Mélange des vêtements'],
    placeholder: "C'est un chaos, on manque de crochets...",
    imageUrl: "https://picsum.photos/seed/wet_clothes/800/600"
  },
  {
    id: 'theme_c_3',
    category: QuestionCategory.THEME_C,
    text: "Si vous pouviez collaborer avec une équipe de designers, quel problème leur demanderiez-vous d’explorer en priorité ?",
    tags: ['Design', 'Priorité', 'Innovation'],
    answerTags: ['Vestiaire intelligent', 'Combinaison facile', 'Séchage rapide', 'Abri chauffé', 'Modules 4 saisons', 'Sol antidérapant', 'Rangement accessible'],
    placeholder: "Je leur demanderais de repenser le vestiaire...",
    imageUrl: "https://picsum.photos/seed/design_sketch/800/600"
  },
  {
    id: 'theme_c_4',
    category: QuestionCategory.THEME_C,
    text: "Quels équipements actuels vous semblent utilisables mais inadéquats ? Qu'est-ce qui manque ?",
    tags: ['Ergonomie', 'Efficacité', 'Critique'],
    answerTags: ['Zips coincés', 'Bottes lourdes', 'Mitaines qui tombent', 'Cache-cou mouillé', 'Pelles fragiles', 'Traîneaux instables', 'Modules glissants'],
    placeholder: "Les modules de jeux sont trop glissants...",
    imageUrl: "https://picsum.photos/seed/playground/800/600"
  },
  {
    id: 'theme_c_5',
    category: QuestionCategory.THEME_C,
    text: "Si vous pouviez imaginer un “espace hivernal idéal” pour les enfants, à quoi ressemblerait-il ?",
    tags: ['Rêve', 'Idéal', 'Futur'],
    answerTags: ['Toit transparent', 'Sol chauffant', 'Nature intégrée', 'Pentes douces', 'Cabane chauffée', 'Tunnel', 'Atelier extérieur'],
    placeholder: "Un espace couvert mais ouvert, avec...",
    imageUrl: "https://picsum.photos/seed/winter_wonderland/800/600"
  }
];