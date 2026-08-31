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
            "The mean result with the change was 31; because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          isCorrect: true,
          label:
            "The mixture held at 37°C produced a mean of 31 under the stated sample controls; an eye-estimated colour scale keeps the result provisional.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
