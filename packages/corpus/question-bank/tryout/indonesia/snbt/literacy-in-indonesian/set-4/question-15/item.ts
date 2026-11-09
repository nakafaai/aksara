import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Keputusan Berbasis Bukti untuk Akses Ruang Laktasi di Pasar",
        },
        {
          correct: false,
          label: "pemangku kepentingan sebagai ukuran utama dalam uji layanan",
        },
        {
          correct: false,
          label: "Dari perbandingan singkat menuju perubahan layanan tetap",
        },
        {
          correct: false,
          label: "Konsultasi tanpa pengukuran hasil yang dapat dibandingkan",
        },
        {
          correct: false,
          label: "Uji layanan lokal tanpa keputusan tindak lanjut",
        },
      ],
    },
  },
};

export default item;
