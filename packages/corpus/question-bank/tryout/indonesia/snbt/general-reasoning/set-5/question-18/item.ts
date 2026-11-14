import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "truth-teller",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Juwita tidak meraih peringkat $$3$$.",
        },
        {
          correct: false,
          label: "Laksmi meraih peringkat $$4$$.",
        },
        {
          correct: false,
          label: "Ilham adalah finalis yang berbohong.",
        },
        {
          correct: false,
          label: "Mahesa meraih peringkat $$1$$.",
        },
        {
          correct: false,
          label: "Ilham meraih peringkat $$3$$.",
        },
      ],
    },
  },
};

export default item;
