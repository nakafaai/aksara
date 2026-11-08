import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "rooftop-solar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "39,5 persen",
        },
        {
          correct: true,
          label: "48,9 persen",
        },
        {
          correct: false,
          label: "60,5 persen",
        },
        {
          correct: false,
          label: "80,9 persen",
        },
        {
          correct: false,
          label: "123,7 persen",
        },
      ],
    },
  },
};

export default item;
