import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "gang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kendaraan yang membawa mereka dari daerah asal ke kota",
        },
        {
          correct: false,
          label: "kamar yang mereka sewa dari kerabat setelah mendapat pekerjaan",
        },
        {
          correct: true,
          label: "tempat tinggal sementara di rumah kerabat",
        },
        {
          correct: false,
          label: "kesempatan bekerja di usaha rumahan milik kerabat",
        },
        {
          correct: false,
          label: "bantuan biaya hidup dari kerabat selama mencari kerja",
        },
      ],
    },
  },
};

export default item;
