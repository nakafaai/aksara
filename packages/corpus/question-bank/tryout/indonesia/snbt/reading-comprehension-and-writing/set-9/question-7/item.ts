import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "food-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rina Ayu, ketua kelompok mahasiswa itu, berpendapat bahwa bank makanan dapat mengurangi makanan yang terbuang di kota itu.",
        },
        {
          correct: false,
          label:
            "Rina Ayu, ketua kelompok mahasiswa itu berpendapat bahwa bank makanan dapat mengurangi makanan yang terbuang di kota itu.",
        },
        {
          correct: false,
          label:
            "Rina Ayu ketua kelompok mahasiswa itu, berpendapat bahwa bank makanan dapat mengurangi makanan yang terbuang di kota itu.",
        },
        {
          correct: false,
          label:
            "Rina Ayu, ketua kelompok mahasiswa itu, berpendapat, bahwa bank makanan dapat mengurangi makanan yang terbuang di kota itu.",
        },
        {
          correct: false,
          label:
            "Rina Ayu: ketua kelompok mahasiswa itu berpendapat bahwa bank makanan dapat mengurangi makanan yang terbuang di kota itu.",
        },
      ],
    },
  },
};

export default item;
