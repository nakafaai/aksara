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
          label: "untuk memaksa semua peserta memakai earphone",
        },
        {
          isCorrect: false,
          label: "untuk menghapus transkrip dari museum",
        },
        {
          isCorrect: false,
          label: "untuk memperpanjang setiap audio",
        },
        {
          isCorrect: true,
          label: "untuk membandingkan hasil belajar dengan ukuran yang sama",
        },
        {
          isCorrect: false,
          label: "untuk membuktikan semua benda mudah dipahami",
        },
      ],
    },
  },
  stimulusKey: "audio-labels",
};

export default item;
