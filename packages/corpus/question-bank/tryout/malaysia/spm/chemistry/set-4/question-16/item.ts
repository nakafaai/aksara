import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{PbI}_2$$, and at most 2.31 g of precipitate forms",
        },
        {
          correct: false,
          label: "$$\\text{PbI}$$, and at most 1.67 g of precipitate forms",
        },
        {
          correct: false,
          label: "$$\\text{PbI}_2$$, and at most 4.61 g of precipitate forms",
        },
        {
          correct: false,
          label:
            "$$\\text{Pb}_2\\text{I}$$, and at most 2.71 g of precipitate forms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$\\text{PbI}_2$$, dan paling banyak 2.31 g mendakan terbentuk",
        },
        {
          correct: false,
          label: "$$\\text{PbI}$$, dan paling banyak 1.67 g mendakan terbentuk",
        },
        {
          correct: false,
          label:
            "$$\\text{PbI}_2$$, dan paling banyak 4.61 g mendakan terbentuk",
        },
        {
          correct: false,
          label:
            "$$\\text{Pb}_2\\text{I}$$, dan paling banyak 2.71 g mendakan terbentuk",
        },
      ],
    },
  },
};

export default item;
