import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "noise-hearing",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Dalam percobaan tikus itu, bising merusak sel rambut luar sehingga ambang dengar tikus sempat naik tajam.",
        },
        {
          column: 1,
          label:
            "Seseorang yang audiogramnya normal sepekan setelah konser belum tentu terbebas dari kerusakan akibat konser itu.",
        },
        {
          column: 2,
          label:
            "Berada $$15$$ menit di tempat $$100$$ dBA memberi dosis yang lebih kecil daripada bekerja $$4$$ jam di tempat $$88$$ dBA.",
        },
        {
          column: 2,
          label:
            "Tinitus pada orang yang audiogramnya normal membuktikan bahwa sebagian sinaps di kokleanya telah rusak.",
        },
      ],
    },
  },
};

export default item;
