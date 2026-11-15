import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "dengue-cases",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laju kasus Sukamulya pada 2024 masih yang terendah di kabupaten, sehingga kenaikannya tidak perlu terlalu diperhatikan oleh dinas.",
        },
        {
          correct: false,
          label:
            "Kasus di Sukamulya dicatat menurut tempat berobat, sehingga sebagian kasusnya berasal dari kecamatan lain.",
        },
        {
          correct: true,
          label:
            "Kenaikan itu hanya $$30$$ kasus pada $$50{.}000$$ penduduk, sehingga sedikit kasus saja sudah membuat persentasenya besar.",
        },
        {
          correct: false,
          label:
            "Kasus di Kota Baru naik lebih banyak, yaitu $$40$$ kasus, sehingga penularan di Kota Baru pasti lebih cepat.",
        },
        {
          correct: false,
          label:
            "Puskesmas Sukamulya dapat memeriksa darah, sehingga kasus ringan di sana lebih sering tercatat daripada dahulu.",
        },
      ],
    },
  },
};

export default item;
