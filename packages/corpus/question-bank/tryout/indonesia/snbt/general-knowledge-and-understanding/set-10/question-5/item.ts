import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "sasando",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sasando, alat petik dari Rote, bunyinya diperkuat wadah lontar dan terus berkembang.",
        },
        {
          correct: false,
          label:
            "Sasando hanya dapat dimainkan oleh pemain yang memetik dawainya dengan satu tangan saja.",
        },
        {
          correct: false,
          label:
            "Sasando listrik lebih disukai karena wadah daun lontar sulit dibuat dan juga mudah rusak.",
        },
        {
          correct: false,
          label:
            "Nama sasando berasal dari bahasa Jawa yang berarti alat musik yang terbuat dari bambu.",
        },
        {
          correct: false,
          label:
            "Jumlah dawai sasando tidak pernah berubah sejak alat musik itu pertama kali dibuat orang.",
        },
      ],
    },
  },
};

export default item;
