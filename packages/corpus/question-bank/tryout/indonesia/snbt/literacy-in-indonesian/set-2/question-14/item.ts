import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "rice-irrigation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sekitar 5 persen",
        },
        {
          correct: true,
          label: "35 persen",
        },
        {
          correct: false,
          label: "42 persen",
        },
        {
          correct: false,
          label: "Sekitar 54 persen",
        },
        {
          correct: false,
          label: "65 persen",
        },
      ],
    },
  },
};

export default item;
