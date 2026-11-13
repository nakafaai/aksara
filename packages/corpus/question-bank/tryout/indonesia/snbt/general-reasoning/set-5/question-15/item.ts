import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "selection",
  },
  stimulus: "sains",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Danu dipilih.",
        },
        {
          correct: false,
          label: "Jika Danu dipilih, Gendis juga dipilih.",
        },
        {
          correct: false,
          label: "Paling sedikit satu dari Bening dan Cempaka dipilih.",
        },
        {
          correct: true,
          label: "Jika Gendis dipilih, Danu juga dipilih.",
        },
        {
          correct: false,
          label: "Jika Bening dipilih, Haikal juga dipilih.",
        },
      ],
    },
  },
};

export default item;
