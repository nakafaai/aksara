import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sensus tersebut membuktikan bahwa sebagian besar petani Indonesia masih muda.",
        },
        {
          correct: false,
          label:
            "Penurunan usaha pertanian perorangan membuktikan bahwa sektor pertanian Indonesia sedang menyusut.",
        },
        {
          correct: true,
          label:
            "Oleh karena itu, Sensus Pertanian 2023 menyediakan landasan bukti yang luas dan terstandar untuk merancang kebijakan pertanian Indonesia.",
        },
        {
          correct: false,
          label:
            "Pertanian perkotaan kini menjadi bentuk pertanian terbesar di Indonesia.",
        },
        {
          correct: false,
          label:
            "Penerapan standar sensus internasional dengan sendirinya akan meningkatkan kesejahteraan petani.",
        },
      ],
    },
  },
};

export default item;
