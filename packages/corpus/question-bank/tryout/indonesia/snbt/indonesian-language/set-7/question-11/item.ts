import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Klinik menetapkan penanda baru sebagai sistem tetap karena jumlah pasien yang tidak kembali ke meja sebelumnya meningkat dari 40 menjadi 56.",
        },
        {
          isCorrect: false,
          label:
            "Klinik membatalkan penanda baru karena panah di lantai tidak dapat digunakan oleh semua pasien dalam setiap keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Klinik menyimpulkan bahwa penanda baru memperbaiki seluruh mutu layanan karena jadwal dan jumlah petugas tidak berubah.",
        },
        {
          isCorrect: false,
          label:
            "Klinik mengutamakan masukan pengguna dan mengabaikan perbandingan angka karena kebutuhan medis pasien berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Klinik memakai hasil perbandingan dan masukan aksesibilitas untuk memperbaiki penanda, lalu melanjutkan pengujian secara terbatas sebelum memutuskan penerapan tetap.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
