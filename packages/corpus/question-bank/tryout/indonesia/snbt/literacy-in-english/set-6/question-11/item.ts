import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The character treats completing the whole project as the necessary first step before seeking review.",
        },
        {
          correct: false,
          label:
            "The account presents metadata as a general idea rather than something developed through the character's choice.",
        },
        {
          correct: false,
          label:
            "The main obstacle becomes manageable because another person assumes responsibility for the next step.",
        },
        {
          correct: false,
          label:
            "The passage presents documenting uncertainty as more important than taking a reviewable action.",
        },
        {
          correct: true,
          label:
            "Theo records uncertainty about a photograph instead of guessing, which preserves the record for later evidence from a visitor.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
