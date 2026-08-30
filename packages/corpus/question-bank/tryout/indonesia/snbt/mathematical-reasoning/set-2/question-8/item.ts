import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "37." },
            { kind: "text", text: " Monat" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "38." },
            { kind: "text", text: " Monat" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "39." },
            { kind: "text", text: " Monat" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "40." },
            { kind: "text", text: " Monat" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "41." },
            { kind: "text", text: " Monat" },
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
            { display: "block", kind: "math", math: "37^{\\text{th}}" },
            { kind: "text", text: " Month" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "38^{\\text{th}}" },
            { kind: "text", text: " Month" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "39^{\\text{th}}" },
            { kind: "text", text: " Month" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "40^{\\text{th}}" },
            { kind: "text", text: " Month" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "41^{\\text{st}}" },
            { kind: "text", text: " Month" },
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
            { kind: "text", text: "Bulan ke-" },
            { display: "block", kind: "math", math: "37" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Bulan ke-" },
            { display: "block", kind: "math", math: "38" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Bulan ke-" },
            { display: "block", kind: "math", math: "39" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Bulan ke-" },
            { display: "block", kind: "math", math: "40" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Bulan ke-" },
            { display: "block", kind: "math", math: "41" },
          ],
        },
      ],
    },
  },
};

export default item;
