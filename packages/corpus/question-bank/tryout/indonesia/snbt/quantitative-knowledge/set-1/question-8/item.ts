import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$${}^{2}\\log 6$$" },
        { correct: false, label: "$$3$$" },
        { correct: false, label: "$$6$$" },
        { correct: false, label: "$$8$$" },
        { correct: true, label: "$$2+{}^{2}\\log 3$$" },
      ],
    },
  },
};

export default item;
