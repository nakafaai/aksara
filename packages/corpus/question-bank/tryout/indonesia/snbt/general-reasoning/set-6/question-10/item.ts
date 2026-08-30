import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "it" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pit" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "sit" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "nit" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "nichts davon" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "it" }] },
        { isCorrect: false, label: [{ kind: "text", text: "pit" }] },
        { isCorrect: false, label: [{ kind: "text", text: "sit" }] },
        { isCorrect: true, label: [{ kind: "text", text: "nit" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "none of the above" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "it" }] },
        { isCorrect: false, label: [{ kind: "text", text: "pit" }] },
        { isCorrect: false, label: [{ kind: "text", text: "sit" }] },
        { isCorrect: true, label: [{ kind: "text", text: "nit" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "tidak ada satupun" }],
        },
      ],
    },
  },
};

export default item;
