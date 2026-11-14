import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "sentence-order",
  },
  stimulus: "kopi",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "R - T - Q - S - P" },
        { correct: false, label: "Q - R - T - S - P" },
        { correct: true, label: "R - Q - T - S - P" },
        { correct: false, label: "R - Q - S - T - P" },
        { correct: false, label: "R - Q - T - P - S" },
      ],
    },
  },
};

export default item;
