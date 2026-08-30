import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Beziehung zwischen " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "Q" },
            { kind: "text", text: " lässt sich nicht bestimmen" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The relationship between " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "Q" },
            { kind: "text", text: " cannot be determined" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P = 2Q" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Hubungan " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "Q" },
            { kind: "text", text: " tidak dapat ditentukan" },
          ],
        },
      ],
    },
  },
};

export default item;
