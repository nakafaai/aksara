import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "online-taxi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}52{.}300$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}53{.}300$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}51{.}300$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}62{.}300$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}56{.}000$$",
        },
      ],
    },
  },
};

export default item;
