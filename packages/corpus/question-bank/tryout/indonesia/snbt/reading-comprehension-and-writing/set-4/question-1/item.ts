import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "kecapi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menunjukkan bahwa keunggulan bibit sambungan pada kalimat (13) baru tampak di tempat yang diterpa angin kencang",
        },
        {
          correct: false,
          label:
            "membantah simpulan bahwa bibit sambungan lebih tahan tumbang daripada bibit cangkok",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa akar tunggang tidak berpengaruh terhadap ketahanan pohon saat diterpa angin",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa pohon cangkok di lereng barat lebih tahan tumbang daripada pohon cangkok di lereng timur",
        },
        {
          correct: false,
          label:
            "memberi contoh tempat yang tidak cocok untuk ditanami bibit cangkok",
        },
      ],
    },
  },
};

export default item;
