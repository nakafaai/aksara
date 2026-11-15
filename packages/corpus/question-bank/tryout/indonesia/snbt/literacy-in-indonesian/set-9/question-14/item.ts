import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "street-vendors",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pedagang berjualan pada jam makan siang di bagian trotoar selebar $$4$$ meter, dengan $$1{,}5$$ meter tetap kosong.",
        },
        {
          column: 2,
          label:
            "Pedagang berjualan sepanjang hari di trotoar selebar $$3$$ meter dan menyisakan $$1$$ meter untuk pejalan kaki.",
        },
        {
          column: 1,
          label:
            "Halte bus dipindahkan ke depan Pasar Sentra setelah pedagang pindah ke sana.",
        },
        {
          column: 2,
          label:
            "Semua pedagang dilarang berjualan di sekitar Jalan Merdeka tanpa disediakan tempat pengganti.",
        },
        {
          column: 1,
          label:
            "Pedagang berjualan pada malam hari di trotoar selebar $$3$$ meter, dengan $$1{,}5$$ meter tetap kosong.",
        },
      ],
    },
  },
};

export default item;
