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
          label: "$\\sqrt{3^2}=3$, da $3>0$",
        },
        {
          isCorrect: true,
          label: "$(-3)^2=3^2$",
        },
        {
          isCorrect: false,
          label: "$3^{-1}=-3$",
        },
        {
          isCorrect: true,
          label: "$3^{\\frac12}\\cdot 3^{\\frac12}=3$",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$\\sqrt{3^2}=3$ because $3>0$",
        },
        {
          isCorrect: true,
          label: "$(-3)^2=3^2$",
        },
        {
          isCorrect: false,
          label: "$3^{-1}=-3$",
        },
        {
          isCorrect: true,
          label: "$3^{\\frac12}\\cdot 3^{\\frac12}=3$",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$\\sqrt{3^2}=3$ untuk $3>0$",
        },
        {
          isCorrect: true,
          label: "$(-3)^2=3^2$",
        },
        {
          isCorrect: false,
          label: "$3^{-1}=-3$",
        },
        {
          isCorrect: true,
          label: "$3^{\\frac12}\\cdot 3^{\\frac12}=3$",
        },
      ],
    },
  },
};

export default item;
