import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Indonesia memproduksi semua jenis plastik yang ditemukan di Seychelles",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Indonesia merupakan negara yang paling dekat dengan Seychelles",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua sampah di Seychelles memiliki label produk Indonesia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Peneliti menganggap jumlah penduduk sebagai bukti yang cukup",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Model memperkirakan Indonesia sebagai negara sumber tunggal terbesar untuk banyak sampah daratan yang lama mengapung",
            },
          ],
        },
      ],
    },
  },
};

export default item;
