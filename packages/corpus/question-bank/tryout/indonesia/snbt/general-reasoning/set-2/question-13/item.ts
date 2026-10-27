import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Serapan dalam negeri dan impor beras digambarkan bergerak searah",
        },
        {
          correct: false,
          label:
            "Bacaan tidak menggambarkan hubungan antara serapan dalam negeri dan impor beras",
        },
        {
          correct: true,
          label:
            "Serapan dalam negeri dan impor beras digambarkan bergerak berlawanan arah",
        },
        {
          correct: false,
          label:
            "Serapan dalam negeri dan ekspor beras digambarkan bergerak berlawanan arah",
        },
        {
          correct: false,
          label:
            "Solusi merevisi Peraturan Presiden Nomor $$63$$ Tahun $$2017$$ akan mengubah alokasi anggaran",
        },
      ],
    },
  },
};

export default item;
