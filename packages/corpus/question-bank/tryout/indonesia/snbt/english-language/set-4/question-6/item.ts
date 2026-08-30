import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The passage only gives a complete history of a local history display without examining evidence or choice.",
        },
        {
          isCorrect: false,
          label:
            "The passage proves that one method must succeed in every a local history display.",
        },
        {
          isCorrect: true,
          label:
            "The organisers of a local history display evaluated short captions that separated observation from interpretation through a comparison and consultation with affected groups.",
        },
        {
          isCorrect: false,
          label:
            "The passage rejects all observation and relies only on personal preference.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly defines plain language without connecting it to a setting.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
