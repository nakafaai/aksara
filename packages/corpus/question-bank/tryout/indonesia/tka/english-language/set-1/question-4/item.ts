import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To make rain fall more often",
        },
        {
          isCorrect: false,
          label: "To attract insects to the water",
        },
        {
          isCorrect: false,
          label: "To hide the containers from gardeners",
        },
        {
          isCorrect: true,
          label: "To help reduce heating in the hottest corner",
        },
        {
          isCorrect: false,
          label: "To make the containers heavier",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
