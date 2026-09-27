import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$124$$",
        },
        {
          isCorrect: true,
          label: "$$127$$",
        },
        {
          isCorrect: false,
          label: "$$126$$",
        },
        {
          isCorrect: false,
          label: "$$128$$",
        },
        {
          isCorrect: false,
          label: "$$130$$",
        },
      ],
    },
  },
  stimulusKey: "park-and-pond",
};

export default item;
