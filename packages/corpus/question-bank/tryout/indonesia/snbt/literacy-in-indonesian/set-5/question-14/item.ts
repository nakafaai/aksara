import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "chili-prices",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "38,0 persen",
        },
        {
          correct: false,
          label: "48,6 persen",
        },
        {
          correct: true,
          label: "51,4 persen",
        },
        {
          correct: false,
          label: "105,6 persen",
        },
        {
          correct: false,
          label: "205,6 persen",
        },
      ],
    },
  },
};

export default item;
