import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          correct: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          correct: true,
          label:
            "Following one bag through the full route gives Hana a traceable chain of evidence and replaces a broad impression with a testable account.",
        },
        {
          correct: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          correct: false,
          label:
            "Hana followed one bag from a stall to collection instead of judging the whole market at a glance. The setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
