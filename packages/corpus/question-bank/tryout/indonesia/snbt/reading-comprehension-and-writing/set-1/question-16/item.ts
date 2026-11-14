import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "gelasan",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Kalimat (2) diperbaiki dengan menghapus kata *yang*.",
        },
        {
          column: 2,
          label:
            "Kalimat (8) diperbaiki dengan mengganti frasa *di garis pantai* menjadi *pada garis pantai*.",
        },
        {
          column: 2,
          label:
            "Kalimat (6) diperbaiki dengan mengganti *agar supaya* menjadi *sehingga*.",
        },
        {
          column: 1,
          label: "Kalimat (6) diperbaiki dengan menghapus kata *agar*.",
        },
      ],
    },
  },
};

export default item;
