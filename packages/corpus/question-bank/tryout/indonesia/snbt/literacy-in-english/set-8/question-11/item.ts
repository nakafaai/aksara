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
          correct: true,
          label:
            "Jonas keeps two translations and marks their appropriate contexts, allowing organisers to choose wording by relationship and level of formality.",
        },
        {
          correct: false,
          label:
            "The account presents connotation as a general idea rather than something developed through the character's choice.",
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
