import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The exact location of the leak is already known.",
        },
        {
          isCorrect: true,
          label: "Further inspection by a responsible person is needed.",
        },
        {
          isCorrect: false,
          label: "The meter must be destroyed.",
        },
        {
          isCorrect: false,
          label: "Every wall should be opened immediately.",
        },
        {
          isCorrect: false,
          label: "The photographs should be deleted.",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
