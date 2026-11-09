import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "free-transit",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Waktu tempuh dan keandalan lebih menentukan pilihan orang daripada harga tiket.",
        },
        {
          column: 1,
          label:
            "Pendapatan tiket ikut membiayai sopir, bahan bakar, dan perawatan bus.",
        },
        {
          column: 2,
          label:
            "Kekhawatiran bahwa ongkos memberatkan sebagian warga tidak berdasar.",
        },
        {
          column: 2,
          label:
            "Tiket gratis untuk semua orang adalah cara terbaik membantu warga berpenghasilan rendah.",
        },
      ],
    },
  },
};

export default item;
