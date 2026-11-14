import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "litium",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf ketiga menunjukkan bahwa lapisan tipis yang dibahas paragraf kedua lama-kelamaan tumbuh menjadi struktur runcing yang menembus selaput pemisah dan menyambungkan kedua elektrode.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga menawarkan cara untuk mencegah penurunan kapasitas yang disebabkan oleh menebalnya lapisan tipis seperti yang diuraikan pada paragraf kedua.",
        },
        {
          correct: true,
          label:
            "Paragraf ketiga menguraikan kerusakan lain yang dipicu oleh ion yang didorong masuk terlalu cepat, berbeda dari penurunan kapasitas pada paragraf kedua yang dipercepat oleh panas.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga membantah paragraf kedua dengan menunjukkan bahwa yang sebenarnya merusak baterai adalah udara dingin, bukan panas yang disebut paragraf kedua.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga memberikan contoh pengisian cepat untuk memperjelas bagaimana lapisan tipis yang dibahas paragraf kedua terbentuk dan menebal di permukaan anode.",
        },
      ],
    },
  },
};

export default item;
