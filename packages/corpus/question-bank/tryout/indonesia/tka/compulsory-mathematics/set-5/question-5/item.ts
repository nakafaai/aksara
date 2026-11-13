import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pukul $$07.40$$",
        },
        {
          correct: false,
          label: "Pukul $$07.55$$",
        },
        {
          correct: true,
          label: "Pukul $$08.10$$",
        },
        {
          correct: false,
          label: "Pukul $$08.15$$",
        },
        {
          correct: false,
          label: "Pukul $$08.40$$",
        },
      ],
    },
  },
};

export default item;
