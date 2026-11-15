import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Di antara semua kadar rata-rata dalam tabel, tepat $$1$$ kadar yang melampaui batas yang dipakai tim.",
        },
        {
          column: 2,
          label:
            "Setiap ikan pemangsa yang ditangkap di titik hilir mengandung metilmerkuri di atas batas yang dipakai tim.",
        },
        {
          column: 1,
          label:
            "Jika penambang berhenti memakai merkuri tahun ini, kadar metilmerkuri pada ikan rawa belum tentu turun dalam waktu dekat.",
        },
        {
          column: 2,
          label:
            "Ikan pemangsa dari titik hulu aman dimakan ibu hamil setiap hari karena kadar rata-ratanya di bawah batas yang dipakai tim.",
        },
        {
          column: 2,
          label:
            "Tim telah membuktikan bahwa lumpur rawa yang miskin oksigen adalah penyebab tingginya kadar metilmerkuri pada ikan di titik hilir.",
        },
      ],
    },
  },
};

export default item;
