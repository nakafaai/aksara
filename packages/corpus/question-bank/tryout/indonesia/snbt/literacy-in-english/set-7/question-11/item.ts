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
            "The account presents cognitive load as a general idea rather than something developed through the character's choice.",
        },
        {
          correct: true,
          label:
            "Priya reduces an overloaded flood warning to two sentences and tests it with an unfamiliar reader, turning assumed clarity into evidence.",
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
