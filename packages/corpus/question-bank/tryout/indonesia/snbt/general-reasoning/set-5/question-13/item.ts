import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap kios di Pasar Baru tidak menerima pembayaran nontunai dan tidak memasang daftar harga.",
        },
        {
          correct: false,
          label:
            "Ada kios di Pasar Baru yang tidak menerima pembayaran nontunai atau tidak memasang daftar harga.",
        },
        {
          correct: false,
          label:
            "Tidak ada kios di Pasar Baru yang menerima pembayaran nontunai atau memasang daftar harga.",
        },
        {
          correct: true,
          label:
            "Ada kios di Pasar Baru yang tidak menerima pembayaran nontunai dan tidak memasang daftar harga.",
        },
        {
          correct: false,
          label:
            "Ada kios di Pasar Baru yang menerima pembayaran nontunai, tetapi tidak memasang daftar harga.",
        },
      ],
    },
  },
};

export default item;
