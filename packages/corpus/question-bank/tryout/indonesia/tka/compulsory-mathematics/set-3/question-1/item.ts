import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "streaming-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$70\\,\\%$$",
        },
        {
          correct: false,
          label: "$$42\\,\\%$$",
        },
        {
          correct: false,
          label: "$$30\\,\\%$$",
        },
        {
          correct: false,
          label: "$$25\\,\\%$$",
        },
        {
          correct: false,
          label: "$$18\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
