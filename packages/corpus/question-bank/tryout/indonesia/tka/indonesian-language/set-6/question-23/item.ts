import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "countdown-lights",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "data itu berguna, tetapi hanya berasal dari satu persimpangan selama empat minggu sehingga belum dapat berlaku untuk semua persimpangan",
        },
        {
          correct: false,
          label:
            "data itu membuktikan bahwa penghitung waktu mundur membuat jalan lebih aman",
        },
        {
          correct: false,
          label:
            "data itu sama sekali tidak berguna karena setiap tahap hanya direkam dua minggu",
        },
        {
          correct: false,
          label:
            "data itu menunjukkan bahwa semua pengendara melaju kencang ketika lampu hijau hampir habis",
        },
        {
          correct: false,
          label: "data itu membuktikan bahwa pejalan kaki menjadi lebih aman",
        },
      ],
    },
  },
};

export default item;
