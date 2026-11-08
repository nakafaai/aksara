import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "food-waste",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sekitar 25 persen",
        },
        {
          correct: false,
          label: "Sekitar 36 persen",
        },
        {
          correct: false,
          label: "Sekitar 37 persen",
        },
        {
          correct: true,
          label: "Sekitar 24 persen",
        },
        {
          correct: false,
          label: "Hampir 50 persen",
        },
      ],
    },
  },
};

export default item;
