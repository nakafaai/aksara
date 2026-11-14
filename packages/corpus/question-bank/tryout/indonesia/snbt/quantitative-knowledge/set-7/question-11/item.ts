import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$27\\text{ m}^2$$" },
        { correct: true, label: "$$24\\text{ m}^2$$" },
        { correct: false, label: "$$20{,}25\\text{ m}^2$$" },
        { correct: false, label: "$$18\\text{ m}^2$$" },
        { correct: false, label: "$$13{,}5\\text{ m}^2$$" },
      ],
    },
  },
};

export default item;
