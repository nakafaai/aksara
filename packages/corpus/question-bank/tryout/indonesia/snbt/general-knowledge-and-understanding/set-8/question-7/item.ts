import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "lontar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (4) membantah cara menulis yang disebut pada kalimat (3).",
        },
        {
          correct: false,
          label:
            "Kalimat (4) memberikan contoh huruf yang ditulis pada daun lontar.",
        },
        {
          correct: false,
          label:
            "Kalimat (4) menyebutkan akibat buruk dari cara menulis dengan pisau yang disebut pada kalimat (3).",
        },
        {
          correct: false,
          label:
            "Kalimat (4) mengulang isi kalimat (3) dengan kata-kata yang berbeda.",
        },
        {
          correct: true,
          label:
            "Kalimat (4) menjelaskan langkah lanjutan agar goresan pada kalimat (3) terlihat jelas.",
        },
      ],
    },
  },
};

export default item;
