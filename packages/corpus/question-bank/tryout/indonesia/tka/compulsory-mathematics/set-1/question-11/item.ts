import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "running-track",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$241{,}89\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$247{,}04\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$254{,}89\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$290{,}89\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$375{,}78\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
