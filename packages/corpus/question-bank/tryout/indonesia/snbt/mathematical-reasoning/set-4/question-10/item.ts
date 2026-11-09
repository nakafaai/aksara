import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bus-route",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "terminal awal ke Halte A" },
        { correct: false, label: "Halte A ke Halte B" },
        { correct: false, label: "Halte B ke Halte C" },
        { correct: false, label: "Halte C ke Halte D" },
        { correct: true, label: "Halte D ke terminal akhir" },
      ],
    },
  },
};

export default item;
