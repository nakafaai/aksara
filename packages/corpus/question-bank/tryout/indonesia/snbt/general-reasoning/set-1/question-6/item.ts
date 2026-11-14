import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "kantin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sesudah label dipasang, siswa membeli lebih banyak kemasan minuman daripada sebelumnya.",
        },
        {
          correct: true,
          label:
            "Minuman pengganti yang paling banyak dipilih hanya mengandung $$6$$ gram gula per $$100$$ ml, tetapi dijual dalam kemasan $$600$$ ml, sedangkan minuman tinggi gula yang ditinggalkan umumnya mengandung $$11$$ gram gula per $$100$$ ml dalam kemasan $$200$$ ml.",
        },
        {
          correct: false,
          label:
            "Harga minuman tinggi gula naik pada minggu sesudah label dipasang.",
        },
        {
          correct: false,
          label:
            "Siswa yang berhenti membeli minuman tinggi gula di kantin menggantinya dengan minuman tinggi gula yang dibawa dari rumah.",
        },
        {
          correct: false,
          label:
            "Siswa yang beralih memilih minuman dengan angka gula per $$100$$ ml paling rendah di kantin.",
        },
      ],
    },
  },
};

export default item;
