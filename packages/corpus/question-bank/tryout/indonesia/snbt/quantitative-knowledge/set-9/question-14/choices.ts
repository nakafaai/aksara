import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$\\frac{17}{14}; 123\\%; 1.45; \\frac{5}{3}; \\sqrt{12}$$",
      value: true,
    },
    {
      label: "$$\\frac{17}{14}; 123\\%; 1.45; \\sqrt{12}; \\frac{5}{3}$$",
      value: false,
    },
    {
      label: "$$\\frac{5}{3}; \\frac{17}{14}; 123\\%; 1.45; \\sqrt{12}$$",
      value: false,
    },
    {
      label: "$$\\frac{5}{3}; 123\\%; 1.45; \\sqrt{12}; \\frac{17}{14}$$",
      value: false,
    },
    {
      label: "$$123\\%; \\frac{5}{3}; 1.45; \\sqrt{12}; \\frac{17}{14}$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$\\frac{17}{14}; 123\\%; 1{,}45; \\frac{5}{3}; \\sqrt{12}$$",
      value: true,
    },
    {
      label: "$$\\frac{17}{14}; 123\\%; 1{,}45; \\sqrt{12}; \\frac{5}{3}$$",
      value: false,
    },
    {
      label: "$$\\frac{5}{3}; \\frac{17}{14}; 123\\%; 1{,}45; \\sqrt{12}$$",
      value: false,
    },
    {
      label: "$$\\frac{5}{3}; 123\\%; 1{,}45; \\sqrt{12}; \\frac{17}{14}$$",
      value: false,
    },
    {
      label: "$$123\\%; \\frac{5}{3}; 1{,}45; \\sqrt{12}; \\frac{17}{14}$$",
      value: false,
    },
  ],
};

export default choices;
