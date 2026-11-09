import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "indigo-batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Meskipun begitu, batik berwarna alami laku dengan harga dua kali harga batik berwarna sintetis karena banyak dicari wisatawan.",
        },
        {
          correct: false,
          label:
            "Meskipun begitu batik berwarna alami, laku dengan harga dua kali harga batik berwarna sintetis karena banyak dicari wisatawan.",
        },
        {
          correct: false,
          label:
            "Meskipun, begitu batik berwarna alami laku dengan harga dua kali harga batik berwarna sintetis karena banyak dicari wisatawan.",
        },
        {
          correct: false,
          label:
            "Meskipun begitu batik berwarna alami laku, dengan harga dua kali harga batik berwarna sintetis karena banyak dicari wisatawan.",
        },
        {
          correct: false,
          label:
            "Meskipun begitu, batik berwarna alami laku dengan harga dua kali harga batik berwarna sintetis, karena banyak dicari wisatawan.",
        },
      ],
    },
  },
};

export default item;
