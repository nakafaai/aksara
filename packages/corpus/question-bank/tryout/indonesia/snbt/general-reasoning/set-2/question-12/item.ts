import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "categorical-syllogism",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua siswa kelas XI adalah anggota paduan suara.",
        },
        {
          correct: true,
          label: "Sebagian siswa kelas XI dibebaskan dari piket hari Sabtu.",
        },
        {
          correct: false,
          label: "Semua anggota paduan suara dibebaskan dari piket hari Sabtu.",
        },
        {
          correct: false,
          label:
            "Semua peserta olimpiade matematika adalah anggota paduan suara.",
        },
        {
          correct: false,
          label: "Sebagian anggota paduan suara bukan siswa kelas XI.",
        },
      ],
    },
  },
};

export default item;
