import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "museum",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Survei menunjukkan sebagian besar pengunjung hari Rabu pada bulan kedua pernah berkunjung pada hari lain selama bulan pertama.",
        },
        {
          correct: false,
          label: "Museum menambah koleksi baru pada awal bulan kedua.",
        },
        {
          correct: false,
          label:
            "Hujan lebih sering turun pada bulan kedua daripada bulan pertama.",
        },
        {
          correct: false,
          label:
            "Sebagian besar pengunjung hari Rabu pada bulan kedua adalah pelajar yang datang bersama sekolahnya dalam rombongan kunjungan belajar.",
        },
        {
          correct: false,
          label: "Tarif parkir di sekitar museum naik pada bulan kedua.",
        },
      ],
    },
  },
};

export default item;
