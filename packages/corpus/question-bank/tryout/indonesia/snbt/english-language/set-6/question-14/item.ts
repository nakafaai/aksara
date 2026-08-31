import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *metadata* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why Theo's note about the uncertain date belongs to the photograph's record and supports later verification.",
        },
        {
          isCorrect: false,
          label:
            "The definition reduces *metadata* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          isCorrect: false,
          label:
            "The term *metadata* describes the final outcome as certain, even though the narrative presents a gradual change.",
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
