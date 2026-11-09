import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "aplikasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Aplikasi itu memiliki lebih dari satu juta pengguna terdaftar.",
        },
        {
          correct: false,
          label:
            "Di antara pengguna aplikasi yang mengisi survei tetapi belajar kurang dari dua jam setiap hari, tingkat kelulusannya hanya sekitar $$40\\%$$.",
        },
        {
          correct: false,
          label:
            "Sebagian pengguna aplikasi diterima di perguruan tinggi swasta.",
        },
        {
          correct: true,
          label:
            "Pengguna yang belajar lebih dari dua jam setiap hari di aplikasi itu umumnya juga mengikuti bimbingan belajar tatap muka setiap minggu.",
        },
        {
          correct: false,
          label: "Materi di aplikasi itu disusun oleh guru-guru berpengalaman.",
        },
      ],
    },
  },
};

export default item;
