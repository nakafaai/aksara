import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The triangular-truss bridge produced a mean of $$39$$ under the fixed span and load placement. Variation in paper fibres and folds bounds the comparison.",
        },
        {
          correct: false,
          label:
            "The comparison condition makes the baseline unnecessary, so the changed value alone is sufficient for the conclusion.",
        },
        {
          correct: false,
          label:
            "The mean result with the change was $$39$$. Because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          correct: false,
          label:
            "The short duration limits precision, but the observed pattern can already be generalized to every comparable setting.",
        },
        {
          correct: false,
          label:
            "The recorded difference should count as no evidence at all until a longer repetition produces exactly the same mean.",
        },
      ],
    },
  },
};

export default item;
