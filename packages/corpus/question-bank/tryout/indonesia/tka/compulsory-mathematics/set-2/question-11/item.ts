import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12$$ m",
        },
        {
          correct: false,
          label: "$$9$$ m",
        },
        {
          correct: false,
          label: "$$6$$ m",
        },
        {
          correct: false,
          label: "$$4$$ m",
        },
        {
          correct: true,
          label: "$$3$$ m",
        },
      ],
    },
  },
};

export default item;
