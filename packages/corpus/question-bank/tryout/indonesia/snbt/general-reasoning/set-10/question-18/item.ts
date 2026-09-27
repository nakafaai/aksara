import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sensor aktif dan alarm tercatat.",
        },
        {
          isCorrect: false,
          label: "Sensor aktif, tetapi alarm tidak tercatat.",
        },
        {
          isCorrect: false,
          label: "Alarm tercatat, tetapi teknisi tidak diberi tahu.",
        },
        {
          isCorrect: true,
          label: "Sensor tidak aktif dan alarm tidak tercatat.",
        },
        {
          isCorrect: false,
          label: "Hanya status teknisi yang dapat diketahui.",
        },
      ],
    },
  },
};

export default item;
