import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "necessary-condition",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Hari ini tidak ada kunjungan dinas.",
        },
        {
          correct: false,
          label:
            "Setiap kali ketua panitia hadir, rapat koordinasi pasti dimulai.",
        },
        {
          correct: false,
          label:
            "Hari ini ada kunjungan dinas, tetapi ketua panitia tetap hadir.",
        },
        {
          correct: false,
          label: "Kemarin juga tidak ada kunjungan dinas.",
        },
        {
          correct: false,
          label: "Ketua panitia tidak hadir pada hari ini.",
        },
      ],
    },
  },
};

export default item;
