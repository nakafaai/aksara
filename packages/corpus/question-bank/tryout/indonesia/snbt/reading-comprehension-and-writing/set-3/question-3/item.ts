import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "sentence-order",
  },
  stimulus: "resapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(R), (Q), (T), (S), (P)",
        },
        {
          correct: false,
          label: "(Q), (R), (T), (S), (P)",
        },
        {
          correct: true,
          label: "(R), (T), (Q), (S), (P)",
        },
        {
          correct: false,
          label: "(R), (T), (Q), (P), (S)",
        },
        {
          correct: false,
          label: "(R), (T), (S), (Q), (P)",
        },
      ],
    },
  },
};

export default item;
