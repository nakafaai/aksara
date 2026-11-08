import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "tsunami",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pasang",
        },
        {
          correct: true,
          label: "berkurang",
        },
        {
          correct: false,
          label: "meluap ke daratan",
        },
        {
          correct: false,
          label: "membeku",
        },
        {
          correct: false,
          label: "menguap",
        },
      ],
    },
  },
};

export default item;
