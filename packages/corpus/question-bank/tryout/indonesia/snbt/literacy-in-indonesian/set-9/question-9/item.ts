import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "national-exam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa yang mengikuti bimbingan belajar mendapat nilai ujian nasional yang lebih tinggi.",
        },
        {
          correct: false,
          label:
            "Banyak orang tua ingin ujian nasional kembali menentukan kelulusan anaknya.",
        },
        {
          correct: false,
          label:
            "Nilai rapor di sekolah kota rata-rata lebih tinggi daripada di sekolah desa.",
        },
        {
          correct: false,
          label:
            "Ujian nasional pada masa lalu diikuti oleh jutaan siswa setiap tahun.",
        },
        {
          correct: true,
          label:
            "Di negara berujian taruhan rendah, sekolah lebih jarang memangkas pelajaran.",
        },
      ],
    },
  },
};

export default item;
