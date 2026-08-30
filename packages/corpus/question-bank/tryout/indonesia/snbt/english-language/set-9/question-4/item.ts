import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "in this passage, an assumption that never needs to be examined in a model filter for floating plastic fragments",
        },
        {
          isCorrect: false,
          label:
            "in this passage, a final result that always applies to every situation",
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
        {
          isCorrect: true,
          label:
            "the ability to choose one group of particles while allowing others to pass",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
