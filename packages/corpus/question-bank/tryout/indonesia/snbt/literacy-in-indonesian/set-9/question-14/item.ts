import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "water-stunting",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "21,0 persen",
        },
        {
          correct: true,
          label: "22,4 persen",
        },
        {
          correct: false,
          label: "23,8 persen",
        },
        {
          correct: false,
          label: "27,0 persen",
        },
        {
          correct: false,
          label: "33,0 persen",
        },
      ],
    },
  },
};

export default item;
