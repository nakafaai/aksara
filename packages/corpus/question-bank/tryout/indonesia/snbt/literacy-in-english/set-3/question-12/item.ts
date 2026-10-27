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
            "Leah reduced the plan to one interview and wrote down what evidence was still missing. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          correct: true,
          label:
            "By narrowing the plan to one interview and recording the missing evidence, Leah replaces avoidance with a bounded action whose result can be reviewed.",
        },
        {
          correct: false,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          correct: false,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          correct: false,
          label:
            "Leah reduced the plan to one interview and wrote down what evidence was still missing. The setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
};

export default item;
