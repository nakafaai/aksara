import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dukungan sebaya sebagai ukuran utama dalam uji layanan",
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
          correct: true,
          label: "Kartu Tujuan dalam Dukungan Sebaya: Uji Dua Minggu",
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
