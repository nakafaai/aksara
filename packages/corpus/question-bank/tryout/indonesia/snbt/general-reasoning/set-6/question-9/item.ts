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
          isCorrect: true,
          label: "UTBKSERU",
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
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "SUSAHNYA" },
        { isCorrect: true, label: "UTBKSERU" },
        { isCorrect: false, label: "MENANGIS" },
        { isCorrect: false, label: "SEMANGAT" },
        { isCorrect: false, label: "BERSEDIH" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "SUSAHNYA" },
        { isCorrect: true, label: "UTBKSERU" },
        { isCorrect: false, label: "MENANGIS" },
        { isCorrect: false, label: "SEMANGAT" },
        { isCorrect: false, label: "BERSEDIH" },
      ],
    },
  },
};

export default item;
