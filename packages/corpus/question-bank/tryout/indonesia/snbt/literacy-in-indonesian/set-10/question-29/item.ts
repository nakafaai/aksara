import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "regression-mean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pemain yang mencetak gol terbanyak pada satu musim mencetak lebih sedikit gol pada musim berikutnya, walaupun latihannya sama.",
        },
        {
          correct: true,
          label:
            "Ruas jalan dengan kecelakaan terbanyak tahun lalu mencatat lebih sedikit kecelakaan tahun ini, walaupun tidak ada perubahan apa pun di jalan itu.",
        },
        {
          correct: false,
          label:
            "Siswa yang dibagi secara acak ke kelompok yang belajar lebih lama mendapat nilai lebih tinggi daripada kelompok lain.",
        },
        {
          correct: true,
          label:
            "Orang yang berobat ketika sakit kepalanya paling parah biasanya merasa lebih baik keesokan harinya, apa pun obat yang diminum.",
        },
        {
          correct: false,
          label:
            "Tinggi badan anak-anak bertambah dari tahun ke tahun selama masa sekolah dasar.",
        },
      ],
    },
  },
};

export default item;
