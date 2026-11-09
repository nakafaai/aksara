import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "shoe-sizes",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$38$$",
        },
        {
          correct: true,
          label: "$$39$$",
        },
        {
          correct: false,
          label: "$$39{,}325$$",
        },
        {
          correct: false,
          label: "$$39{,}5$$",
        },
      ],
    },
  },
};

export default item;
