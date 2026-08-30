import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Jonas's next step in a youth translation club",
        },
        {
          isCorrect: false,
          label: "Absolute certainty about a youth translation club",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a youth translation club should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of connotation",
        },
        {
          isCorrect: false,
          label: "One rule for every a youth translation club",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
