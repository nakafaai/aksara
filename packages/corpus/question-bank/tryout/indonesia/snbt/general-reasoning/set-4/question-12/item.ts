import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Spesies ini hanya berasal dari Papua",
        },
        {
          isCorrect: false,
          label:
            "Spesies ini merupakan tumbuhan introduksi di semua wilayah di luar Pulau Papua",
        },
        {
          isCorrect: true,
          label:
            "Daerah asal spesies ini membentang jauh melampaui Pulau Papua",
        },
        {
          isCorrect: false,
          label: "Spesies ini terutama hidup di bioma kering beriklim sedang",
        },
        {
          isCorrect: false,
          label: "Spesies ini merupakan herba, bukan pohon",
        },
      ],
    },
  },
};

export default item;
