import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The short duration limits precision, but the observed pattern can already be generalized to every comparable setting.",
        },
        {
          isCorrect: false,
          label:
            "The recorded difference should count as no evidence at all until a longer repetition produces exactly the same mean.",
        },
        {
          isCorrect: false,
          label:
            "The comparison condition makes the baseline unnecessary, so the changed value alone is sufficient for the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The comparison condition produced a mean value of 15; because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          isCorrect: true,
          label:
            "The trial reached 25 completed repairs, compared with 14 and 15; because objects differed greatly in repair difficulty, the result supports a limited follow-up rather than a general rule.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
