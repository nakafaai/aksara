import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "possibility",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Ada anggota tim debat yang menjadi anggota tim futsal.",
        },
        {
          correct: false,
          label: "Ada siswa kelas XII yang menjadi anggota tim debat.",
        },
        {
          correct: false,
          label: "Semua anggota OSIS adalah siswa kelas XII.",
        },
        {
          correct: false,
          label: "Tidak ada anggota tim debat yang merupakan siswa kelas XII.",
        },
        {
          correct: false,
          label: "Ada siswa kelas XII yang bukan anggota OSIS.",
        },
      ],
    },
  },
};

export default item;
