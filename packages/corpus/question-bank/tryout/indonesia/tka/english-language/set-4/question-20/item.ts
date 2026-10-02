import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "text-fit",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "If the foil tears or the hole becomes too large, replace the foil and try again.",
        },
        {
          isCorrect: false,
          label:
            "Hold the foil up to the Sun and look through the hole to check that it is open.",
        },
        {
          isCorrect: false,
          label:
            "Long ago, many people were frightened by eclipses and told stories to explain them.",
        },
        {
          isCorrect: false,
          label:
            "Dark sunglasses are a good choice when you want to check the hole quickly.",
        },
        {
          isCorrect: false,
          label:
            "I made my first projector last year, and it worked much better than I expected.",
        },
      ],
    },
  },
  stimulusKey: "pinhole-projector",
};

export default item;
