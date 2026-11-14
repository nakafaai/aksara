import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "kopi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua kulit dari buah yang dipetik ketika sudah merah penuh diolah menjadi _cascara_.",
        },
        {
          correct: false,
          label:
            "Kulit yang dijadikan kompos pasti berasal dari buah yang belum merah penuh.",
        },
        {
          correct: false,
          label: "Minuman _cascara_ dari desa itu tidak pernah terasa sepat.",
        },
        {
          correct: false,
          label:
            "Kulit yang tiba di para-para kurang dari enam jam setelah buahnya dikupas pasti diolah menjadi _cascara_.",
        },
        {
          correct: true,
          label:
            "Kulit dari buah merah penuh yang baru tiba di para-para sepuluh jam setelah buahnya dikupas dijadikan kompos.",
        },
      ],
    },
  },
};

export default item;
