import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "car-free-day",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Teks 1 ingin segera memperluas program, sedangkan Teks 2 meminta dampaknya di sekitar Jalan Merdeka diukur lebih dahulu.",
        },
        {
          correct: false,
          label:
            "Teks 1 mendukung program, sedangkan Teks 2 meminta program dihentikan karena merugikan pedagang.",
        },
        {
          correct: false,
          label:
            "Teks 1 menilai program dari sisi kesehatan, sedangkan Teks 2 menilainya dari sisi pendidikan anak.",
        },
        {
          correct: false,
          label:
            "Teks 1 menolak kehadiran pedagang kaki lima, sedangkan Teks 2 membela pedagang kaki lima.",
        },
        {
          correct: false,
          label:
            "Teks 1 dan Teks 2 sama-sama meminta program dipindahkan ke Jalan Pahlawan.",
        },
      ],
    },
  },
};

export default item;
