import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "peta",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$9$$ gulungan",
        },
        {
          correct: false,
          label: "$$20$$ gulungan",
        },
        {
          correct: false,
          label: "$$23$$ gulungan",
        },
        {
          correct: false,
          label: "$$25$$ gulungan",
        },
        {
          correct: true,
          label: "$$26$$ gulungan",
        },
      ],
    },
  },
};

export default item;
