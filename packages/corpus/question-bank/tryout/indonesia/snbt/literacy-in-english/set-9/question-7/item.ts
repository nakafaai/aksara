import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The comparison condition produced a mean value of $$37$$. Because it differs from the other conditions, the tested change is the only plausible explanation.",
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
        {
          correct: false,
          label:
            "The comparison condition makes the baseline unnecessary, so the changed value alone is sufficient for the conclusion.",
        },
        {
          correct: true,
          label:
            "The trial averaged $$54$$ correctly sorted bags per period, compared with $$36$$ and $$37$$. Changing visitor numbers and food types support further testing across more evenings.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
