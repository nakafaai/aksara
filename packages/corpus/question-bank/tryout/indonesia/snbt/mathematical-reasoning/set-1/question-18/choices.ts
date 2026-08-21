import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-23
const choices: QuestionChoices = {
  de: [
    {
      label: "$$90 \\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$92 \\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$94 \\text{ Gramm}$$",
      value: true,
    },
    {
      label: "$$96 \\text{ Gramm}$$",
      value: false,
    },
    {
      label: "$$98 \\text{ Gramm}$$",
      value: false,
    },
  ],
  en: [
    {
      label: "$$90 \\text{ grams}$$",
      value: false,
    },
    {
      label: "$$92 \\text{ grams}$$",
      value: false,
    },
    {
      label: "$$94 \\text{ grams}$$",
      value: true,
    },
    {
      label: "$$96 \\text{ grams}$$",
      value: false,
    },
    {
      label: "$$98 \\text{ grams}$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$90 \\text{ gram}$$",
      value: false,
    },
    {
      label: "$$92 \\text{ gram}$$",
      value: false,
    },
    {
      label: "$$94 \\text{ gram}$$",
      value: true,
    },
    {
      label: "$$96 \\text{ gram}$$",
      value: false,
    },
    {
      label: "$$98 \\text{ gram}$$",
      value: false,
    },
  ],
};

export default choices;
