import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mencuci beras akan mengurangi jumlah beras",
        },
        {
          correct: true,
          label: "Pati bebas pada permukaan butiran beras berkurang",
        },
        {
          correct: false,
          label: "Mencuci beras akan merusak bentuk beras",
        },
        {
          correct: false,
          label: "Beras yang dicuci akan mengurangi cita rasa khas dari beras",
        },
        {
          correct: false,
          label: "Kualitas beras yang dicuci tidak sebaik yang tidak dicuci",
        },
      ],
    },
  },
};

export default item;
