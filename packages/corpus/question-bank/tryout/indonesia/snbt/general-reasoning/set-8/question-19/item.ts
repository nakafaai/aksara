import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua peserta rapat hari Senin adalah karyawan yang bekerja jarak jauh.",
        },
        {
          correct: true,
          label: "Sebagian peserta rapat hari Senin tidak bekerja jarak jauh.",
        },
        {
          correct: false,
          label: "Tidak ada karyawan baru yang menghadiri rapat hari Senin.",
        },
        {
          correct: false,
          label: "Semua karyawan baru menghadiri rapat hari Senin.",
        },
        {
          correct: false,
          label:
            "Sebagian karyawan yang bekerja jarak jauh adalah karyawan baru.",
        },
      ],
    },
  },
};

export default item;
