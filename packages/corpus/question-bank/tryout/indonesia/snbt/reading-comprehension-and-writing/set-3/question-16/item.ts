import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "night-watch",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20$$ orang",
        },
        {
          correct: false,
          label: "$$24$$ orang",
        },
        {
          correct: true,
          label: "$$25$$ orang",
        },
        {
          correct: false,
          label: "$$30$$ orang",
        },
        {
          correct: false,
          label: "$$32$$ orang",
        },
      ],
    },
  },
};

export default item;
