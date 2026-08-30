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
          label: "pohon pasti menjadi satu-satunya penyebab lokasi sejuk",
        },
        {
          isCorrect: true,
          label:
            "data awal berguna untuk keputusan praktis, tetapi belum cukup menjelaskan sebab",
        },
        {
          isCorrect: false,
          label: "pengukuran suhu sekolah tidak dapat digunakan sama sekali",
        },
        {
          isCorrect: false,
          label: "ruang baca harus selalu ditutup pada siang hari",
        },
        {
          isCorrect: false,
          label: "semua bangku sekolah sebaiknya dipindahkan ke lapangan",
        },
      ],
    },
  },
  stimulusKey: "heat-map",
};

export default item;
