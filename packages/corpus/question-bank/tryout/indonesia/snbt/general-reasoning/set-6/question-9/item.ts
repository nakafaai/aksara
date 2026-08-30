import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "SUSAHNYA",
        },
        {
          isCorrect: false,
          label: "MENANGIS",
        },
        {
          isCorrect: false,
          label: "SEMANGAT",
        },
        {
          isCorrect: false,
          label: "BERSEDIH",
        },
        {
          isCorrect: true,
          label: "UTBKSERU",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "SUSAHNYA" },
        { isCorrect: false, label: "MENANGIS" },
        { isCorrect: false, label: "SEMANGAT" },
        { isCorrect: false, label: "BERSEDIH" },
        { isCorrect: true, label: "UTBKSERU" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "SUSAHNYA" },
        { isCorrect: false, label: "MENANGIS" },
        { isCorrect: false, label: "SEMANGAT" },
        { isCorrect: false, label: "BERSEDIH" },
        { isCorrect: true, label: "UTBKSERU" },
      ],
    },
  },
};

export default item;
