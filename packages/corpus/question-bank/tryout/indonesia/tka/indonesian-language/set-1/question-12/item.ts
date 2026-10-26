import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "heat-map",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kalimat ketiga menyangkal adanya perbedaan suhu",
        },
        {
          correct: false,
          label: "kalimat kedua menjelaskan prosedur pada kalimat ketiga",
        },
        {
          correct: false,
          label:
            "kedua kalimat menyimpulkan bahwa perbedaan lokasi tidak lagi memengaruhi suhu",
        },
        {
          correct: true,
          label:
            "kalimat ketiga memberi contoh alasan simpulan awal belum kuat",
        },
        {
          correct: false,
          label: "kalimat kedua dan ketiga tidak berkaitan",
        },
      ],
    },
  },
};

export default item;
