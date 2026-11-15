import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "choice-overload",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam meta-analisis 2010, pengaruh rata-rata banyaknya pilihan terhadap pembelian hampir nol.",
        },
        {
          correct: true,
          label:
            "Dalam sebagian percobaan, pilihan yang banyak justru menambah pembelian.",
        },
        {
          correct: false,
          label:
            "Percobaan selai terbukti keliru, sehingga hasilnya tidak perlu dipakai lagi.",
        },
        {
          correct: true,
          label:
            "Mengurangi pilihan lebih mungkin membantu jika pilihan-pilihannya sulit dibandingkan satu sama lain.",
        },
        {
          correct: false,
          label:
            "Mengurangi pilihan pasti menaikkan penjualan jika pembeli ingin memilih dengan usaha sesedikit mungkin.",
        },
      ],
    },
  },
};

export default item;
