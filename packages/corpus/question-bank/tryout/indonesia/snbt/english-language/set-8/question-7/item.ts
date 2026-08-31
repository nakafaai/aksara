import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The comparison condition makes the baseline unnecessary, so the changed value alone is sufficient for the conclusion.",
        },
        {
          isCorrect: false,
          label:
            "The comparison condition produced a mean value of 20; because it differs from the other conditions, the tested change is the only plausible explanation.",
        },
        {
          isCorrect: false,
          label:
            "The short duration limits precision, but the observed pattern can already be generalized to every comparable setting.",
        },
        {
          isCorrect: true,
          label:
            "The trial reached 31 first-review acceptances, compared with 19 and 20; because one glossary cannot represent every regional or family use, the result supports a limited follow-up.",
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
