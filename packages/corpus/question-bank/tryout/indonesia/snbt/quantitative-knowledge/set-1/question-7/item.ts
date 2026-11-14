import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$24\\text{ cm}^2$$" },
        { correct: true, label: "$$36\\text{ cm}^2$$" },
        { correct: false, label: "$$64\\text{ cm}^2$$" },
        { correct: false, label: "$$96\\text{ cm}^2$$" },
        { correct: false, label: "$$100\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
