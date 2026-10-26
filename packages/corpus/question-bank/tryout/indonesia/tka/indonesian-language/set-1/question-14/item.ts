import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pohon kemungkinan merupakan penyebab utama karena lokasi di bawahnya paling sejuk",
        },
        {
          correct: false,
          label: "pengukuran suhu sekolah tidak dapat digunakan sama sekali",
        },
        {
          correct: true,
          label:
            "data awal berguna untuk keputusan praktis, tetapi belum cukup menjelaskan sebab",
        },
        {
          correct: false,
          label:
            "ruang baca sebaiknya ditutup pada jam terpanas sampai pengukuran lebih lengkap",
        },
        {
          correct: false,
          label:
            "bangku sebaiknya dipindahkan ke lokasi dengan suhu rata-rata terendah pada lima hari itu",
        },
      ],
    },
  },
  stimulus: "heat-map",
};

export default item;
