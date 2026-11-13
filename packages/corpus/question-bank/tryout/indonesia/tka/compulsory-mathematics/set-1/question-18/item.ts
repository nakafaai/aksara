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
          label: "$$3$$ liter",
        },
        {
          correct: false,
          label: "$$5{,}5$$ liter",
        },
        {
          correct: true,
          label: "$$8{,}625$$ liter",
        },
        {
          correct: false,
          label: "$$9{,}375$$ liter",
        },
        {
          correct: false,
          label: "$$12$$ liter",
        },
      ],
    },
  },
};

export default item;
