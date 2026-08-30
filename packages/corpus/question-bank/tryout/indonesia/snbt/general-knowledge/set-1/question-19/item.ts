import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7" },
            { kind: "text", text: "." },
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
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7" },
            { kind: "text", text: "." },
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
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "6" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "7" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
