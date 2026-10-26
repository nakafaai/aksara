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
          correct: false,
          label:
            "The comparison condition produced a mean value of $$20$$. Because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          correct: false,
          label:
            "The short duration limits precision, but the observed pattern can already be generalized to every comparable setting.",
        },
        {
          correct: true,
          label:
            "The trial averaged $$31$$ first-review acceptances per session, compared with $$19$$ and $$20$$. Regional and family differences in usage support continued testing rather than treating the glossary as universal.",
        },
        {
          correct: false,
          label:
            "The recorded difference should count as no evidence at all until a longer repetition produces exactly the same mean.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
