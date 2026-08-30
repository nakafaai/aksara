import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " Leute" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48" },
            { kind: "text", text: " Leute" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "36" },
            { kind: "text", text: " Leute" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " Leute" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20" },
            { kind: "text", text: " Leute" },
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
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " People" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48" },
            { kind: "text", text: " People" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "36" },
            { kind: "text", text: " People" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " People" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20" },
            { kind: "text", text: " People" },
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
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " Orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48" },
            { kind: "text", text: " Orang" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "36" },
            { kind: "text", text: " Orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " Orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20" },
            { kind: "text", text: " Orang" },
          ],
        },
      ],
    },
  },
};

export default item;
