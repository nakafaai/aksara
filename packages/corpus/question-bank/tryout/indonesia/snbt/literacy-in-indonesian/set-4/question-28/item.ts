import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "choice-overload",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Seorang penggemar kopi membeli merek langganannya dari rak yang memajang $$40$$ merek kopi.",
        },
        {
          correct: false,
          label:
            "Seorang siswa memilih satu dari tiga paket wisata sekolah yang semuanya sama kecuali dalam harga per orang.",
        },
        {
          correct: true,
          label:
            "Seorang pekerja baru memilih satu dari $$30$$ paket asuransi kesehatan yang berbeda dalam banyak syarat sekaligus.",
        },
        {
          correct: false,
          label:
            "Seorang pembeli memilih warna kaus dari $$12$$ warna yang harganya sama dan modelnya sama.",
        },
        {
          correct: false,
          label:
            "Seorang ibu membeli beras dengan merek yang sama seperti setiap bulan dari toko yang biasa ia datangi di dekat rumah.",
        },
      ],
    },
  },
};

export default item;
