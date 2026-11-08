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
          label: "$$130\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$240\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$260\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$360\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$520\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
