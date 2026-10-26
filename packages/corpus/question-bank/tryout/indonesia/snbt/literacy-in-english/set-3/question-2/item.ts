import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The comparison condition makes the baseline unnecessary, so the changed value alone is sufficient for the conclusion.",
        },
        {
          correct: true,
          label:
            "The changed condition produced a mean of $$16$$ in the six-day seed-orientation trial. The number belongs to those controlled conditions and does not establish a universal effect.",
        },
        {
          correct: false,
          label:
            "The mean result with the change was $$16$$. Because it differs from the other conditions, the tested change is the only plausible explanation.",
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
  stimulus: "passage-1",
};

export default item;
