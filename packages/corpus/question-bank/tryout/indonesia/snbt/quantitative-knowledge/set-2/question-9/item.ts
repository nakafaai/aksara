import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$26\\text{ cm}^2$$" },
        { correct: true, label: "$$39\\text{ cm}^2$$" },
        { correct: false, label: "$$42{,}25\\text{ cm}^2$$" },
        { correct: false, label: "$$58{,}5\\text{ cm}^2$$" },
        { correct: false, label: "$$78\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
