import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "konkurriert mit." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ahmt nach." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "gleicht." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "folgt." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ersetzt." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "competes with." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "imitates." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "looks like." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "follows." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "replaces." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "menyaingi." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "menirukan." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "mirip dengan." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "mengikuti." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "menggantikan." }],
        },
      ],
    },
  },
};

export default item;
