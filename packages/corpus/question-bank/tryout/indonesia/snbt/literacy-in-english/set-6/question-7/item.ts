import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
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
        {
          correct: false,
          label:
            "The comparison condition makes the baseline unnecessary, so the changed value alone is sufficient for the conclusion.",
        },
        {
          correct: false,
          label:
            "The comparison condition produced a mean value of $$15$$. Because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          correct: true,
          label:
            "The trial mean reached $$25$$ repairs per session completed without fetching a missing tool, compared with $$14$$ and $$15$$. Differences in repair difficulty support a limited follow-up rather than a general rule.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
