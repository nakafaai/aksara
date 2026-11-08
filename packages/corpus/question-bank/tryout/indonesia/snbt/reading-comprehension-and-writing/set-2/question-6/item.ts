import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "plastic-free-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menjelaskan cara membuat tas belanja dari kain",
        },
        {
          correct: false,
          label: "mengkritik pedagang sayur yang menolak kebijakan pasar",
        },
        {
          correct: true,
          label: "mendorong pengelola pasar lain meniru larangan itu dengan menyediakan tas pengganti yang murah",
        },
        {
          correct: false,
          label: "melaporkan jumlah pembeli Pasar Pagi Sukamaju setiap bulan",
        },
        {
          correct: false,
          label: "menjelaskan penyebab tersumbatnya selokan di sekitar pasar",
        },
      ],
    },
  },
};

export default item;
