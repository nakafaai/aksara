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
            "Taman resapan terbukti sempurna tanpa kemungkinan penjelasan lain.",
        },
        {
          isCorrect: false,
          label: "Semua sekolah akan memperoleh hasil yang sama.",
        },
        {
          isCorrect: false,
          label: "Taman selalu mengurangi intensitas hujan.",
        },
        {
          isCorrect: true,
          label:
            "Pada dua hujan yang diamati sesudah pembangunan, genangan surut lebih cepat daripada dua pengamatan sebelumnya.",
        },
        {
          isCorrect: false,
          label: "Data tambahan tidak lagi diperlukan.",
        },
      ],
    },
  },
  stimulusKey: "rain-garden",
};

export default item;
