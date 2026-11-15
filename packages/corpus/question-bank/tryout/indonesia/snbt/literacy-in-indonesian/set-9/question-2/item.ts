import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "c4-photosynthesis",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kekeringan dapat menaikkan fotorespirasi tumbuhan C3 walaupun suhunya tidak naik.",
        },
        {
          column: 1,
          label:
            "Di tempat yang sejuk dan teduh, tumbuhan C3 dapat tumbuh sebaik atau lebih baik daripada tumbuhan C4.",
        },
        {
          column: 2,
          label:
            "Enzim-enzim jalur C4 sama sekali tidak terdapat pada tumbuhan C3.",
        },
        {
          column: 1,
          label:
            "Padi yang sudah menghasilkan sejumlah enzim jalur C4 belum tentu sudah bekerja seperti tumbuhan C4.",
        },
      ],
    },
  },
};

export default item;
