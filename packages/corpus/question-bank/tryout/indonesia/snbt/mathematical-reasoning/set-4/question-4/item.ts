import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "\\frac{3\\sqrt{6}}{2}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{3\\sqrt{3}}{2}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}\\sqrt{3}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{3}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{3}{2}\\sqrt{2}" },
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
            { display: "block", kind: "math", math: "\\frac{3\\sqrt{6}}{2}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{3\\sqrt{3}}{2}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}\\sqrt{3}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{3}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{3}{2}\\sqrt{2}" },
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
            { display: "block", kind: "math", math: "\\frac{3\\sqrt{6}}{2}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{3\\sqrt{3}}{2}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}\\sqrt{3}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{3}" },
            { kind: "text", text: " cm" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{3}{2}\\sqrt{2}" },
            { kind: "text", text: " cm" },
          ],
        },
      ],
    },
  },
};

export default item;
