import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "He stays practical when he has to act in the dark.",
        },
        {
          isCorrect: false,
          label: "He is annoyed that his grandmother needs his help.",
        },
        {
          isCorrect: true,
          label: "He is able to laugh at his own fear afterwards.",
        },
        {
          isCorrect: true,
          label: "He tries to make his grandmother feel at ease.",
        },
      ],
    },
  },
  stimulusKey: "power-cut",
};

export default item;
