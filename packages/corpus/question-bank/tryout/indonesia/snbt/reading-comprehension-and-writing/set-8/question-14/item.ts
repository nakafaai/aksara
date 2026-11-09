import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "jamu-label",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "harga jamu menjadi lebih murah",
        },
        {
          correct: false,
          label: "Bu Sumiati tidak perlu lagi berkeliling",
        },
        {
          correct: false,
          label: "jamu dapat diminum kapan saja tanpa batas waktu",
        },
        {
          correct: false,
          label: "tetangga lama berhenti membeli jamu",
        },
        {
          correct: true,
          label:
            "pembeli baru dapat mengetahui bahan jamu yang sebelumnya membuat mereka ragu",
        },
      ],
    },
  },
};

export default item;
