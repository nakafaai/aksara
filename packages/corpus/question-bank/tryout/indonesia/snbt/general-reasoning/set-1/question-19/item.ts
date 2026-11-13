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
          correct: true,
          label:
            "Sebagian kain yang dibuat dengan alat tenun gedogan tidak dipajang di ruang utama.",
        },
        {
          correct: false,
          label: "Tidak ada kain tenun ikat yang dipajang di ruang utama.",
        },
        {
          correct: false,
          label:
            "Semua kain yang tidak dipajang di ruang utama belum bersertifikat pewarna alami.",
        },
        {
          correct: false,
          label:
            "Sebagian kain yang dipajang di ruang utama bukan kain yang dibuat dengan alat tenun gedogan.",
        },
        {
          correct: false,
          label: "Sebagian kain tenun ikat sudah bersertifikat pewarna alami.",
        },
      ],
    },
  },
};

export default item;
