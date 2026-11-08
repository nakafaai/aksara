import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "fine-dust",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "16,3",
        },
        {
          correct: false,
          label: "26,0",
        },
        {
          correct: false,
          label: "32,0",
        },
        {
          correct: false,
          label: "55,9",
        },
        {
          correct: false,
          label: "114,0",
        },
      ],
    },
  },
};

export default item;
