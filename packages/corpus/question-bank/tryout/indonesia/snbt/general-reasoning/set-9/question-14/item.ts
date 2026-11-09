import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grid-logic",
  },
  stimulus: "lantai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Umar tinggal di lantai 1.",
        },
        {
          correct: false,
          label: "Rani hobi memotret.",
        },
        {
          correct: false,
          label: "Sita tinggal di lantai 2.",
        },
        {
          correct: false,
          label: "Tika hobi melukis.",
        },
        {
          correct: false,
          label: "Rani tinggal di lantai 4.",
        },
      ],
    },
  },
};

export default item;
