import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "canteen-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sekitar 27,8 persen",
        },
        {
          correct: false,
          label: "32,5 persen",
        },
        {
          correct: true,
          label: "Sekitar 34,2 persen",
        },
        {
          correct: false,
          label: "45 persen",
        },
        {
          correct: false,
          label: "Sekitar 72,2 persen",
        },
      ],
    },
  },
};

export default item;
