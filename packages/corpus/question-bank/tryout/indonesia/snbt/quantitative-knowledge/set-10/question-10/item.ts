import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "15" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "75" },
            { kind: "text", text: " Minuten" },
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
            { display: "block", kind: "math", math: "15" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "75" },
            { kind: "text", text: " minutes" },
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
            { display: "block", kind: "math", math: "15" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "75" },
            { kind: "text", text: " menit" },
          ],
        },
      ],
    },
  },
};

export default item;
