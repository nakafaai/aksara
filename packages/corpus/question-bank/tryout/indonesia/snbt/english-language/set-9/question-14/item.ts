import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *systems thinking* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          isCorrect: false,
          label:
            "The definition reduces *systems thinking* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why Hana follows the bag across steps: the visible error at the bin may be produced by an earlier connection in the process.",
        },
        {
          isCorrect: false,
          label:
            "The term *systems thinking* describes the final outcome as certain, even though the narrative presents a gradual change.",
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
