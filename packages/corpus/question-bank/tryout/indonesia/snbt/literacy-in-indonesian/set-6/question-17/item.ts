import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "hotel-occupancy",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16\\%$$" },
        { correct: false, label: "$$16\\tfrac{2}{3}\\%$$" },
        { correct: false, label: "$$20\\%$$" },
        { correct: false, label: "$$24\\%$$" },
        { correct: true, label: "$$25\\%$$" },
      ],
    },
  },
};

export default item;
