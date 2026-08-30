import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}15" },
            { kind: "text", text: " Teil" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}3" },
            { kind: "text", text: " Teil" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}45" },
            { kind: "text", text: " Teil" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}6" },
            { kind: "text", text: " Teil" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "0{,}75" },
            { kind: "text", text: " Teil" },
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
            { display: "block", kind: "math", math: "0.15" },
            { kind: "text", text: " part" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0.3" },
            { kind: "text", text: " part" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0.45" },
            { kind: "text", text: " part" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0.6" },
            { kind: "text", text: " part" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "0.75" },
            { kind: "text", text: " part" },
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
            { display: "block", kind: "math", math: "0{,}15" },
            { kind: "text", text: " bagian" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}3" },
            { kind: "text", text: " bagian" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}45" },
            { kind: "text", text: " bagian" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0{,}6" },
            { kind: "text", text: " bagian" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "0{,}75" },
            { kind: "text", text: " bagian" },
          ],
        },
      ],
    },
  },
};

export default item;
