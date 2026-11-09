import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "grain-silo",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$28{,}26\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$37{,}68\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$47{,}1\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$75{,}36\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$94{,}2\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
