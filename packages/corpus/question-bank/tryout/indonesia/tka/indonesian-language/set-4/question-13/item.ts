import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "classroom-noise",
  versions: {
    id: {
      columns: [
        "Penyebab masalah",
        "Upaya perbaikan",
        "Keterbatasan pengukuran",
      ],
      kind: "matrix",
      statements: [
        { column: 3, label: "Pengukuran dilakukan di kelas kosong." },
        {
          column: 1,
          label: "Lantai keramik dan langit-langit beton memantulkan bunyi.",
        },
        {
          column: 2,
          label: "Tirai tebal dipasang di jendela yang menghadap jalan.",
        },
        {
          column: 3,
          label: "Aplikasi ponsel tidak seteliti alat ukur akustik.",
        },
      ],
    },
  },
};

export default item;
