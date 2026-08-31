import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ceroboh",
        },
        {
          isCorrect: true,
          label: "tanggap",
        },
        {
          isCorrect: false,
          label: "pemalu",
        },
        {
          isCorrect: false,
          label: "mudah menyerah",
        },
        {
          isCorrect: false,
          label: "pendendam",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
