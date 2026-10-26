import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
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
            "The mean result with the change was $$31$$. Because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          correct: true,
          label:
            "The mixture held at $$37^{\\circ}\\text{C}$$ produced a mean of $$31$$ under the stated sample controls. An eye-estimated colour scale keeps the result provisional.",
        },
      ],
    },
  },
};

export default item;
