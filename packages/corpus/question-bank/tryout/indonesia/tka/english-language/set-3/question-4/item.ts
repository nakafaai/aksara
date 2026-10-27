import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  stimulus: "rain-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The yellow edges of the wooden bridges will become harder to see.",
        },
        {
          correct: true,
          label:
            "Damp air will have less room to circulate behind the paper prints.",
        },
        {
          correct: false,
          label:
            "The clips will no longer hold the lower corners when wind enters the lane.",
        },
        {
          correct: false,
          label:
            "The warmer lamps over the cooking row will cool the soup pots.",
        },
        {
          correct: false,
          label:
            "The blue circle around the central drain will be covered by the rack.",
        },
      ],
    },
  },
};

export default item;
