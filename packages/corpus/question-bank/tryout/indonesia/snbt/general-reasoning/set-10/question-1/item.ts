import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "sepeda",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jalur sepeda menambah tepat 180 pesepeda baru di kota itu.",
        },
        {
          correct: false,
          label:
            "Jalan Cempaka menjadi lebih berbahaya bagi pesepeda setelah jalur dibangun.",
        },
        {
          correct: true,
          label:
            "Sebagian kenaikan di Jalan Merdeka mungkin berasal dari pesepeda yang pindah dari Jalan Cempaka.",
        },
        {
          correct: false,
          label:
            "Jumlah pesepeda di kedua jalan naik lebih dari dua kali lipat setelah jalur dibangun.",
        },
        {
          correct: false,
          label:
            "Jalur sepeda tidak berpengaruh apa pun terhadap jumlah pesepeda di kedua jalan.",
        },
      ],
    },
  },
};

export default item;
