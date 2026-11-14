import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "helm",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pada April, kamera di kedua belas persimpangan itu merekam rata-rata $$1{.}050$$ pengendara tanpa helm per hari, dan semuanya dikirimi surat tilang.",
        },
        {
          correct: false,
          label:
            "Selama razia pada Maret, polisi menilang ribuan pengendara dan pembonceng yang tidak memakai helm.",
        },
        {
          correct: false,
          label:
            "Sebagian pengendara baru mengetahui adanya kamera setelah menerima surat tilang.",
        },
        {
          correct: true,
          label:
            "Di persimpangan tanpa kamera yang juga dilalui razia pada Maret, hitungan petugas menunjukkan persentase pengendara tanpa helm tetap sekitar $$25\\%$$ pada April, dan banyak sepeda motor yang lewat di sana tidak bertambah.",
        },
        {
          correct: false,
          label:
            "Dari Februari ke April, banyak sepeda motor yang lewat di persimpangan berkamera turun $$3{.}000$$ per hari karena sebagian pengendara tanpa helm memilih jalan lain.",
        },
      ],
    },
  },
};

export default item;
