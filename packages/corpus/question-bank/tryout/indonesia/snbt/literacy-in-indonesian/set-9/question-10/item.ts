import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lima Unit Karbon sebagai Hasil Pengukuran Mangrove",
        },
        {
          correct: false,
          label: "Menghapus Serasah dari Semua Perhitungan Karbon",
        },
        {
          correct: false,
          label: "Mengapa Fotosintesis Menentukan Seluruh Neraca Karbon",
        },
        {
          correct: false,
          label: "Kartu Daur Karbon sebagai Pengganti Pengamatan Lapangan",
        },
        {
          correct: true,
          label: "Batas Sistem dalam Simulasi Neraca Karbon Mangrove",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
