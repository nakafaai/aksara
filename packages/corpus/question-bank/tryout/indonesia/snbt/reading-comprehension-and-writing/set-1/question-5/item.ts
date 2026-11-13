import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "lumbung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Di antara rumah tangga yang berhenti berutang kepada tengkulak, ada yang pernah meminjam gabah dari lumbung.",
        },
        {
          correct: false,
          label: "Rumah tangga yang pernah meminjam gabah dari lumbung tidak lagi berutang kepada tengkulak.",
        },
        {
          correct: false,
          label: "Di antara rumah tangga yang masih berutang kepada tengkulak, ada yang tidak pernah meminjam gabah dari lumbung.",
        },
        {
          correct: false,
          label: "Harga beras selama dua tahun itu lebih mahal daripada harga sebelum lumbung dihidupkan kembali.",
        },
        {
          correct: false,
          label: "Ada desa lain yang juga berhasil mengurangi rumah tangga yang berutang kepada tengkulak dengan menghidupkan lumbung.",
        },
      ],
    },
  },
};

export default item;
