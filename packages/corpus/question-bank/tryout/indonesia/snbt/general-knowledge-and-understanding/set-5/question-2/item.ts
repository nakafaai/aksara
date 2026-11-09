import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "subak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "aturan adat yang disepakati bersama oleh anggota subak",
        },
        {
          correct: false,
          label: "saluran air yang membagi air ke setiap petak sawah",
        },
        {
          correct: false,
          label: "jadwal tanam yang ditetapkan oleh pemerintah daerah",
        },
        {
          correct: false,
          label: "sanksi yang dijatuhkan kepada petani yang terlambat menanam",
        },
        {
          correct: false,
          label: "organisasi petani yang memakai sumber air yang sama",
        },
      ],
    },
  },
};

export default item;
