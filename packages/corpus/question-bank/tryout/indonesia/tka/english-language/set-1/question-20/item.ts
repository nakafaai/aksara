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
          label:
            "A list of room colors and furniture placed near visible pipes",
        },
        {
          isCorrect: false,
          label:
            "A list of electricity use recorded during the same test period",
        },
        {
          isCorrect: true,
          label:
            "The two readings, exact times, and any visible signs of water",
        },
        {
          isCorrect: false,
          label:
            "An assurance that the observer did not notice other water use",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
