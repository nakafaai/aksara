import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "When one welcome needs two translations",
        },
        {
          isCorrect: false,
          label: "Waiting for someone else to complete the next step",
        },
        {
          isCorrect: false,
          label: "Hiding unresolved evidence in a larger project",
        },
        {
          isCorrect: false,
          label: "connotation as a definition without a reviewable action",
        },
        {
          isCorrect: false,
          label: "A complete plan without a small accountable step",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
