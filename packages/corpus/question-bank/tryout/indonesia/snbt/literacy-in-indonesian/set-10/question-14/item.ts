import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bike-share",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Januari",
        },
        {
          correct: false,
          label: "Februari",
        },
        {
          correct: false,
          label: "Maret",
        },
        {
          correct: true,
          label: "April",
        },
        {
          correct: false,
          label: "Juni",
        },
      ],
    },
  },
};

export default item;
