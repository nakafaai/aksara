import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$k<-4$$ atau $$k>2$$",
        },
        {
          correct: false,
          label: "$$-2<k<4$$",
        },
        {
          correct: true,
          label: "$$-4<k<2$$",
        },
        {
          correct: false,
          label: "$$-4\\leq k\\leq2$$",
        },
        {
          correct: false,
          label: "$$k=-4$$ atau $$k=2$$",
        },
      ],
    },
  },
};

export default item;
