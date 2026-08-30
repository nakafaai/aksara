import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To require the same long investigation for every claim",
        },
        {
          isCorrect: false,
          label: "To remove graphs and quotations from schoolwork",
        },
        {
          isCorrect: true,
          label:
            "To argue that source checking should be taught repeatedly across subjects",
        },
        {
          isCorrect: false,
          label: "To make students distrust every statement",
        },
        {
          isCorrect: false,
          label: "To place all checking work in one annual lesson",
        },
      ],
    },
  },
  stimulusKey: "source-checking",
};

export default item;
