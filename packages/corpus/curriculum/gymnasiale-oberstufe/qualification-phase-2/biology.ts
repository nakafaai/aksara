import {
  biologyCoreCurriculum,
  biologyEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q2 Biologie: Neurobiologie. */
const qualificationPhase2BiologyUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-2-biology-neurobiology-coordination",
      level: "lesson",
      materialKeys: ["lesson.biology.coordination"],
      order: 10,
      outcomes: [
        { code: "Biologie Q2.3 Neurobiologie", ...biologyCoreCurriculum },
        {
          code: "Inhaltsbereich 2.6.2 Informationsverarbeitung in Lebewesen",
          ...biologyEducationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-2-biology-neurobiology",
  materialCard: {
    de: {
      description: "Wie ein Signal über Nerven und Synapsen läuft.",
      title: "Neurobiologie",
    },
    en: {
      description: "How a signal travels along nerves and across synapses.",
      title: "Neurobiology",
    },
    id: {
      description: "Cara sinyal berjalan lewat saraf dan sinapsis.",
      title: "Neurobiologi",
    },
    ms: {
      description: "Cara isyarat bergerak melalui saraf dan sinaps.",
      title: "Neurobiologi",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "neurobiologie", title: "Neurobiologie" },
    en: { routeSlug: "neurobiology", title: "Neurobiology" },
    id: { routeSlug: "neurobiologi", title: "Neurobiologi" },
    ms: { routeSlug: "neurobiologi", title: "Neurobiologi" },
  },
});

/** Q2 Biologie: the Themenfelder of the Hessen Kerncurriculum Biologie that a lesson teaches, in its order */
export const qualificationPhase2BiologyUnitNodes = [
  qualificationPhase2BiologyUnit1,
];
