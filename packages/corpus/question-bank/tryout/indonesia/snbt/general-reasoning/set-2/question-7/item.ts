import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "flaw",
  },
  stimulus: "aplikasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengelola memakai persentase, bukan jumlah pengguna yang lulus.",
        },
        {
          correct: false,
          label:
            "Ujian masuk perguruan tinggi negeri memiliki tingkat kesulitan yang tinggi.",
        },
        {
          correct: false,
          label: "Survei dikirim secara daring kepada pengguna aplikasi.",
        },
        {
          correct: false,
          label:
            "Pengelola menganggap semua pengguna aplikasi belajar lebih dari dua jam setiap hari, padahal sebagian pengguna belajar jauh lebih singkat.",
        },
        {
          correct: true,
          label:
            "Pengelola tidak membandingkan hasil itu dengan tingkat kelulusan siswa yang belajar kurang dari dua jam atau tidak memakai aplikasi.",
        },
      ],
    },
  },
};

export default item;
