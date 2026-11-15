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
          correct: false,
          label:
            "Percobaan selai ternyata keliru, karena meta-analisis 2010 membuktikan bahwa banyaknya pilihan tidak pernah berpengaruh pada pembelian.",
        },
        {
          correct: false,
          label:
            "Stan $$24$$ rasa justru menarik lebih banyak pengunjung, sehingga toko tetap untung dengan memajang banyak pilihan.",
        },
        {
          correct: true,
          label:
            "Penelitian sesudahnya menemukan pengaruh rata-rata hampir nol, dan kelebihan pilihan hanya lebih mungkin muncul dalam keadaan tertentu.",
        },
        {
          correct: false,
          label:
            "Percobaan selai hanya dilakukan pada satu jenis barang, sehingga hasilnya tidak berlaku sama sekali untuk barang lain.",
        },
        {
          correct: false,
          label:
            "Meta-analisis 2015 menunjukkan bahwa banyak pilihan selalu menambah pembelian jika orang ingin memilih dengan cepat.",
        },
      ],
    },
  },
};

export default item;
