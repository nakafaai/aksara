import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Merata-ratakan Semua Angka agar Laporan Cepat Selesai",
        },
        {
          isCorrect: true,
          label: "Angka Menyimpang yang Tidak Dihapus Dito",
        },
        {
          isCorrect: false,
          label: "Membuktikan Kedalaman Sumur Tepat 4,81 Meter",
        },
        {
          isCorrect: false,
          label: "Integritas Ilmiah sebagai Alasan Memakai Semua Pengukuran",
        },
        {
          isCorrect: false,
          label: "Bekas Lumpur yang Membuat Pengukuran Tidak Berguna",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
