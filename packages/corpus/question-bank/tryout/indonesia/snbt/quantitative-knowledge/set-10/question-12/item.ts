import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48" },
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48{,}5" },
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "49" },
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "49{,}5" },
            { kind: "text", text: " Tage" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "50" },
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
            { display: "block", kind: "math", math: "48" },
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48.5" },
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "49" },
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "49.5" },
            { kind: "text", text: " days" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "50" },
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
            { display: "block", kind: "math", math: "48" },
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48{,}5" },
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "49" },
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "49{,}5" },
            { kind: "text", text: " hari" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "50" },
            { kind: "text", text: " hari" },
          ],
        },
      ],
    },
  },
};

export default item;
