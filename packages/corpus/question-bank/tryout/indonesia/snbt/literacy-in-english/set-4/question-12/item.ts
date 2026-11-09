import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          correct: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view. The action transfers responsibility for the unresolved task entirely to Amina.",
        },
        {
          correct: true,
          label:
            "Testing the route with Amina turns Omar's assumption about access into visible failures that an intended user can document and the team can correct.",
        },
        {
          correct: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          correct: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view. The setting alone produces the change, so their decision has no role in the development.",
        },
      ],
    },
  },
};

export default item;
