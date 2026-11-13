import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The bottle leaked slowly through a crack near its domed base.",
        },
        {
          correct: false,
          label:
            "Some of the water evaporated while the group was still pouring.",
        },
        {
          correct: false,
          label:
            "The bottle's straight section was narrower than the funnel opening.",
        },
        {
          correct: true,
          label:
            "Each pour held less water than intended because the cylinder was read from above.",
        },
        {
          correct: false,
          label:
            "The funnel opening was smaller than $$80\\text{ cm}^2$$, so it caught too little water.",
        },
      ],
    },
  },
};

export default item;
