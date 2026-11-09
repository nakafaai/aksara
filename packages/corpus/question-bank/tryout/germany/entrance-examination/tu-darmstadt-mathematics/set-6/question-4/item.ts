import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$15\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$32\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$20\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "Das hängt von der Lage von $$E$$ ab.",
        },
        {
          correct: true,
          label: "$$30\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
