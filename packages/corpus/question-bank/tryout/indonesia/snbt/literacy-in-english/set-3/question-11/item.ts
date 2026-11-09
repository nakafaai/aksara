import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
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
            "The account presents self-efficacy as a general idea rather than something developed through the character's choice.",
        },
        {
          correct: true,
          label:
            "Leah faced an obstacle while trying to finish a family-history audio project and learned through a small accountable action.",
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
      ],
    },
  },
};

export default item;
