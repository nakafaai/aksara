import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "reading-minutes",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pernyataan itu terlalu cepat karena kenaikan peminjaman bisa terjadi akibat kewajiban membawa buku",
        },
        {
          correct: false,
          label:
            "pernyataan itu terbukti karena peminjaman naik lebih dari dua kali lipat",
        },
        {
          correct: false,
          label: "pernyataan itu salah karena peminjaman buku justru turun",
        },
        {
          correct: false,
          label: "pernyataan itu tepat karena 25 siswa membaca di rumah",
        },
        {
          correct: false,
          label: "pernyataan itu tidak relevan karena guru ikut membaca",
        },
      ],
    },
  },
};

export default item;
