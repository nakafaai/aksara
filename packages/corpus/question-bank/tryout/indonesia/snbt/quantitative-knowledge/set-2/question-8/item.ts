import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Wahr, wahr, wahr" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Wahr, wahr, falsch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Wahr, falsch, falsch" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Falsch, wahr, wahr" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Falsch, falsch, wahr" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "True, True, True" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "True, True, False" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "True, False, False" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "False, True, True" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "False, False, True" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Benar, Benar, Benar" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Benar, Benar, Salah" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Benar, Salah, Salah" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Salah, Benar, Benar" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Salah, Salah, Benar" }],
        },
      ],
    },
  },
};

export default item;
