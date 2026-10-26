import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Indonesia memproduksi semua jenis plastik yang ditemukan di Seychelles",
        },
        {
          correct: false,
          label:
            "Indonesia merupakan negara yang paling dekat dengan Seychelles",
        },
        {
          correct: false,
          label: "Semua sampah di Seychelles memiliki label produk Indonesia",
        },
        {
          correct: true,
          label:
            "Model memperkirakan Indonesia sebagai negara sumber tunggal terbesar untuk banyak sampah daratan yang lama mengapung",
        },
        {
          correct: false,
          label: "Peneliti menganggap jumlah penduduk sebagai bukti yang cukup",
        },
      ],
    },
  },
};

export default item;
