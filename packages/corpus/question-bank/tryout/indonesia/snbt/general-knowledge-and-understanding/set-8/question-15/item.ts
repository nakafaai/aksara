import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "application",
  },
  stimulus: "rumput",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Suhu air laut berubah mendadak tepat menjelang musim panen.",
        },
        {
          correct: false,
          label: "Harga pupuk dan pakan ikan naik dua kali lipat.",
        },
        {
          correct: false,
          label:
            "Pabrik pengolah meminta rumput laut kering lebih banyak dari biasanya.",
        },
        {
          correct: false,
          label: "Air laut tetap jernih dan berarus tenang sepanjang musim.",
        },
        {
          correct: false,
          label: "Pengepul datang lebih awal untuk membeli hasil panen.",
        },
      ],
    },
  },
};

export default item;
