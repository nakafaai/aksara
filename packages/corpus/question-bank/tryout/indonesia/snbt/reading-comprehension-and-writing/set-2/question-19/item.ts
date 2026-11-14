import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "bantaran",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Kalimat (5) dihapus karena hanya mengulang isi kalimat (4).",
        },
        {
          column: 1,
          label: "Kata *daripada* pada kalimat (10) dihapus.",
        },
        {
          column: 1,
          label: "Kata *tetapi* pada kalimat (11) dihapus.",
        },
        {
          column: 2,
          label:
            "Frasa *Sebagian besar daripada* pada kalimat (10) diganti dengan *Semua*.",
        },
      ],
    },
  },
};

export default item;
