import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah.",
        },
        {
          isCorrect: false,
          label: "Daerah tanpa laporan pasti tidak memiliki bibit mangrove.",
        },
        {
          isCorrect: false,
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
        {
          isCorrect: true,
          label:
            "Peningkatan laporan tidak dengan sendirinya membuktikan peningkatan populasi yang sama besar.",
        },
        {
          isCorrect: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
