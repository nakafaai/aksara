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
          label:
            "The western corner uses mesh to cool seedlings kept inside dark containers.",
        },
        {
          isCorrect: true,
          label:
            "The eastern side uses shade cloth to protect seedlings during the brightest hours.",
        },
        {
          isCorrect: false,
          label:
            "The stair area uses heavy planters to shade the herbs from afternoon light.",
        },
        {
          isCorrect: false,
          label:
            "The work area uses the sealed notebook to reduce heat around seedlings.",
        },
        {
          isCorrect: false,
          label:
            "The western corner moves flowering plants beneath bamboo frames whenever sunlight is strongest.",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
