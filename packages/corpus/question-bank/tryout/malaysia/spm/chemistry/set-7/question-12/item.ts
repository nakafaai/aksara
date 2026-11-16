import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$83\\text{ cm}^3$$, hydrogen bonds hold the molecules in an open lattice",
        },
        {
          correct: true,
          label:
            "$$91\\text{ cm}^3$$, hydrogen bonds hold the molecules in an open lattice",
        },
        {
          correct: false,
          label:
            "$$91\\text{ cm}^3$$, the covalent bonds inside each molecule lengthen",
        },
        {
          correct: false,
          label:
            "$$0\\text{ cm}^3$$, hydrogen bonds hold the molecules in an open lattice",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$83\\text{ cm}^3$$, ikatan hidrogen memegang molekul dalam kekisi terbuka",
        },
        {
          correct: true,
          label:
            "$$91\\text{ cm}^3$$, ikatan hidrogen memegang molekul dalam kekisi terbuka",
        },
        {
          correct: false,
          label:
            "$$91\\text{ cm}^3$$, ikatan kovalen dalam setiap molekul memanjang",
        },
        {
          correct: false,
          label:
            "$$0\\text{ cm}^3$$, ikatan hidrogen memegang molekul dalam kekisi terbuka",
        },
      ],
    },
  },
};

export default item;
