import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "kecapi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Di lereng barat, pohon cangkok sama tahannya terhadap angin kencang dengan pohon sambungan.",
        },
        {
          correct: false,
          label:
            "Lebih dari separuh pohon yang tumbang di desa itu pada musim angin tahun lalu adalah pohon cangkok.",
        },
        {
          correct: false,
          label:
            "Di lereng timur, proporsi pohon cangkok yang tumbang $$20$$ kali proporsi pohon sambungan yang tumbang.",
        },
        {
          correct: true,
          label:
            "Pada musim angin tahun lalu, sedikitnya $$2$$ pohon berakar tunggang di lereng timur ikut tumbang.",
        },
        {
          correct: false,
          label:
            "Seandainya semua pohon cangkok di lereng timur diganti dengan pohon sambungan, paling banyak $$4$$ pohon akan tumbang.",
        },
      ],
    },
  },
};

export default item;
