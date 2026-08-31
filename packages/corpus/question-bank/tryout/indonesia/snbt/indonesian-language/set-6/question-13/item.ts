import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kenaikan dari 16 menjadi 27 membuktikan bahwa kartu tujuan menaikkan nilai semester setiap peserta.",
        },
        {
          isCorrect: false,
          label:
            "Karena guru pendamping ikut membahas hasil, kondisi pembanding 17 tidak lagi diperlukan untuk menilai program.",
        },
        {
          isCorrect: false,
          label:
            "Jangka uji dua minggu hanya membatasi ketelitian angka dan tidak membatasi jenis hasil belajar yang dapat disimpulkan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 27 dibandingkan 17 mendukung penggunaan kartu tujuan pada pertemuan berikutnya, tetapi hasil dua minggu belum cukup untuk menyimpulkan adanya peningkatan nilai semester.",
        },
        {
          isCorrect: false,
          label:
            "Program sebaiknya langsung diterapkan penuh karena perubahan jadwal dan jumlah petugas telah dihindari.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
