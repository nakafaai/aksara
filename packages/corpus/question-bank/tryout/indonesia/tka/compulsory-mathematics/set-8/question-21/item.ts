import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "exam-summary",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$20$$",
        },
        {
          correct: false,
          label: "$$22$$",
        },
        {
          correct: false,
          label: "$$34$$",
        },
        {
          correct: false,
          label: "$$37$$",
        },
        {
          correct: false,
          label: "$$51$$",
        },
      ],
    },
  },
};

export default item;
