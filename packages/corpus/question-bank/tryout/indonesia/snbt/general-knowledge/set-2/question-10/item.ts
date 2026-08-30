import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "vollständige Verdauung." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "schnelle Fermentation." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "unvollständige Aufnahme." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "übermäßige Enzymbildung." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Vorliebe für ein Lebensmittel." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "complete digestion." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "rapid fermentation." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "incomplete absorption." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "excess enzyme production." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "food preference." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pencernaan sempurna." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "fermentasi cepat." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "penyerapan yang tidak sempurna." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "produksi enzim berlebih." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kesukaan terhadap makanan." }],
        },
      ],
    },
  },
};

export default item;
