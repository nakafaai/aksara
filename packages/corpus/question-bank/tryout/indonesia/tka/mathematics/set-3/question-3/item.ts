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
          label: "$a+b=29$",
        },
        {
          isCorrect: true,
          label: "$|a-b|=21$",
        },
        {
          isCorrect: false,
          label: "$\\sqrt{a+b}=7$",
        },
        {
          isCorrect: true,
          label: "$(a-b)^2=441$",
        },
        {
          isCorrect: true,
          label: "$\\frac1{\\sqrt a}+\\frac1{\\sqrt b}=\\frac7{10}$",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$a+b=29$",
        },
        {
          isCorrect: true,
          label: "$|a-b|=21$",
        },
        {
          isCorrect: false,
          label: "$\\sqrt{a+b}=7$",
        },
        {
          isCorrect: true,
          label: "$(a-b)^2=441$",
        },
        {
          isCorrect: true,
          label: "$\\frac1{\\sqrt a}+\\frac1{\\sqrt b}=\\frac7{10}$",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$a+b=29$",
        },
        {
          isCorrect: true,
          label: "$|a-b|=21$",
        },
        {
          isCorrect: false,
          label: "$\\sqrt{a+b}=7$",
        },
        {
          isCorrect: true,
          label: "$(a-b)^2=441$",
        },
        {
          isCorrect: true,
          label: "$\\frac1{\\sqrt a}+\\frac1{\\sqrt b}=\\frac7{10}$",
        },
      ],
    },
  },
};

export default item;
