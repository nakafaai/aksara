import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conclusion",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sebagian finalis lomba debat bukan anggota klub jurnalistik.",
        },
        {
          correct: true,
          label: "Sebagian anggota klub jurnalistik bukan finalis lomba debat.",
        },
        {
          correct: false,
          label:
            "Tidak ada anggota klub jurnalistik yang menjadi finalis lomba debat.",
        },
        {
          correct: false,
          label: "Sebagian anggota klub jurnalistik adalah siswa kelas XI.",
        },
        {
          correct: false,
          label:
            "Semua anggota tim paduan suara adalah anggota klub jurnalistik.",
        },
      ],
    },
  },
};

export default item;
