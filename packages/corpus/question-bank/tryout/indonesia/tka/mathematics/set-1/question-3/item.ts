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
          label: "$x^2+\\frac1{x^2}=7$",
        },
        {
          isCorrect: true,
          label: "$(x-\\frac1x)^2=5$",
        },
        {
          isCorrect: true,
          label: "$x$ ist eine Nullstelle von $t^2-3t+1=0$.",
        },
        {
          isCorrect: false,
          label: "$x$ ist rational.",
        },
        {
          isCorrect: true,
          label: "$x^3+\\frac1{x^3}=18$",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$x^2+\\frac1{x^2}=7$",
        },
        {
          isCorrect: true,
          label: "$(x-\\frac1x)^2=5$",
        },
        {
          isCorrect: true,
          label: "$x$ is a root of $t^2-3t+1=0$.",
        },
        {
          isCorrect: false,
          label: "$x$ is rational.",
        },
        {
          isCorrect: true,
          label: "$x^3+\\frac1{x^3}=18$",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$x^2+\\frac1{x^2}=7$",
        },
        {
          isCorrect: true,
          label: "$(x-\\frac1x)^2=5$",
        },
        {
          isCorrect: true,
          label: "$x$ merupakan akar $t^2-3t+1=0$.",
        },
        {
          isCorrect: false,
          label: "$x$ merupakan bilangan rasional.",
        },
        {
          isCorrect: true,
          label: "$x^3+\\frac1{x^3}=18$",
        },
      ],
    },
  },
};

export default item;
