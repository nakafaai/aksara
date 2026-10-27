import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  stimulus: "rain-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Taman resapan dapat ditetapkan sebagai penyebab utama karena dua pengamatan berikutnya lebih baik.",
        },
        {
          correct: false,
          label:
            "Hasil dapat diterapkan pada sekolah lain yang membangun taman dengan ukuran serupa.",
        },
        {
          correct: false,
          label:
            "Taman mengurangi genangan karena intensitas hujan sesudah pembangunan lebih rendah.",
        },
        {
          correct: false,
          label: "Data tambahan tidak lagi diperlukan.",
        },
        {
          correct: true,
          label:
            "Pada dua hujan yang diamati sesudah pembangunan, genangan surut lebih cepat daripada dua pengamatan sebelumnya.",
        },
      ],
    },
  },
};

export default item;
