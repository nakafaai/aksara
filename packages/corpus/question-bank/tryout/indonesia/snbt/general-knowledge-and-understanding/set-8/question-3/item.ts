import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "komodo",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Di alam, komodo hanya hidup di sebagian wilayah Nusa Tenggara Timur.",
        },
        {
          column: 2,
          label:
            "Komodo berburu dengan mengejar mangsanya dalam jarak yang jauh.",
        },
        {
          column: 2,
          label:
            "Taman Nasional Komodo dimasukkan ke dalam daftar Warisan Dunia pada tahun 1980.",
        },
        {
          column: 1,
          label: "Naiknya permukaan laut dapat mengurangi habitat komodo.",
        },
      ],
    },
  },
};

export default item;
