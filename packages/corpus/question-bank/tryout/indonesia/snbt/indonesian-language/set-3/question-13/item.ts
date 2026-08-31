import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kenaikan dari 24 menjadi 35 membuktikan bahwa jadwal singkat menyebabkan seluruh tambahan peminjaman, termasuk saat cuaca dan kegiatan sekolah berubah.",
        },
        {
          isCorrect: false,
          label:
            "Pembahasan bersama pelajar dan pengelola membuat selisih antara nilai uji dan pembanding tidak lagi diperlukan untuk mengambil keputusan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 35 pada uji, dibandingkan dengan 26 pada kondisi pembanding, mendukung penerusan jadwal singkat dalam skala terbatas; pengaruh cuaca dan kegiatan sekolah tetap perlu diuji.",
        },
        {
          isCorrect: false,
          label:
            "Karena jadwal serta jumlah petugas dijaga, cuaca dan kegiatan sekolah hanya memengaruhi redaksi laporan, bukan jangkauan penerapan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan pada minggu lain hanya akan mengukuhkan simpulan awal dan tidak mungkin mengubah penafsiran tentang manfaat jadwal.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
