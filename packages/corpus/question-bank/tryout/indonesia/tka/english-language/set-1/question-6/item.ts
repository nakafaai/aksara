import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "outline",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Listening to an owner's description before touching the bicycle",
        },
        {
          correct: false,
          label: "Replacing the child's chain without testing it",
        },
        {
          correct: true,
          label: "Sorting mixed bolts by using notes and measurements",
        },
        {
          correct: false,
          label:
            "Giving a new volunteer the repair answer before asking what the rider noticed",
        },
      ],
    },
  },
  stimulus: "repair-workshop",
};

export default item;
