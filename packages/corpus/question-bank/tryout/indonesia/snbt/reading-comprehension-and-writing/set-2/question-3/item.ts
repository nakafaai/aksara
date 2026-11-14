import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "sentence-order",
  },
  stimulus: "perahu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(Q), (R), (P), (S), (T)",
        },
        {
          correct: false,
          label: "(Q), (P), (S), (R), (T)",
        },
        {
          correct: false,
          label: "(Q), (P), (R), (T), (S)",
        },
        {
          correct: true,
          label: "(Q), (P), (R), (S), (T)",
        },
        {
          correct: false,
          label: "(P), (Q), (R), (S), (T)",
        },
      ],
    },
  },
};

export default item;
