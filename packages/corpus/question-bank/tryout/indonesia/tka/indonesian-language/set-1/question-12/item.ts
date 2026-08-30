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
          isCorrect: true,
          label:
            "kalimat ketiga memberi contoh alasan simpulan awal belum kuat",
        },
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
          label: "keduanya menyatakan semua lokasi memiliki kondisi sama",
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
