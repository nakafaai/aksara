import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "artefact-return",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "keduanya menolak pengembalian sebelum museum baru selesai dibangun",
        },
        {
          correct: false,
          label:
            "keduanya menganggap museum Eropa lebih baik dalam merawat benda-benda kuno",
        },
        {
          correct: true,
          label:
            "keduanya setuju bahwa benda hasil rampasan berhak kembali ke tanah asalnya",
        },
        {
          correct: false,
          label: "keduanya meminta agar pengembalian dilakukan secara bertahap",
        },
        {
          correct: false,
          label:
            "keduanya menilai pengembalian benda budaya sebagai urusan dagang",
        },
      ],
    },
  },
};

export default item;
