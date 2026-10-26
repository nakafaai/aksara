import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semakin banyak konsumen memilih telur ayam",
        },
        {
          correct: false,
          label: "Harga kembali naik pada pekan berikutnya",
        },
        {
          correct: false,
          label: "Beberapa jalur distribusi masih tersendat",
        },
        {
          correct: false,
          label: "Produksi telur turun sementara permintaan terus meningkat",
        },
        {
          correct: true,
          label:
            "Produksi dan pengiriman telur meningkat hingga cukup memenuhi tambahan permintaan",
        },
      ],
    },
  },
};

export default item;
