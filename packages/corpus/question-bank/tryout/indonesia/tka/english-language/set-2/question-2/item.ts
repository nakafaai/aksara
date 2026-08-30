import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "On the roof",
        },
        {
          isCorrect: false,
          label: "Under the engine",
        },
        {
          isCorrect: true,
          label: "Near the entrance",
        },
        {
          isCorrect: false,
          label: "At the temporary landing",
        },
        {
          isCorrect: false,
          label: "Behind the inspection tray",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
