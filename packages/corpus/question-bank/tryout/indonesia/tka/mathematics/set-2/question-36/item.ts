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
          label: "Das arithmetische Mittel ist $4$.",
        },
        {
          isCorrect: true,
          label: "Der Median ist $3$.",
        },
        {
          isCorrect: true,
          label: "Der Modalwert ist $3$.",
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
          label: "The mean is $4$.",
        },
        {
          isCorrect: true,
          label: "The median is $3$.",
        },
        {
          isCorrect: true,
          label: "The mode is $3$.",
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
          label: "Rata-ratanya $4$.",
        },
        {
          isCorrect: true,
          label: "Mediannya $3$.",
        },
        {
          isCorrect: true,
          label: "Modusnya $3$.",
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
