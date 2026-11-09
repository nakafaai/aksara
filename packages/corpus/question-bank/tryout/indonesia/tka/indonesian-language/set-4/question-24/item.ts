import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "honesty-canteen",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pernyataan itu terlalu cepat karena selisih tidak hanya berasal dari barang yang tidak dibayar",
        },
        {
          correct: false,
          label:
            "pernyataan itu terbukti benar karena selisih pada bulan September hanya Rp56.000",
        },
        {
          correct: false,
          label:
            "pernyataan itu keliru karena selisih bulan Agustus lebih besar daripada selisih bulan Juli",
        },
        {
          correct: false,
          label:
            "pernyataan itu tidak relevan karena kantin yang pertama sudah lama ditutup",
        },
        {
          correct: false,
          label:
            "pernyataan itu akurat karena uang yang diterima koperasi naik setiap bulan",
        },
      ],
    },
  },
};

export default item;
