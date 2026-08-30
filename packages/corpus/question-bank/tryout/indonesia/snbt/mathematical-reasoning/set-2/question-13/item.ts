import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}2" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4{,}8" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "18{,}8" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "16{,}8" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "14{,}2" },
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
            { display: "block", kind: "math", math: "1.2" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4.8" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "18.8" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "16.8" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "14.2" },
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
            { display: "block", kind: "math", math: "1{,}2" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4{,}8" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "18{,}8" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "16{,}8" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "14{,}2" },
            { kind: "text", text: " menit" },
          ],
        },
      ],
    },
  },
};

export default item;
