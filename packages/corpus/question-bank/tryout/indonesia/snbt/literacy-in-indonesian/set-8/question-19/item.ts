import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "nickel-processing",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Teks 1 menyebut bahwa larangan ekspor bijih nikel mentah mulai berlaku pada 2020.",
        },
        {
          column: 2,
          label:
            "Teks 2 menolak setiap bentuk pengolahan nikel di dalam negeri.",
        },
        {
          column: 2,
          label:
            "Teks 1 membahas kecelakaan kerja di kawasan industri pengolahan.",
        },
        {
          column: 1,
          label:
            "Teks 2 menyebut warga sekitar mengeluhkan debu dan air sungai yang keruh.",
        },
      ],
    },
  },
};

export default item;
