import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Lima Unit Karbon sebagai Hasil Pengukuran Mangrove",
        },
        {
          isCorrect: false,
          label: "Menghapus Serasah dari Semua Perhitungan Karbon",
        },
        {
          isCorrect: false,
          label: "Mengapa Fotosintesis Menentukan Seluruh Neraca Karbon",
        },
        {
          isCorrect: false,
          label: "Kartu Daur Karbon sebagai Pengganti Pengamatan Lapangan",
        },
        {
          isCorrect: true,
          label: "Batas Sistem dalam Simulasi Neraca Karbon Mangrove",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
