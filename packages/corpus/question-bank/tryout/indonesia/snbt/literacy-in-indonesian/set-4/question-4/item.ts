import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "land-subsidence",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Laju penurunan tanah akan mengecil, tetapi sebagian besar ketinggian yang sudah hilang tidak kembali.",
        },
        {
          column: 2,
          label:
            "Lapisan lempung akan mengembang lagi hingga mendekati tebal semula setelah muka air sumur pulih.",
        },
        {
          column: 2,
          label:
            "Kenaikan muka laut relatif di pelabuhan langsung turun menjadi $$0{,}4$$ cm per tahun sejak tahun pemompaan dihentikan.",
        },
        {
          column: 2,
          label:
            "Penurunan terutama berasal dari lapisan pasir yang kehilangan air, sehingga mengisi kembali lapisan pasir akan memulihkan sebagian besar penurunan.",
        },
      ],
    },
  },
};

export default item;
