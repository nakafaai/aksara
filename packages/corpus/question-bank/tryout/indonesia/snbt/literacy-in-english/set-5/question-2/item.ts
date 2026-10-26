import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The mean result with the change was $$67$$. Because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          correct: false,
          label:
            "The short duration limits precision, but the observed pattern can already be generalized to every comparable setting.",
        },
        {
          correct: true,
          label:
            "The coarse-fabric condition produced a mean of $$67$$ under the fixed ramp setup. Surface wear across repetitions still limits a broader inference.",
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
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
