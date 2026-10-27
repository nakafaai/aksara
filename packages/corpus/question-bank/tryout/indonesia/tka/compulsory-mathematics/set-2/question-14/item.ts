import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-12$$",
        },
        {
          correct: false,
          label: "$$-10$$",
        },
        {
          correct: false,
          label: "$$-8$$",
        },
        {
          correct: true,
          label: "$$-9$$",
        },
        {
          correct: false,
          label: "$$-7$$",
        },
      ],
    },
  },
};

export default item;
