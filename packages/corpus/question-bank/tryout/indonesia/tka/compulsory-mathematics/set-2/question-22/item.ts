import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "combined-class-scores",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$75{,}6$$",
        },
        {
          correct: false,
          label: "$$76{,}8$$",
        },
        {
          correct: false,
          label: "$$77{,}2$$",
        },
        {
          correct: true,
          label: "$$78$$",
        },
        {
          correct: false,
          label: "$$79{,}2$$",
        },
      ],
    },
  },
};

export default item;
