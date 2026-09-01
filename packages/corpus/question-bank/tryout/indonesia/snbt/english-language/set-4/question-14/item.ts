import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *co-design* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          isCorrect: false,
          label:
            "The definition reduces *co-design* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          isCorrect: true,
          label:
            "The definition of *co-design* explains why Amina's participation in testing and revising the map is part of the design process rather than an afterthought.",
        },
        {
          isCorrect: false,
          label:
            "The term *co-design* describes the final outcome as certain, even though the narrative presents a gradual change.",
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
