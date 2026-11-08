import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "chili-prices",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hujan lebat pada bulan Juni merontokkan bunga cabai sehingga panen gagal.",
        },
        {
          correct: true,
          label:
            "Permintaan naik menjelang hari raya, sementara pasokan sedikit turun dari Mei.",
        },
        {
          correct: false,
          label:
            "Pasokan pada bulan Juni adalah yang paling rendah selama enam bulan itu.",
        },
        {
          correct: false,
          label:
            "Petani menahan panennya karena harga pada bulan Mei terlalu tinggi bagi pembeli.",
        },
        {
          correct: false,
          label:
            "Cabai dari kabupaten lain mungkin membanjiri pasar induk pada bulan Juni.",
        },
      ],
    },
  },
};

export default item;
