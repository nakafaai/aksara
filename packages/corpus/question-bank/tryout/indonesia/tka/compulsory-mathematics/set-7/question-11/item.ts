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
          correct: true,
          label: "$$9$$ m",
        },
        {
          correct: false,
          label: "$$12$$ m",
        },
        {
          correct: false,
          label: "$$16$$ m",
        },
        {
          correct: false,
          label: "$$36$$ m",
        },
        {
          correct: false,
          label: "$$48$$ m",
        },
      ],
    },
  },
};

export default item;
