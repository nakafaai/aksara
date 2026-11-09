import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "coffee-plots",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kebun A",
        },
        {
          correct: false,
          label: "Kebun B",
        },
        {
          correct: false,
          label: "Kebun C",
        },
        {
          correct: true,
          label: "Kebun D",
        },
        {
          correct: false,
          label: "Kebun A dan Kebun D sama besarnya",
        },
      ],
    },
  },
};

export default item;
