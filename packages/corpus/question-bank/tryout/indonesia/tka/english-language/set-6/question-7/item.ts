import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "orange-float",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.40$$ metres per second",
        },
        {
          correct: false,
          label: "about $$0.39$$ metres per second",
        },
        {
          correct: false,
          label: "about $$0.44$$ metres per second",
        },
        {
          correct: false,
          label: "about $$0.42$$ metres per second",
        },
        {
          correct: false,
          label: "about $$0.43$$ metres per second",
        },
      ],
    },
  },
};

export default item;
