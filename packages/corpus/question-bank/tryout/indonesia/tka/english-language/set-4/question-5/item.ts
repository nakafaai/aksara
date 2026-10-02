import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "fact-opinion",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The boardwalk is about two hundred meters long.",
        },
        {
          isCorrect: false,
          label:
            "Herons often hunt in the reeds directly in front of the slits, only a few meters from the bench.",
        },
        {
          isCorrect: false,
          label:
            "Every Monday, a ranger copies the new entries into the reserve's records.",
        },
        {
          isCorrect: true,
          label:
            "The ground floor is the most rewarding place for a first visit.",
        },
        {
          isCorrect: false,
          label: "The platform is closed whenever the wind is strong.",
        },
      ],
    },
  },
  stimulusKey: "egret-hide",
};

export default item;
