import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "essay-scoring",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "90 esai",
        },
        {
          correct: false,
          label: "570 esai",
        },
        {
          correct: false,
          label: "660 esai",
        },
        {
          correct: false,
          label: "2.340 esai",
        },
        {
          correct: false,
          label: "2.910 esai",
        },
      ],
    },
  },
};

export default item;
