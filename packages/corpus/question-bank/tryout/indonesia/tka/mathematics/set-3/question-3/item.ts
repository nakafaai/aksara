import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$\\sqrt{5^2}=5$, da $5>0$",
        },
        {
          isCorrect: true,
          label: "$(-5)^2=5^2$",
        },
        {
          isCorrect: false,
          label: "$5^{-1}=-5$",
        },
        {
          isCorrect: true,
          label: "$5^{\\frac12}\\cdot 5^{\\frac12}=5$",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$\\sqrt{5^2}=5$ because $5>0$",
        },
        {
          isCorrect: true,
          label: "$(-5)^2=5^2$",
        },
        {
          isCorrect: false,
          label: "$5^{-1}=-5$",
        },
        {
          isCorrect: true,
          label: "$5^{\\frac12}\\cdot 5^{\\frac12}=5$",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$\\sqrt{5^2}=5$ untuk $5>0$",
        },
        {
          isCorrect: true,
          label: "$(-5)^2=5^2$",
        },
        {
          isCorrect: false,
          label: "$5^{-1}=-5$",
        },
        {
          isCorrect: true,
          label: "$5^{\\frac12}\\cdot 5^{\\frac12}=5$",
        },
      ],
    },
  },
};

export default item;
