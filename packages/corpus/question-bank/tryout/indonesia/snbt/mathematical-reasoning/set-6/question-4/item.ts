import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7" },
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
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " Monate" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "12" },
            { kind: "text", text: " Monate" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7" },
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
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " months" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "12" },
            { kind: "text", text: " months" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7" },
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
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " bulan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "12" },
            { kind: "text", text: " bulan" },
          ],
        },
      ],
    },
  },
};

export default item;
