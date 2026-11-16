import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16.6\\text{ kJ mol}^{-1}$$, and the forces of attraction between molecules are overcome while their average kinetic energy stays the same",
        },
        {
          correct: false,
          label:
            "$$19.1\\text{ kJ mol}^{-1}$$, and the molecules gain kinetic energy and move faster",
        },
        {
          correct: false,
          label:
            "$$23.3\\text{ kJ mol}^{-1}$$, and the forces of attraction between molecules are overcome while their average kinetic energy stays the same",
        },
        {
          correct: true,
          label:
            "$$19.1\\text{ kJ mol}^{-1}$$, and the forces of attraction between molecules are overcome while their average kinetic energy stays the same",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16.6\\text{ kJ mol}^{-1}$$, dan daya tarikan antara molekul diatasi manakala tenaga kinetik puratanya kekal",
        },
        {
          correct: false,
          label:
            "$$19.1\\text{ kJ mol}^{-1}$$, dan molekul menerima tenaga kinetik lalu bergerak lebih laju",
        },
        {
          correct: false,
          label:
            "$$23.3\\text{ kJ mol}^{-1}$$, dan daya tarikan antara molekul diatasi manakala tenaga kinetik puratanya kekal",
        },
        {
          correct: true,
          label:
            "$$19.1\\text{ kJ mol}^{-1}$$, dan daya tarikan antara molekul diatasi manakala tenaga kinetik puratanya kekal",
        },
      ],
    },
  },
};

export default item;
