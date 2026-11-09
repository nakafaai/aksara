import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "rabies",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (5) membantah keterangan tentang kematian pada kalimat (4).",
        },
        {
          correct: true,
          label:
            "Kalimat (5) menyebutkan tindakan yang perlu diambil akibat isi kalimat (4).",
        },
        {
          correct: false,
          label:
            "Kalimat (5) memberikan contoh gejala rabies yang muncul setelah gigitan.",
        },
        {
          correct: false,
          label:
            "Kalimat (5) menjelaskan cara virus rabies bergerak menuju otak.",
        },
        {
          correct: false,
          label:
            "Kalimat (5) mengulang isi kalimat (4) dengan kata-kata yang lebih singkat dan jelas.",
        },
      ],
    },
  },
};

export default item;
