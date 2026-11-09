import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "biconditional",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Jika hari sudah gelap, lampu taman pasti menyala.",
        },
        {
          column: 1,
          label: "Jika lampu taman menyala, hari pasti sudah gelap.",
        },
        {
          column: 2,
          label:
            "Jika sensor tidak mendeteksi gerakan, lampu taman tetap dapat menyala asalkan hari sudah gelap.",
        },
        {
          column: 1,
          label: "Jika hari masih terang, lampu taman pasti tidak menyala.",
        },
      ],
    },
  },
};

export default item;
