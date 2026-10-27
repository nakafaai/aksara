import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Spesies ini hanya berasal dari Papua",
        },
        {
          correct: false,
          label:
            "Spesies ini merupakan tumbuhan introduksi di semua wilayah di luar Pulau Papua",
        },
        {
          correct: true,
          label:
            "Daerah asal spesies ini membentang jauh melampaui Pulau Papua",
        },
        {
          correct: false,
          label: "Spesies ini terutama hidup di bioma kering beriklim sedang",
        },
        {
          correct: false,
          label: "Spesies ini merupakan herba, bukan pohon",
        },
      ],
    },
  },
};

export default item;
