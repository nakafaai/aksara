import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "text-structure",
  },
  stimulus: "suspension-bridge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "perbandingan dua cara menyeberangi sungai",
        },
        {
          correct: false,
          label: "pendapat umum yang diikuti beberapa contoh",
        },
        {
          correct: false,
          label: "sebab-sebab banjir di Sungai Cibening",
        },
        {
          correct: false,
          label: "langkah-langkah teknis membangun jembatan gantung",
        },
        {
          correct: true,
          label:
            "masalah yang dihadapi warga, upaya mengatasinya, lalu hasil upaya itu",
        },
      ],
    },
  },
};

export default item;
