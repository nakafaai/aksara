import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Merata-ratakan Semua Angka agar Laporan Cepat Selesai",
        },
        {
          correct: true,
          label: "Angka Menyimpang yang Tidak Dihapus Dito",
        },
        {
          correct: false,
          label: "Membuktikan Kedalaman Sumur Tepat $$4{,}81$$ Meter",
        },
        {
          correct: false,
          label: "Integritas Ilmiah sebagai Alasan Memakai Semua Pengukuran",
        },
        {
          correct: false,
          label: "Bekas Lumpur yang Membuat Pengukuran Tidak Berguna",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
