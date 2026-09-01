import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view; the choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view; the action transfers responsibility for the unresolved task entirely to Amina.",
        },
        {
          isCorrect: true,
          label:
            "Testing the route with Amina turns Omar's assumption about access into visible failures that an intended user can document and the team can correct.",
        },
        {
          isCorrect: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view; the decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Omar and Amina tested the route and marked where signs disappeared from view; the setting alone produces the change, so their decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
