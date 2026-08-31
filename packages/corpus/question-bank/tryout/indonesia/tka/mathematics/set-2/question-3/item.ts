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
          label: "$ab=1$",
        },
        {
          isCorrect: true,
          label: "$a-b=4$",
        },
        {
          isCorrect: true,
          label: "$a^2+b^2=18$",
        },
        {
          isCorrect: false,
          label: "$a+b=4$",
        },
        {
          isCorrect: true,
          label: "$a^2-4a-1=0$",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$ab=1$",
        },
        {
          isCorrect: true,
          label: "$a-b=4$",
        },
        {
          isCorrect: true,
          label: "$a^2+b^2=18$",
        },
        {
          isCorrect: false,
          label: "$a+b=4$",
        },
        {
          isCorrect: true,
          label: "$a^2-4a-1=0$",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "$ab=1$",
        },
        {
          isCorrect: true,
          label: "$a-b=4$",
        },
        {
          isCorrect: true,
          label: "$a^2+b^2=18$",
        },
        {
          isCorrect: false,
          label: "$a+b=4$",
        },
        {
          isCorrect: true,
          label: "$a^2-4a-1=0$",
        },
      ],
    },
  },
};

export default item;
