import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "call-duration",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$13$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: true,
          label: "$$25$$",
        },
        {
          correct: false,
          label: "$$53$$",
        },
      ],
    },
  },
};

export default item;
