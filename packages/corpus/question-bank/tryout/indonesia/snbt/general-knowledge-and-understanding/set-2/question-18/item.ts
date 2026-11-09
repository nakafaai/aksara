import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "gerhana",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (5) membantah isi kalimat (4).",
        },
        {
          correct: false,
          label: "Kalimat (5) memberikan contoh lain dari isi kalimat (4).",
        },
        {
          correct: false,
          label: "Kalimat (5) menyatakan akibat dari isi kalimat (4).",
        },
        {
          correct: true,
          label: "Kalimat (5) menjelaskan penyebab keadaan pada kalimat (4).",
        },
        {
          correct: false,
          label: "Kalimat (5) mengulang isi kalimat (4) dengan kata-kata lain.",
        },
      ],
    },
  },
};

export default item;
