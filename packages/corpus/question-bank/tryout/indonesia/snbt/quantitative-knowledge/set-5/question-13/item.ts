import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$36\\text{ cm}^2$$" },
        { correct: false, label: "$$48\\text{ cm}^2$$" },
        { correct: false, label: "$$60\\text{ cm}^2$$" },
        { correct: false, label: "$$84\\text{ cm}^2$$" },
        { correct: true, label: "$$96\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
