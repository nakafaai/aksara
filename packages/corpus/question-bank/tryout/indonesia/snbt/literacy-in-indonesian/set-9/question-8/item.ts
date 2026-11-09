import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "national-exam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "ujian bertaruhan tinggi tidak lagi mengukur kemampuan dengan jujur",
        },
        {
          correct: false,
          label:
            "bimbingan belajar adalah cara terbaik menyiapkan siswa menghadapi ujian",
        },
        {
          correct: false,
          label:
            "nilai rapor lebih mudah dibandingkan daripada nilai ujian nasional",
        },
        {
          correct: false,
          label:
            "pemerintah tidak memerlukan data tentang mutu pendidikan di daerah",
        },
        {
          correct: false,
          label:
            "siswa pada masa lalu lebih bersungguh-sungguh daripada siswa sekarang",
        },
      ],
    },
  },
};

export default item;
