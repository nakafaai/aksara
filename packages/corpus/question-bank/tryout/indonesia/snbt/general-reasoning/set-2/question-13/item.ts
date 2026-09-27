import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Serapan dalam negeri dan impor beras digambarkan bergerak searah",
        },
        {
          isCorrect: false,
          label:
            "Bacaan tidak menggambarkan hubungan antara serapan dalam negeri dan impor beras",
        },
        {
          isCorrect: true,
          label:
            "Serapan dalam negeri dan impor beras digambarkan bergerak berlawanan arah",
        },
        {
          isCorrect: false,
          label:
            "Serapan dalam negeri dan ekspor beras digambarkan bergerak berlawanan arah",
        },
        {
          isCorrect: false,
          label:
            "Solusi merevisi Peraturan Presiden Nomor $$63$$ Tahun $$2017$$ akan mengubah alokasi anggaran",
        },
      ],
    },
  },
};

export default item;
