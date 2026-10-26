import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Omar faced an obstacle while trying to review an accessibility map and learned through a small accountable action.",
        },
        {
          correct: false,
          label:
            "The character treats completing the whole project as the necessary first step before seeking review.",
        },
        {
          correct: false,
          label:
            "The account presents co-design as a general idea rather than something developed through the character's choice.",
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
  stimulus: "passage-3",
};

export default item;
