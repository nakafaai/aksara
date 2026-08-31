import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The comparison condition produced 30, the reference used to judge the bus-stop walking-time map rather than evidence that the map suits every mobility need.",
        },
        {
          isCorrect: false,
          label:
            "The comparison condition makes the baseline unnecessary, so the changed value alone is sufficient for the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The comparison condition produced a mean value of 30; because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
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
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
