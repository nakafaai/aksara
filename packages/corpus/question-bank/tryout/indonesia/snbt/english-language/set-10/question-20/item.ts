import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "A pencil-worn ledger in an empty hall after a planning meeting",
        },
        {
          isCorrect: false,
          label:
            "Absolute certainty about an empty hall after a planning meeting",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in an empty hall after a planning meeting should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of open ending",
        },
        {
          isCorrect: false,
          label: "One rule for every an empty hall after a planning meeting",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
