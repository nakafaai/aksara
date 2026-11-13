import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "running-track",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$500{,}01\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$495{,}10\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$504{,}91\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$287{,}51\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$212{,}50\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
