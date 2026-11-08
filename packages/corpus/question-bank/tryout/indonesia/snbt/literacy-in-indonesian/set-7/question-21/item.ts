import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "recorded-lectures",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebagian besar rekaman kuliah baru ditonton pada minggu terakhir sebelum ujian.",
        },
        {
          correct: false,
          label:
            "Mahasiswa yang bekerja paruh waktu paling sering menonton rekaman kuliah.",
        },
        {
          correct: false,
          label:
            "Video kuliah dapat dihentikan dan diulang sebanyak yang diperlukan.",
        },
        {
          correct: false,
          label:
            "Diskusi di kelas kecil lebih hidup daripada diskusi di kelas yang besar.",
        },
        {
          correct: false,
          label:
            "Sebagian dosen mungkin lebih suka merekam kuliah daripada mengajar langsung di kelas.",
        },
      ],
    },
  },
};

export default item;
