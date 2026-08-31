import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Wahr, wahr, wahr",
        },
        {
          isCorrect: false,
          label: "Wahr, falsch, falsch",
        },
        {
          isCorrect: false,
          label: "Falsch, wahr, wahr",
        },
        {
          isCorrect: true,
          label: "Wahr, wahr, falsch",
        },
        {
          isCorrect: false,
          label: "Falsch, falsch, wahr",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "True, True, True",
        },
        {
          isCorrect: false,
          label: "True, False, False",
        },
        {
          isCorrect: false,
          label: "False, True, True",
        },
        {
          isCorrect: true,
          label: "True, True, False",
        },
        {
          isCorrect: false,
          label: "False, False, True",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Benar, Benar, Benar",
        },
        {
          isCorrect: false,
          label: "Benar, Salah, Salah",
        },
        {
          isCorrect: false,
          label: "Salah, Benar, Benar",
        },
        {
          isCorrect: true,
          label: "Benar, Benar, Salah",
        },
        {
          isCorrect: false,
          label: "Salah, Salah, Benar",
        },
      ],
    },
  },
};

export default item;
