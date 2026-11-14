import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "affix-meaning",
  },
  stimulus: "lapak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap pagi, petugas pasar memeriksa apakah pedagang sudah menaburi ikan dagangannya dengan es serut dan apakah air bekas pencucian ikan sudah dialiri ke saluran tertutup.",
        },
        {
          correct: true,
          label:
            "Setiap pagi, petugas pasar memeriksa apakah pedagang sudah menaburi ikan dagangannya dengan es serut dan apakah air bekas pencucian ikan sudah dialirkan ke saluran tertutup.",
        },
        {
          correct: false,
          label:
            "Setiap pagi, petugas pasar memeriksa apakah pedagang sudah menaburkan es serut ke atas ikan dagangannya dan apakah air bekas pencucian ikan sudah dialiri ke saluran tertutup.",
        },
        {
          correct: false,
          label:
            "Setiap pagi, petugas pasar memeriksa apakah pedagang sudah menaburkan ikan dagangannya dengan es serut dan apakah air bekas pencucian ikan sudah dialirkan ke saluran tertutup.",
        },
        {
          correct: false,
          label:
            "Setiap pagi, petugas pasar memeriksa apakah pedagang sudah menaburi ikan dagangannya dengan es serut dan apakah saluran tertutup sudah dialirkan air bekas pencucian ikan.",
        },
      ],
    },
  },
};

export default item;
