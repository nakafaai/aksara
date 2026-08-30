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
          label: "Wahr, wahr, falsch",
        },
        {
          isCorrect: true,
          label: "Falsch, wahr, falsch",
        },
        {
          isCorrect: false,
          label: "Falsch, wahr, wahr",
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
          label: "True, True, False",
        },
        {
          isCorrect: true,
          label: "False, True, False",
        },
        {
          isCorrect: false,
          label: "False, True, True",
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
          label: "Benar, Benar, Salah",
        },
        {
          isCorrect: true,
          label: "Salah, Benar, Salah",
        },
        {
          isCorrect: false,
          label: "Salah, Benar, Benar",
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
