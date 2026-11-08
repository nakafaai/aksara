import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "cabai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Harga cabai hanya ditentukan oleh banyaknya pasokan.",
        },
        {
          correct: false,
          label: "Pasokan cabai naik karena harganya turun.",
        },
        {
          correct: true,
          label:
            "Harga cabai cenderung turun ketika pasokan naik, kecuali pada minggu menjelang hari raya.",
        },
        {
          correct: false,
          label: "Pasokan cabai selalu naik dari minggu ke minggu.",
        },
        {
          correct: false,
          label:
            "Harga cabai pada minggu menjelang hari raya turun karena pasokan dari petani melimpah.",
        },
      ],
    },
  },
};

export default item;
