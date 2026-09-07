import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "Maschine A und B",
        },
        {
          isCorrect: false,
          label: "Maschine B und C",
        },
        {
          isCorrect: true,
          label: "$$A$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "Machine A and B",
        },
        {
          isCorrect: false,
          label: "Machine B and C",
        },
        {
          isCorrect: true,
          label: "$$A$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "Mesin A dan B",
        },
        {
          isCorrect: false,
          label: "Mesin B dan C",
        },
        {
          isCorrect: true,
          label: "$$A$$",
        },
      ],
    },
  },
};

export default item;
