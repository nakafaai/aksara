import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Evidence-informed change in a neighbourhood bus information board",
        },
        {
          isCorrect: false,
          label:
            "Absolute certainty about a neighbourhood bus information board",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in a neighbourhood bus information board should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of wayfinding",
        },
        {
          isCorrect: false,
          label: "One rule for every a neighbourhood bus information board",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
