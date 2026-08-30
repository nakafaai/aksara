import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Indonesia memproduksi semua jenis plastik yang ditemukan di Seychelles",
        },
        {
          isCorrect: false,
          label:
            "Indonesia merupakan negara yang paling dekat dengan Seychelles",
        },
        {
          isCorrect: true,
          label:
            "Model memperkirakan Indonesia sebagai negara sumber tunggal terbesar untuk banyak sampah daratan yang lama mengapung",
        },
        {
          isCorrect: false,
          label: "Semua sampah di Seychelles memiliki label produk Indonesia",
        },
        {
          isCorrect: false,
          label: "Peneliti menganggap jumlah penduduk sebagai bukti yang cukup",
        },
      ],
    },
  },
};

export default item;
