import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "vollständige Verdauung.",
        },
        {
          isCorrect: false,
          label: "schnelle Fermentation.",
        },
        {
          isCorrect: true,
          label: "unvollständige Aufnahme.",
        },
        {
          isCorrect: false,
          label: "übermäßige Enzymbildung.",
        },
        {
          isCorrect: false,
          label: "Vorliebe für ein Lebensmittel.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "complete digestion.",
        },
        {
          isCorrect: false,
          label: "rapid fermentation.",
        },
        {
          isCorrect: true,
          label: "incomplete absorption.",
        },
        {
          isCorrect: false,
          label: "excess enzyme production.",
        },
        {
          isCorrect: false,
          label: "food preference.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pencernaan sempurna.",
        },
        {
          isCorrect: false,
          label: "fermentasi cepat.",
        },
        {
          isCorrect: true,
          label: "penyerapan yang tidak sempurna.",
        },
        {
          isCorrect: false,
          label: "produksi enzim berlebih.",
        },
        {
          isCorrect: false,
          label: "kesukaan terhadap makanan.",
        },
      ],
    },
  },
};

export default item;
