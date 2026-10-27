import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Keluaran Air sebagai Satu-satunya Ukuran Infiltrasi",
        },
        {
          correct: false,
          label: "Campuran Organik yang Selalu Menghambat Air Masuk",
        },
        {
          correct: false,
          label: "Kolom Pasir sebagai Salinan Semua Lahan Berpasir",
        },
        {
          correct: false,
          label: "Mengabaikan Air yang Tersimpan di Dalam Tanah",
        },
        {
          correct: true,
          label: "Membedakan Infiltrasi, Perkolasi, dan Penyimpanan Air",
        },
      ],
    },
  },
};

export default item;
