import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Das arithmetische Mittel ist $5$.",
        },
        {
          isCorrect: true,
          label: "Der Median ist $4$.",
        },
        {
          isCorrect: true,
          label: "Der Modalwert ist $4$.",
        },
        {
          isCorrect: false,
          label: "Die Spannweite ist $4$.",
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "The mean is $5$.",
        },
        {
          isCorrect: true,
          label: "The median is $4$.",
        },
        {
          isCorrect: true,
          label: "The mode is $4$.",
        },
        {
          isCorrect: false,
          label: "The range is $4$.",
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Rata-ratanya $5$.",
        },
        {
          isCorrect: true,
          label: "Mediannya $4$.",
        },
        {
          isCorrect: true,
          label: "Modusnya $4$.",
        },
        {
          isCorrect: false,
          label: "Jangkauannya $4$.",
        },
      ],
    },
  },
};

export default item;
