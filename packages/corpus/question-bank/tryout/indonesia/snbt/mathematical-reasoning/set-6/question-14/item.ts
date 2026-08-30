import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " Monate" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5" },
            { kind: "text", text: " Monate" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " Monate" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "8" },
            { kind: "text", text: " Monate" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9" },
            { kind: "text", text: " Monate" },
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
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " months" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5" },
            { kind: "text", text: " months" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " months" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "8" },
            { kind: "text", text: " months" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9" },
            { kind: "text", text: " months" },
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
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " bulan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5" },
            { kind: "text", text: " bulan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: " bulan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "8" },
            { kind: "text", text: " bulan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9" },
            { kind: "text", text: " bulan" },
          ],
        },
      ],
    },
  },
};

export default item;
