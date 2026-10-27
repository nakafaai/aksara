import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "fair-discussion",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Provide quiet writing time.",
        },
        {
          correct: true,
          label: "Invite someone who has not spoken.",
        },
        {
          correct: true,
          label: "Allow an invited person to pass.",
        },
        {
          correct: false,
          label:
            "Prioritize speakers who can respond immediately so the discussion keeps moving.",
        },
      ],
    },
  },
};

export default item;
