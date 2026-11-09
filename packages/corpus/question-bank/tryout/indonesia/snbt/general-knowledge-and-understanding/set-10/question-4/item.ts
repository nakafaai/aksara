import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "sasando",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (10) membantah keterangan bahwa wadah daun lontar dapat memperkuat bunyi dawai.",
        },
        {
          correct: false,
          label:
            "Kalimat (10) memberikan contoh cara melipat daun lontar menjadi wadah berbentuk kipas.",
        },
        {
          correct: false,
          label:
            "Kalimat (10) menjelaskan asal nama sasando dari kata dalam bahasa Rote.",
        },
        {
          correct: false,
          label:
            "Kalimat (10) mengulang isi kalimat (6) dengan susunan kata-kata yang berbeda.",
        },
        {
          correct: true,
          label:
            "Kalimat (10) menunjukkan tugas wadah pada kalimat (6) dapat diganti pengeras suara.",
        },
      ],
    },
  },
};

export default item;
