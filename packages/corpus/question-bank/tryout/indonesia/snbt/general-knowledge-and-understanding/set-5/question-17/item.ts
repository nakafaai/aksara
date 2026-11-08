import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "affix-meaning",
  },
  stimulus: "pinisi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "orang yang membuat kapal",
        },
        {
          correct: false,
          label: "hasil dari kegiatan membuat kapal",
        },
        {
          correct: false,
          label: "alat yang dipakai untuk membuat kapal",
        },
        {
          correct: false,
          label: "tempat kapal dibuat",
        },
        {
          correct: true,
          label: "proses atau kegiatan membuat kapal",
        },
      ],
    },
  },
};

export default item;
