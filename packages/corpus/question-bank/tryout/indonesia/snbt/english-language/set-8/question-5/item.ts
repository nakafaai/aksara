import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Testing folding the deck into a triangular truss in load distribution in paper bridge models",
        },
        {
          isCorrect: false,
          label:
            "Absolute certainty about load distribution in paper bridge models",
        },
        {
          isCorrect: false,
          label:
            "Why all evidence in load distribution in paper bridge models should be ignored",
        },
        {
          isCorrect: false,
          label: "The complete world history of truss",
        },
        {
          isCorrect: false,
          label: "One rule for every load distribution in paper bridge models",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
