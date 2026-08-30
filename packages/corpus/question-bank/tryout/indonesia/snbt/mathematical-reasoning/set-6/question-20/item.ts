import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}72" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}44" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2{,}88" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3{,}66" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4{,}20" },
            { kind: "text", text: " Km" },
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
            { display: "block", kind: "math", math: "0.72" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1.44" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2.88" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3.66" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4.20" },
            { kind: "text", text: " Km" },
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
            { display: "block", kind: "math", math: "0{,}72" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}44" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2{,}88" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3{,}66" },
            { kind: "text", text: " Km" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4{,}20" },
            { kind: "text", text: " Km" },
          ],
        },
      ],
    },
  },
};

export default item;
