import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengubah Semua Catatan Sumur Menjadi Meter",
        },
        {
          correct: false,
          label: "Formulir Baru yang Menyamakan Setiap Kedalaman Air",
        },
        {
          correct: false,
          label: "Pendapat Warga sebagai Pengganti Uji Keterbandingan",
        },
        {
          correct: false,
          label: "Menghapus Nilai Asli setelah Konversi Satuan",
        },
        {
          correct: true,
          label: "Perbandingan Catatan Sumur tanpa Menghapus Jejak Asli",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
