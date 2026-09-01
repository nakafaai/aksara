import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *cognitive load* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          isCorrect: false,
          label:
            "The definition reduces *cognitive load* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          isCorrect: false,
          label:
            "The term *cognitive load* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why removing nonessential detail can make the safe route easier to locate: the reader has less information to hold and process at once.",
        },
        {
          isCorrect: false,
          label:
            "The definition is included only to name the setting and has no connection to the character's decision.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
