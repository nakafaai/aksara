import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The class tested adding a measured mass of table salt in the freezing point of salt solutions while controlling other factors and reporting a limitation.",
        },
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of the freezing point of salt solutions without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every the freezing point of salt solutions.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines solute without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
