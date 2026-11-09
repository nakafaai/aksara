import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "modus-tollens",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Kelas XI-2 mendapat piala bergilir.",
        },
        {
          column: 1,
          label: "Kelas XI-2 tidak menjuarai lomba kebersihan.",
        },
        {
          column: 1,
          label:
            "Setiap kelas yang menjuarai lomba kebersihan boleh memilih tujuan karyawisata.",
        },
        {
          column: 2,
          label:
            "Setiap kelas yang boleh memilih tujuan karyawisata pasti menjuarai lomba kebersihan.",
        },
      ],
    },
  },
};

export default item;
