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
          label: "Near the stairs",
        },
        {
          isCorrect: false,
          label: "In the western corner",
        },
        {
          isCorrect: true,
          label: "On the eastern side",
        },
        {
          isCorrect: false,
          label: "Beside the street",
        },
        {
          isCorrect: false,
          label: "Under the work table",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
