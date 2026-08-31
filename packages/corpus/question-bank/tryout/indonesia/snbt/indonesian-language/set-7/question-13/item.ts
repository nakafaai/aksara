import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai 56 membuktikan bahwa nomor tahap mengatasi seluruh masalah antrean, termasuk perubahan kebutuhan medis setiap hari.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan antara nilai dasar 40 dan pembanding 42 terlalu kecil sehingga hasil uji 56 dapat dibaca tanpa kondisi pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Masukan pasien dan perawat menjamin bahwa nomor tahap akan bekerja sama baiknya untuk semua jenis layanan kesehatan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 56 dibandingkan 42 mendukung penerusan nomor tahap secara terbatas, sedangkan perubahan jumlah pasien dan kebutuhan medis menuntut pengujian pada hari lain.",
        },
        {
          isCorrect: false,
          label:
            "Karena petugas tidak ditambah, kenaikan selama uji membuktikan hubungan sebab yang berlaku di setiap fasilitas.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
