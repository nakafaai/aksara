import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{15}{2}\\text{ cm}$$" },
        { correct: true, label: "$$\\dfrac{65}{8}\\text{ cm}$$" },
        { correct: false, label: "$$\\sqrt{85}\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac{65}{4}\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac{39}{2}\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
