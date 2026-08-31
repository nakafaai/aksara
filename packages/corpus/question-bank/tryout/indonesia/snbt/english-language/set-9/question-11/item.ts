import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The character treats completing the whole project as the necessary first step before seeking review.",
        },
        {
          isCorrect: true,
          label:
            "Hana traces one bag through the full waste route and discovers that mismatched permit symbols create an error before the bag reaches the bin.",
        },
        {
          isCorrect: false,
          label:
            "The account presents systems thinking as a general idea rather than something developed through the character's choice.",
        },
        {
          isCorrect: false,
          label:
            "The main obstacle becomes manageable because another person assumes responsibility for the next step.",
        },
        {
          isCorrect: false,
          label:
            "The passage presents documenting uncertainty as more important than taking a reviewable action.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
