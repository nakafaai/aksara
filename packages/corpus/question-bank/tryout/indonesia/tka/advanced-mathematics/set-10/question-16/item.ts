import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11$$",
        },
        {
          correct: false,
          label: "$$17$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: false,
          label: "$$3$$",
        },
        {
          correct: true,
          label: "$$9$$",
        },
      ],
    },
  },
};

export default item;
