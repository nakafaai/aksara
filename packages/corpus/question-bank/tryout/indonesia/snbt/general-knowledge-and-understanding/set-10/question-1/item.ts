import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "sasando",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tali pengikat yang melilit tabung bambu",
        },
        {
          correct: false,
          label: "lubang kecil pada dinding batang bambu",
        },
        {
          correct: false,
          label: "penutup kecil di ujung atas tabung",
        },
        {
          correct: true,
          label: "benda kecil penyangga yang diselipkan",
        },
        {
          correct: false,
          label: "alat pemetik yang dipasang di ujung jari",
        },
      ],
    },
  },
};

export default item;
