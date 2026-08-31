import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
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
            "The mean result with the change was 19; because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          isCorrect: false,
          label:
            "The short duration limits precision, but the observed pattern can already be generalized to every comparable setting.",
        },
        {
          isCorrect: true,
          label:
            "The blue-filter condition produced a mean of 19 at the tested lamp distance; reduced light intensity prevents treating colour as the only explanation.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
