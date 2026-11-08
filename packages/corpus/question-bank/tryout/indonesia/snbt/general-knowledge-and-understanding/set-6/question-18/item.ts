import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "biopori",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Lubang biopori diisi sampah plastik agar isinya tidak cepat membusuk.",
        },
        {
          column: 2,
          label:
            "Satu lubang biopori sudah cukup untuk menampung air hujan dari seluruh halaman.",
        },
        {
          column: 1,
          label:
            "Selain membantu air meresap, lubang biopori juga dapat menghasilkan kompos.",
        },
        {
          column: 1,
          label:
            "Permukaan tanah yang tertutup aspal dan beton membuat genangan cepat terjadi saat hujan deras.",
        },
      ],
    },
  },
};

export default item;
