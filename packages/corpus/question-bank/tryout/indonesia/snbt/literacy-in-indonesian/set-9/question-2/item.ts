import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "peat-fire",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Gambut terbentuk karena sisa tumbuhan membusuk sempurna dalam waktu singkat.",
        },
        {
          column: 1,
          label:
            "Lahan gambut tropis Indonesia terutama terdapat di Sumatra, Kalimantan, dan Papua.",
        },
        {
          column: 1,
          label:
            "Kebakaran gambut dapat menjalar di bawah tanah tanpa nyala yang besar.",
        },
        {
          column: 2,
          label:
            "Menyekat kanal dapat memadamkan api gambut yang sudah menyala.",
        },
      ],
    },
  },
};

export default item;
