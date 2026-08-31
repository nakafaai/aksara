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
          label: "kalimat ketiga menyangkal adanya perbedaan suhu",
        },
        {
          isCorrect: false,
          label: "kalimat kedua menjelaskan prosedur pada kalimat ketiga",
        },
        {
          isCorrect: false,
          label:
            "kedua kalimat menyimpulkan bahwa perbedaan lokasi tidak lagi memengaruhi suhu",
        },
        {
          isCorrect: true,
          label:
            "kalimat ketiga memberi contoh alasan simpulan awal belum kuat",
        },
        {
          isCorrect: false,
          label: "kalimat kedua dan ketiga tidak berkaitan",
        },
      ],
    },
  },
  stimulusKey: "heat-map",
};

export default item;
