import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18$$ menit $$45$$ detik",
        },
        {
          correct: false,
          label: "$$1$$ jam",
        },
        {
          correct: true,
          label: "$$1$$ jam $$15$$ menit",
        },
        {
          correct: false,
          label: "$$1$$ jam $$40$$ menit",
        },
        {
          correct: false,
          label: "$$3$$ jam $$20$$ menit",
        },
      ],
    },
  },
};

export default item;
