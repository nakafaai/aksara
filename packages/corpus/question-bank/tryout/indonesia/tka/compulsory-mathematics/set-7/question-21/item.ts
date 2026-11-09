import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "library-visits",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40$$",
        },
        {
          correct: true,
          label: "$$42$$",
        },
        {
          correct: false,
          label: "$$43{,}5$$",
        },
        {
          correct: false,
          label: "$$45$$",
        },
        {
          correct: false,
          label: "$$52$$",
        },
      ],
    },
  },
};

export default item;
