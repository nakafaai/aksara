import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "survivorship-bias",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kisah itu hanya memuat yang berhasil, dan untuk mengujinya cukup mengumpulkan lebih banyak kisah pengusaha sukses yang berhenti kuliah.",
        },
        {
          correct: false,
          label:
            "Pengusaha yang berhenti kuliah biasanya berasal dari keluarga kaya, dan untuk mengujinya perlu dicatat penghasilan orang tua mereka.",
        },
        {
          correct: false,
          label:
            "Kisah itu hanya memuat yang berhasil, dan untuk mengujinya perlu ditanyakan berapa lama mereka kuliah sebelum berhenti.",
        },
        {
          correct: true,
          label:
            "Kisah itu hanya memuat yang berhasil, dan untuk mengujinya perlu dibandingkan bagian yang menjadi pengusaha sukses di antara semua yang berhenti kuliah dan di antara yang lulus.",
        },
        {
          correct: false,
          label:
            "Berhenti kuliah memberi lebih banyak waktu untuk membangun usaha, dan untuk mengujinya perlu dicatat jam kerja para pengusaha itu.",
        },
      ],
    },
  },
};

export default item;
