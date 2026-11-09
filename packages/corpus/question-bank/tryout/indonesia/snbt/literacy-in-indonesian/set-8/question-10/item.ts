import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "jamu-seller",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Sari kuliah di jurusan kedokteran di kota.",
        },
        {
          column: 2,
          label: "Bu Darmi tidak mengangkat telepon dari Sari.",
        },
        {
          column: 1,
          label: "Bakul Bu Darmi berisi delapan botol jamu.",
        },
        {
          column: 1,
          label:
            "Sari menelepon ibunya karena tidak tahu takaran pesanan seorang kakek.",
        },
      ],
    },
  },
};

export default item;
