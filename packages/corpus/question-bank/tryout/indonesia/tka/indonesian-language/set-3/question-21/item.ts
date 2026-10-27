import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      columns: ["Persemaian", "Penanaman", "Pemantauan"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Mencatat munculnya daun baru",
        },
        {
          column: 2,
          label: "Mengikat bibit pada penyangga bambu",
        },
        {
          column: 3,
          label: "Mencari penanda yang terbawa arus",
        },
      ],
    },
  },
};

export default item;
