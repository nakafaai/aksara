import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji kode pengembalian pada setiap gagang payung",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
