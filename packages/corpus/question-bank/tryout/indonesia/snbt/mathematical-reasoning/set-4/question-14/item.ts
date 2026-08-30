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
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "8" },
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9" },
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "11" },
            { kind: "text", text: " Tage" },
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
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "8" },
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9" },
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "11" },
            { kind: "text", text: " days" },
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
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "8" },
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "9" },
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "11" },
            { kind: "text", text: " hari" },
          ],
        },
      ],
    },
  },
};

export default item;
