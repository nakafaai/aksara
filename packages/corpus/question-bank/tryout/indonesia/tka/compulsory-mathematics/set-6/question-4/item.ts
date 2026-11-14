import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pukul 08.00",
        },
        {
          correct: false,
          label: "pukul 11.00",
        },
        {
          correct: false,
          label: "pukul 12.00",
        },
        {
          correct: false,
          label: "pukul 12.30",
        },
        {
          correct: true,
          label: "pukul 13.00",
        },
      ],
    },
  },
};

export default item;
