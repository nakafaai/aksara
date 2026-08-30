import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1{,}5" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2{,}5" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3{,}5" },
            { kind: "text", text: " cm" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1.5" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2.5" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3.5" },
            { kind: "text", text: " cm" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1{,}5" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2{,}5" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3{,}5" },
            { kind: "text", text: " cm" },
          ],
        },
      ],
    },
  },
};

export default item;
