import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1960" },
            { kind: "text", text: " Einheiten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2000" },
            { kind: "text", text: " Einheiten" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2520" },
            { kind: "text", text: " Einheiten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2720" },
            { kind: "text", text: " Einheiten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3000" },
            { kind: "text", text: " Einheiten" },
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
            { display: "block", kind: "math", math: "1960" },
            { kind: "text", text: " units" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2000" },
            { kind: "text", text: " units" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2520" },
            { kind: "text", text: " units" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2720" },
            { kind: "text", text: " units" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3000" },
            { kind: "text", text: " units" },
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
            { display: "block", kind: "math", math: "1960" },
            { kind: "text", text: " unit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2000" },
            { kind: "text", text: " unit" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2520" },
            { kind: "text", text: " unit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2720" },
            { kind: "text", text: " unit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3000" },
            { kind: "text", text: " unit" },
          ],
        },
      ],
    },
  },
};

export default item;
