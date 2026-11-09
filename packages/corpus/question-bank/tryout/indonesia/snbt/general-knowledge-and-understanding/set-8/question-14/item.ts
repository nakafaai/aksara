import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "rumput",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (7) memberikan contoh dari pernyataan pada kalimat (6).",
        },
        {
          correct: false,
          label: "Kalimat (7) menjelaskan penyebab modal budi daya yang kecil.",
        },
        {
          correct: false,
          label: "Kalimat (7) mengulang isi kalimat (6) dengan kata-kata lain.",
        },
        {
          correct: false,
          label:
            "Kalimat (7) menyimpulkan seluruh isi bacaan tentang budi daya dan pengolahan rumput laut.",
        },
        {
          correct: true,
          label:
            "Kalimat (7) menyatakan kelemahan budi daya setelah kalimat (6) menyebut kelebihannya.",
        },
      ],
    },
  },
};

export default item;
