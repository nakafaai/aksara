import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "comparison",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The writer asked questions before suggesting a change.",
        },
        {
          isCorrect: false,
          label: "The writer refused to speak with bicycle owners.",
        },
        {
          isCorrect: false,
          label: "The writer replaced every noisy part immediately.",
        },
        {
          isCorrect: false,
          label: "The writer stopped using service notes.",
        },
        {
          isCorrect: false,
          label: "The writer expected Sari to do every repair.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
