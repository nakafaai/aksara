import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The yellow edges of the wooden bridges will become harder to see.",
        },
        {
          isCorrect: true,
          label:
            "Damp air will have less room to circulate behind the paper prints.",
        },
        {
          isCorrect: false,
          label:
            "The clips will no longer hold the lower corners when wind enters the lane.",
        },
        {
          isCorrect: false,
          label:
            "The warmer lamps over the cooking row will cool the soup pots.",
        },
        {
          isCorrect: false,
          label:
            "The blue circle around the central drain will be covered by the rack.",
        },
      ],
    },
  },
  stimulusKey: "rain-market",
};

export default item;
