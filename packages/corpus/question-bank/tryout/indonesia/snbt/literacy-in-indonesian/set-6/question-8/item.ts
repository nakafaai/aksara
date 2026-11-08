import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "homework-debate",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Banyak siswa sekolah menengah atas mengerjakan tugas sampai lewat tengah malam.",
        },
        {
          correct: false,
          label:
            "Orang tua yang kurang berpendidikan sering kesulitan membantu anaknya mengerjakan tugas.",
        },
        {
          correct: false,
          label:
            "Murid sekolah dasar yang tidurnya cukup tampak lebih segar ketika belajar di kelas.",
        },
        {
          correct: false,
          label:
            "Sebagian guru mungkin merasa pekerjaan rumah membantu murid berlatih di rumah.",
        },
        {
          correct: true,
          label:
            "Murid SD dari keluarga sibuk dapat mengerjakan tugas sederhana sendiri tanpa tertinggal.",
        },
      ],
    },
  },
};

export default item;
