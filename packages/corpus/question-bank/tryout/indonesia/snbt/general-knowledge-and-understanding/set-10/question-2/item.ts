import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "cause",
  },
  stimulus: "sasando",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "daun lontar membuat dawai tidak mudah putus",
        },
        {
          correct: true,
          label: "wadah itu membuat getaran dawai lebih kuat",
        },
        {
          correct: false,
          label: "wadah itu menentukan nada setiap dawai",
        },
        {
          correct: false,
          label: "daun lontar mudah ditemukan di Pulau Rote",
        },
        {
          correct: false,
          label: "wadah itu menjadi tempat pemain memegang",
        },
      ],
    },
  },
};

export default item;
