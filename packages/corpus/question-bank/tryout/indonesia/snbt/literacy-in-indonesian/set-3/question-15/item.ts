import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "data dasar sebagai ukuran utama dalam uji layanan",
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
        {
          correct: true,
          label: "Keputusan Berbasis Bukti dalam Layanan Perpustakaan Keliling",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
