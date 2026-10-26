import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "untuk memastikan kedua kelompok menerima audio melalui perangkat yang sama",
        },
        {
          correct: false,
          label:
            "untuk mengganti transkrip dengan label audio yang lebih rinci",
        },
        {
          correct: false,
          label: "untuk memperpanjang setiap audio",
        },
        {
          correct: false,
          label:
            "untuk menunjukkan bahwa format audio dan transkrip menghasilkan tingkat pemahaman yang sama",
        },
        {
          correct: true,
          label: "untuk membandingkan hasil belajar dengan ukuran yang sama",
        },
      ],
    },
  },
  stimulus: "audio-labels",
};

export default item;
