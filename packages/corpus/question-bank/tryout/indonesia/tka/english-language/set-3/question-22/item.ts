import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "repair-first",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Public organizations should check repairability before replacement.",
        },
        {
          correct: false,
          label: "The passage names three questions for repair decisions.",
        },
        {
          correct: false,
          label: "A damaged cable is one example of a repairable fault.",
        },
        {
          correct: false,
          label: "The decision record includes the estimated repair cost.",
        },
        {
          correct: false,
          label: "Unavailable expertise is identified as a possible risk.",
        },
      ],
    },
  },
};

export default item;
