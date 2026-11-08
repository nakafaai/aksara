import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$308$$ liter",
        },
        {
          correct: true,
          label: "$$3{.}080$$ liter",
        },
        {
          correct: false,
          label: "$$4{.}400$$ liter",
        },
        {
          correct: false,
          label: "$$12{.}320$$ liter",
        },
        {
          correct: false,
          label: "$$30{.}800$$ liter",
        },
      ],
    },
  },
};

export default item;
