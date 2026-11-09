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
          label: "$$1{,}6$$ m",
        },
        {
          correct: true,
          label: "$$2{,}4$$ m",
        },
        {
          correct: false,
          label: "$$2{,}6$$ m",
        },
        {
          correct: false,
          label: "$$3{,}6$$ m",
        },
        {
          correct: false,
          label: "$$5{,}76$$ m",
        },
      ],
    },
  },
};

export default item;
