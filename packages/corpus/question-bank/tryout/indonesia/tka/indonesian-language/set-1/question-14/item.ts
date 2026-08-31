import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pohon kemungkinan merupakan penyebab utama karena lokasi di bawahnya paling sejuk",
        },
        {
          isCorrect: false,
          label: "pengukuran suhu sekolah tidak dapat digunakan sama sekali",
        },
        {
          isCorrect: true,
          label:
            "data awal berguna untuk keputusan praktis, tetapi belum cukup menjelaskan sebab",
        },
        {
          isCorrect: false,
          label:
            "ruang baca sebaiknya ditutup pada jam terpanas sampai pengukuran lebih lengkap",
        },
        {
          isCorrect: false,
          label:
            "bangku sebaiknya dipindahkan ke lokasi dengan suhu rata-rata terendah pada lima hari itu",
        },
      ],
    },
  },
  stimulusKey: "heat-map",
};

export default item;
