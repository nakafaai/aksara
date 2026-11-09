import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$9{,}6\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac{29}{3}\\text{ cm}$$" },
        { correct: false, label: "$$10\\text{ cm}$$" },
        { correct: false, label: "$$11{,}6\\text{ cm}$$" },
        { correct: false, label: "$$18\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
