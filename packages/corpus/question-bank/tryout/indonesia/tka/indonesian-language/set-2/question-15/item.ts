import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Taman resapan dapat ditetapkan sebagai penyebab utama karena dua pengamatan berikutnya lebih baik.",
        },
        {
          isCorrect: false,
          label:
            "Hasil dapat diterapkan pada sekolah lain yang membangun taman dengan ukuran serupa.",
        },
        {
          isCorrect: false,
          label:
            "Taman mengurangi genangan karena intensitas hujan sesudah pembangunan lebih rendah.",
        },
        {
          isCorrect: false,
          label: "Data tambahan tidak lagi diperlukan.",
        },
        {
          isCorrect: true,
          label:
            "Pada dua hujan yang diamati sesudah pembangunan, genangan surut lebih cepat daripada dua pengamatan sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "rain-garden",
};

export default item;
