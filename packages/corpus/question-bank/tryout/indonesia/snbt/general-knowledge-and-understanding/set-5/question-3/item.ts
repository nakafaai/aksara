import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "subak",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menanam pada waktu yang sama dalam satu kawasan dapat membantu menekan populasi hama.",
        },
        {
          column: 2,
          label:
            "Setiap anggota subak selalu mendapat jatah air yang sama besar.",
        },
        {
          column: 2,
          label:
            "Subak ditetapkan sebagai Warisan Budaya Dunia karena mampu mengendalikan hama.",
        },
        {
          column: 1,
          label:
            "Hilangnya satu petak sawah dapat memengaruhi pengairan petak lain di bawahnya.",
        },
      ],
    },
  },
};

export default item;
