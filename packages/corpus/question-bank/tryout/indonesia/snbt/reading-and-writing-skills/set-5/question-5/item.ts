import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Währenddessen",
        },
        {
          isCorrect: true,
          label: "Daher",
        },
        {
          isCorrect: false,
          label: "Dennoch",
        },
        {
          isCorrect: false,
          label: "Zum Beispiel",
        },
        {
          isCorrect: false,
          label: "Zuvor",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Meanwhile",
        },
        {
          isCorrect: true,
          label: "Therefore",
        },
        {
          isCorrect: false,
          label: "Nevertheless",
        },
        {
          isCorrect: false,
          label: "For example",
        },
        {
          isCorrect: false,
          label: "Previously",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sementara itu",
        },
        {
          isCorrect: true,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian",
        },
        {
          isCorrect: false,
          label: "Sebagai contoh",
        },
        {
          isCorrect: false,
          label: "Sebelumnya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
