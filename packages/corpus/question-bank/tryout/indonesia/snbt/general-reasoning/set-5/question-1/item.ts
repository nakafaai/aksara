import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semakin banyak konsumen memilih telur ayam",
        },
        {
          isCorrect: false,
          label: "Harga kembali naik pada pekan berikutnya",
        },
        {
          isCorrect: false,
          label: "Beberapa jalur distribusi masih tersendat",
        },
        {
          isCorrect: false,
          label: "Produksi telur turun sementara permintaan terus meningkat",
        },
        {
          isCorrect: true,
          label:
            "Produksi dan pengiriman telur meningkat hingga cukup memenuhi tambahan permintaan",
        },
      ],
    },
  },
};

export default item;
