import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "fact-opinion",
  },
  stimulus: "egret-hide",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The boardwalk is about two hundred meters long.",
        },
        {
          correct: false,
          label:
            "Herons often hunt in the reeds directly in front of the slits, only a few meters from the bench.",
        },
        {
          correct: false,
          label:
            "Every Monday, a ranger copies the new entries into the reserve's records.",
        },
        {
          correct: true,
          label:
            "The ground floor is the most rewarding place for a first visit.",
        },
        {
          correct: false,
          label: "The platform is closed whenever the wind is strong.",
        },
      ],
    },
  },
};

export default item;
