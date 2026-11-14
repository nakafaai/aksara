import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "belajar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$85$$",
        },
        {
          correct: true,
          label: "$$80$$",
        },
        {
          correct: false,
          label: "$$76$$",
        },
        {
          correct: false,
          label: "$$72$$",
        },
        {
          correct: false,
          label: "$$70$$",
        },
      ],
    },
  },
};

export default item;
