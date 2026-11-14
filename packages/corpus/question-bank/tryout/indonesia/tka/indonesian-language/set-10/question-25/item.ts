import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "loud-exhaust",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "warga meminta pengukuran diulang karena alat ukur petugas rusak",
        },
        {
          correct: false,
          label: "catatan itu membuat warga membatalkan pemasangan spanduk",
        },
        {
          correct: false,
          label: "permintaan warga tidak berhubungan dengan catatan petugas",
        },
        {
          correct: true,
          label:
            "karena malam yang jauh lebih ramai belum diukur, warga ingin pengukuran diulang pada malam Minggu",
        },
        {
          correct: false,
          label:
            "catatan itu membuktikan bahwa tidak ada sepeda motor yang bising",
        },
      ],
    },
  },
};

export default item;
