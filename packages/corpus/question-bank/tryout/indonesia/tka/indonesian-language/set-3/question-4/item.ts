import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "untuk memastikan kedua kelompok menerima audio melalui perangkat yang sama",
        },
        {
          isCorrect: false,
          label:
            "untuk mengganti transkrip dengan label audio yang lebih rinci",
        },
        {
          isCorrect: false,
          label: "untuk memperpanjang setiap audio",
        },
        {
          isCorrect: false,
          label:
            "untuk menunjukkan bahwa format audio dan transkrip menghasilkan tingkat pemahaman yang sama",
        },
        {
          isCorrect: true,
          label: "untuk membandingkan hasil belajar dengan ukuran yang sama",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
