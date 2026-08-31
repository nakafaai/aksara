import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance; the choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance; the action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: true,
          label:
            "Following one bag through the full route gives Hana a traceable chain of evidence and replaces a broad impression with a testable account.",
        },
        {
          isCorrect: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance; the decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance; the setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
