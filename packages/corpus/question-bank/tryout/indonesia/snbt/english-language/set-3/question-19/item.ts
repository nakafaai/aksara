import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "in this passage, an assumption that never needs to be examined in a station before sunrise",
        },
        {
          isCorrect: false,
          label:
            "in this passage, a final result that always applies to every situation",
        },
        {
          isCorrect: true,
          label: "a contrast between what is expected and what actually occurs",
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
  stimulusKey: "passage-4",
};

export default item;
