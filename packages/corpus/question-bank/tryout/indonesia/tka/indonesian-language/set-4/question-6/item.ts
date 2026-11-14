import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "change-coins",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nisa kehilangan uang karena seorang pembeli sengaja menipunya",
        },
        {
          correct: true,
          label:
            "kesalahan menghitung kembalian mendorong Nisa memperbaiki cara kerjanya dan berujung pada kejujuran yang dihargai",
        },
        {
          correct: false,
          label: "ibu Nisa memarahi Nisa karena kurang teliti menjaga warung",
        },
        {
          correct: false,
          label:
            "antrean anak-anak sekolah membuat warung kue Nisa terpaksa tutup",
        },
        {
          correct: false,
          label:
            "Nisa memutuskan berhenti menjaga warung agar dapat fokus belajar",
        },
      ],
    },
  },
};

export default item;
