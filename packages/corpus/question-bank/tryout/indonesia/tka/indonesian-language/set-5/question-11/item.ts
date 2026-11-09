import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "air-sensor",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "paragraf kedua memberi contoh sekolah yang sudah memasang sensor murah",
        },
        {
          correct: true,
          label:
            "paragraf kedua mengemukakan kelemahan sensor murah setelah paragraf pertama menyebut kemudahannya",
        },
        {
          correct: false,
          label:
            "paragraf kedua membantah bahwa sensor murah dapat menghitung partikel halus",
        },
        {
          correct: false,
          label:
            "paragraf kedua menjelaskan mengapa harga stasiun resmi sangat mahal",
        },
        {
          correct: false,
          label:
            "paragraf kedua menyimpulkan bahwa sensor murah sebaiknya dilarang",
        },
      ],
    },
  },
};

export default item;
