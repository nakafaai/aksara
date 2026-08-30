import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{17}{14}; 123\\%; 1{,}45; \\frac{5}{3}; \\sqrt{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{17}{14}; 123\\%; 1{,}45; \\sqrt{12}; \\frac{5}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{3}; \\frac{17}{14}; 123\\%; 1{,}45; \\sqrt{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{3}; 123\\%; 1{,}45; \\sqrt{12}; \\frac{17}{14}$$",
        },
        {
          isCorrect: false,
          label: "$$123\\%; \\frac{5}{3}; 1{,}45; \\sqrt{12}; \\frac{17}{14}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{17}{14}; 123\\%; 1.45; \\frac{5}{3}; \\sqrt{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{17}{14}; 123\\%; 1.45; \\sqrt{12}; \\frac{5}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{3}; \\frac{17}{14}; 123\\%; 1.45; \\sqrt{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{3}; 123\\%; 1.45; \\sqrt{12}; \\frac{17}{14}$$",
        },
        {
          isCorrect: false,
          label: "$$123\\%; \\frac{5}{3}; 1.45; \\sqrt{12}; \\frac{17}{14}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{17}{14}; 123\\%; 1{,}45; \\frac{5}{3}; \\sqrt{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{17}{14}; 123\\%; 1{,}45; \\sqrt{12}; \\frac{5}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{3}; \\frac{17}{14}; 123\\%; 1{,}45; \\sqrt{12}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{3}; 123\\%; 1{,}45; \\sqrt{12}; \\frac{17}{14}$$",
        },
        {
          isCorrect: false,
          label: "$$123\\%; \\frac{5}{3}; 1{,}45; \\sqrt{12}; \\frac{17}{14}$$",
        },
      ],
    },
  },
};

export default item;
