import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "net-recycling",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Nelayan kembali membuang jaring rusak ke pantai atau ke laut.",
        },
        {
          correct: false,
          label: "Penyu makin aman dari jeratan jaring.",
        },
        {
          correct: false,
          label: "Pabrik karpet mengambil jaring langsung dari laut.",
        },
        {
          correct: false,
          label: "Pantai desa menjadi makin bersih.",
        },
        {
          correct: false,
          label: "Nelayan mendapat penghasilan tambahan yang lebih besar.",
        },
      ],
    },
  },
};

export default item;
