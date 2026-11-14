import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{11}{2}\\text{ cm}$$" },
        { correct: true, label: "$$\\dfrac{5\\sqrt5}{2}\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac{\\sqrt{221}}{2}\\text{ cm}$$" },
        { correct: false, label: "$$\\dfrac{5\\sqrt{10}}{2}\\text{ cm}$$" },
        { correct: false, label: "$$5\\sqrt5\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
