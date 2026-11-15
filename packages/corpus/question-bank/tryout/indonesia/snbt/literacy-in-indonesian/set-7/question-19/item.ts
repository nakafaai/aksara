import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "bus-ridership",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kenaikan penumpang hampir sepertiga terlalu kecil untuk dianggap berarti bagi bus kota.",
        },
        {
          correct: true,
          label:
            "Kenaikan itu bersamaan dengan bus yang lebih sering, dan koridor yang hanya mendapat tarif murah naik sekitar $$10\\%$$.",
        },
        {
          correct: false,
          label:
            "Wali kota memakai rata-rata hari kerja, padahal seharusnya memakai rata-rata penumpang pada akhir pekan dan hari libur.",
        },
        {
          correct: false,
          label:
            "Penumpang Koridor C lebih banyak daripada Koridor A sebelum perubahan, sehingga datanya tidak dapat dibandingkan.",
        },
        {
          correct: false,
          label:
            "Tarif Rp$$3{.}000$$ terlalu murah, sehingga pendapatan tiket tidak cukup untuk membiayai bus.",
        },
      ],
    },
  },
};

export default item;
