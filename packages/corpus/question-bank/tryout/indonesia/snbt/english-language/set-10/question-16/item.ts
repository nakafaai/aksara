import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of an empty hall after a planning meeting without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every an empty hall after a planning meeting.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: true,
          label:
            "Iris's small choice changes the meaning of a pencil-worn ledger while addressing a conflict in an empty hall after a planning meeting.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines open ending without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
