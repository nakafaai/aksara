import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A guess about a hidden pipe without observations",
        },
        {
          isCorrect: false,
          label: "The color of every room in the building",
        },
        {
          isCorrect: true,
          label:
            "The two readings, exact times, and any visible signs of water",
        },
        {
          isCorrect: false,
          label: "A list of unrelated electricity use",
        },
        {
          isCorrect: false,
          label: "A promise that the meter never changes",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
