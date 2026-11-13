import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "homework-limits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It rejects the limit as too strict, arguing that homework raises achievement at every age.",
        },
        {
          correct: false,
          label:
            "It agrees that homework should be dropped at every age but doubts that the pilot measured the right outcomes.",
        },
        {
          correct: true,
          label:
            "It backs the change for the youngest pupils but questions whether the pilot can justify scrapping homework for older ones.",
        },
        {
          correct: false,
          label:
            "It disputes the figures on bedtimes and family arguments as too short-term to be trusted.",
        },
        {
          correct: false,
          label:
            "It defends the limit against critics who find it too generous, while agreeing that test scores are the best guide.",
        },
      ],
    },
  },
};

export default item;
