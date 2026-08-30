import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Absolute certainty about a food pantry at closing time",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a food pantry at closing time should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of motif",
        },
        {
          isCorrect: false,
          label: "One rule for every a food pantry at closing time",
        },
        {
          isCorrect: true,
          label: "A blue date stamp in a food pantry at closing time",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
