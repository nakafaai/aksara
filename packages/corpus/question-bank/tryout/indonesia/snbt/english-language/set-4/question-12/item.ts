import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Omar tested the route at wheelchair height and marked every place where a sign disappeared from view; the choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "Omar tested the route at wheelchair height and marked every place where a sign disappeared from view; the action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: true,
          label:
            "Testing the route at wheelchair height turns Omar's assumption about access into visible failures he can document and correct.",
        },
        {
          isCorrect: false,
          label:
            "Omar tested the route at wheelchair height and marked every place where a sign disappeared from view; the decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Omar tested the route at wheelchair height and marked every place where a sign disappeared from view; the setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
