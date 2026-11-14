import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "village-pool",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$25$$ jam",
        },
        {
          correct: false,
          label: "$$33$$ jam $$20$$ menit",
        },
        {
          correct: false,
          label: "$$50$$ jam",
        },
        {
          correct: false,
          label: "$$66$$ jam $$40$$ menit",
        },
        {
          correct: false,
          label: "$$100$$ jam",
        },
      ],
    },
  },
};

export default item;
