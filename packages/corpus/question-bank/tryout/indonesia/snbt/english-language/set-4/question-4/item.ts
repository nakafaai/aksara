import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "in this passage, an assumption that never needs to be examined in the freezing point of salt solutions",
        },
        {
          isCorrect: false,
          label:
            "in this passage, a final result that always applies to every situation",
        },
        {
          isCorrect: true,
          label: "a substance dissolved uniformly in another substance",
        },
        {
          isCorrect: false,
          label:
            "in this passage, a detail removed because it challenges an opinion",
        },
        {
          isCorrect: false,
          label:
            "in this passage, decorative language unrelated to the setting",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
