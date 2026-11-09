import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "argument-evaluation",
  },
  stimulus: "goat-milk",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Peternak yang ikut pelatihan kini memerah dengan tangan dan wadah yang lebih bersih.",
        },
        {
          correct: false,
          label:
            "Tangki pendingin koperasi dapat menampung susu dari empat puluh peternak.",
        },
        {
          correct: false,
          label: "Harga yogurt di pasar naik pada tahun itu.",
        },
        {
          correct: true,
          label:
            "Pada tahun yang sama, koperasi melonggarkan syarat uji kebersihan susu.",
        },
        {
          correct: false,
          label: "Beberapa peternak muda menambah jumlah kambing mereka.",
        },
      ],
    },
  },
};

export default item;
