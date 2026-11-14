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
          label: "$$5$$ detik",
        },
        {
          correct: false,
          label: "$$5{,}5$$ detik",
        },
        {
          correct: false,
          label: "$$7$$ detik",
        },
        {
          correct: false,
          label: "$$12{,}5$$ detik",
        },
        {
          correct: true,
          label: "$$18$$ detik",
        },
      ],
    },
  },
};

export default item;
