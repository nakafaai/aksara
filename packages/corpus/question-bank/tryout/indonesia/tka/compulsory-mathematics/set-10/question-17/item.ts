import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "saluran",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50$$ menit",
        },
        {
          correct: false,
          label: "$$1$$ jam",
        },
        {
          correct: false,
          label: "$$1$$ jam $$30$$ menit",
        },
        {
          correct: true,
          label: "$$1$$ jam $$40$$ menit",
        },
        {
          correct: false,
          label: "$$2$$ jam",
        },
      ],
    },
  },
};

export default item;
