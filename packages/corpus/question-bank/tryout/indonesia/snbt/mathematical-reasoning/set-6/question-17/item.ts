import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "concrete-mix",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$10\\text{ m}^2$$" },
        { correct: false, label: "$$11\\text{ m}^2$$" },
        { correct: false, label: "$$15\\text{ m}^2$$" },
        { correct: false, label: "$$16{,}5\\text{ m}^2$$" },
        { correct: false, label: "$$22{,}5\\text{ m}^2$$" },
      ],
    },
  },
};

export default item;
