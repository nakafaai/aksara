import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mina rebuilds participation in a science-fair team by asking each member to voice a concern, showing that leadership can make disagreement discussable instead of forcing speed.",
        },
        {
          correct: false,
          label:
            "The character treats completing the whole project as the necessary first step before seeking review.",
        },
        {
          correct: false,
          label:
            "The account presents psychological safety as a general idea rather than something developed through the character's choice.",
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
