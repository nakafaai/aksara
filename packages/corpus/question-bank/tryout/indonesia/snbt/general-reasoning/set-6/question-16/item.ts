import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Lombok",
        },
        {
          isCorrect: false,
          label: "Manado",
        },
        {
          isCorrect: true,
          label: "Yogyakarta",
        },
        {
          isCorrect: false,
          label: "Padang",
        },
        {
          isCorrect: false,
          label: "Bali",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Lombok" },
        { isCorrect: false, label: "Manado" },
        { isCorrect: true, label: "Yogyakarta" },
        { isCorrect: false, label: "Padang" },
        { isCorrect: false, label: "Bali" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Lombok" },
        { isCorrect: false, label: "Manado" },
        { isCorrect: true, label: "Yogyakarta" },
        { isCorrect: false, label: "Padang" },
        { isCorrect: false, label: "Bali" },
      ],
    },
  },
};

export default item;
