import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "bunyi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$86\\text{ dB}$$",
        },
        {
          correct: false,
          label: "$$90\\text{ dB}$$",
        },
        {
          correct: false,
          label: "$$91\\text{ dB}$$",
        },
        {
          correct: true,
          label: "$$89\\text{ dB}$$",
        },
        {
          correct: false,
          label: "$$92\\text{ dB}$$",
        },
      ],
    },
  },
};

export default item;
