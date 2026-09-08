import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Maschine A",
        },
        {
          isCorrect: false,
          label: "Maschine B",
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
          label: "Maschine C",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Machine A",
        },
        {
          isCorrect: false,
          label: "Machine B",
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
          label: "Machine C",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mesin A",
        },
        {
          isCorrect: false,
          label: "Mesin B",
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
          label: "Mesin C",
        },
      ],
    },
  },
};

export default item;
