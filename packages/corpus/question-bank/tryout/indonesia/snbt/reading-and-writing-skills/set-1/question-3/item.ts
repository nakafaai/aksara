import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Produkt." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "produktiv." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Produktion." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Produzent." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Produktivität." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "product." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "productive." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "production." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "producer." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "productivity." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "produk." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "produktif." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "produksi." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "produsen." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "produktivitas." }],
        },
      ],
    },
  },
};

export default item;
