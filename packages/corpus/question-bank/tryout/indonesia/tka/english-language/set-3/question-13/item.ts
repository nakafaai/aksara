import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The greenhouse had a loose board.",
        },
        {
          isCorrect: false,
          label: "The envelope looked faded.",
        },
        {
          isCorrect: false,
          label: "The exhibition concerned future food.",
        },
        {
          isCorrect: false,
          label: "Twelve days passed before seedlings appeared.",
        },
        {
          isCorrect: true,
          label: "The project listed checkpoints from 2024 to 2040.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
