import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of load distribution in paper bridge models without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every load distribution in paper bridge models.",
        },
        {
          isCorrect: true,
          label:
            "The class tested folding the deck into a triangular truss in load distribution in paper bridge models while controlling other factors and reporting a limitation.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines truss without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
