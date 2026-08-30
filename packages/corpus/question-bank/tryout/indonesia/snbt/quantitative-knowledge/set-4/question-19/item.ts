import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2{,}5" },
            { kind: "text", text: " Liter" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5" },
            { kind: "text", text: " Liter" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7{,}5" },
            { kind: "text", text: " Liter" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " Liter" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "12{,}5" },
            { kind: "text", text: " Liter" },
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
            { display: "block", kind: "math", math: "2.5" },
            { kind: "text", text: " liters" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5" },
            { kind: "text", text: " liters" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7.5" },
            { kind: "text", text: " liters" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " liters" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "12.5" },
            { kind: "text", text: " liters" },
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
            { display: "block", kind: "math", math: "2{,}5" },
            { kind: "text", text: " liter" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5" },
            { kind: "text", text: " liter" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7{,}5" },
            { kind: "text", text: " liter" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " liter" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "12{,}5" },
            { kind: "text", text: " liter" },
          ],
        },
      ],
    },
  },
};

export default item;
