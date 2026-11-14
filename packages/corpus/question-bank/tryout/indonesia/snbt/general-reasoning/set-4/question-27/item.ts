import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "calendar-cycle",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Citra" },
        { correct: false, label: "Eka" },
        { correct: true, label: "Bima" },
        { correct: false, label: "Ani" },
        { correct: false, label: "Dodi" },
      ],
    },
  },
};

export default item;
