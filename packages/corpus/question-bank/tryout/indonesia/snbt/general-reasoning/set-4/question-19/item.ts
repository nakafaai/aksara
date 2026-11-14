import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tidak ada tanaman berdaun lebar yang berada di petak teduh.",
        },
        {
          correct: true,
          label:
            "Sebagian tanaman yang diberi pupuk organik cair tidak berada di petak teduh.",
        },
        {
          correct: false,
          label:
            "Sebagian tanaman di petak teduh tidak diberi pupuk organik cair.",
        },
        {
          correct: false,
          label: "Sebagian tanaman berdaun lebar tidak disiram setiap hari.",
        },
        {
          correct: false,
          label: "Semua tanaman yang diberi pupuk organik cair berdaun lebar.",
        },
      ],
    },
  },
};

export default item;
