import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sensus tersebut membuktikan bahwa sebagian besar petani Indonesia masih muda.",
        },
        {
          isCorrect: false,
          label:
            "Penurunan usaha pertanian perorangan membuktikan bahwa sektor pertanian Indonesia sedang menyusut.",
        },
        {
          isCorrect: true,
          label:
            "Oleh karena itu, Sensus Pertanian 2023 menyediakan landasan bukti yang luas dan terstandar untuk merancang kebijakan pertanian Indonesia.",
        },
        {
          isCorrect: false,
          label:
            "Pertanian perkotaan kini menjadi bentuk pertanian terbesar di Indonesia.",
        },
        {
          isCorrect: false,
          label:
            "Penerapan standar sensus internasional dengan sendirinya akan meningkatkan kesejahteraan petani.",
        },
      ],
    },
  },
};

export default item;
