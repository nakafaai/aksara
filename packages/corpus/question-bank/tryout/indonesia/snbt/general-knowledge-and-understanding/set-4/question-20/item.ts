import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "puter",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Campuran es dan garam dapat menjadi lebih dingin daripada es batu biasa.",
        },
        {
          column: 2,
          label: "Garam ditambahkan agar es batu tidak cepat mencair.",
        },
        {
          column: 1,
          label:
            "Pengadukan mencegah terbentuknya lapisan keras di dekat dinding tabung.",
        },
        {
          column: 2,
          label:
            "Tanpa pengadukan, adonan es puter akan tetap cair seluruhnya.",
        },
      ],
    },
  },
};

export default item;
