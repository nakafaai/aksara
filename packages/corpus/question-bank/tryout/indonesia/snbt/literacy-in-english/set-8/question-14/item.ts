import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *connotation* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          isCorrect: false,
          label:
            "The definition reduces *connotation* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          isCorrect: false,
          label:
            "The term *connotation* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          isCorrect: false,
          label:
            "The definition is included only to name the setting and has no connection to the character's decision.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why two literal equivalents can suit different settings: each carries a social meaning and level of formality beyond its basic reference.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
