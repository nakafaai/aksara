import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "nach dem Satz " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "vor Satz " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "nach dem Satz " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "vor Satz " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "nach dem Satz " },
            { display: "block", kind: "math", math: "(7)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "after sentence " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "before sentence " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "after sentence " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "before sentence " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "after sentence " },
            { display: "block", kind: "math", math: "(7)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "setelah kalimat " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sebelum kalimat " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "setelah kalimat " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sebelum kalimat " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "setelah kalimat " },
            { display: "block", kind: "math", math: "(7)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
