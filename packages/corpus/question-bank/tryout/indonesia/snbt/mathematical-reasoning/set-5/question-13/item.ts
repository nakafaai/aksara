import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "download-quota",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50$$ menit" },
        { correct: true, label: "$$154$$ menit" },
        { correct: false, label: "$$170$$ menit" },
        { correct: false, label: "$$174$$ menit" },
        { correct: false, label: "$$250$$ menit" },
      ],
    },
  },
};

export default item;
