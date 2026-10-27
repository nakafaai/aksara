import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sensor aktif dan alarm tercatat.",
        },
        {
          correct: false,
          label: "Sensor aktif, tetapi alarm tidak tercatat.",
        },
        {
          correct: false,
          label: "Alarm tercatat, tetapi teknisi tidak diberi tahu.",
        },
        {
          correct: true,
          label: "Sensor tidak aktif dan alarm tidak tercatat.",
        },
        {
          correct: false,
          label: "Hanya status teknisi yang dapat diketahui.",
        },
      ],
    },
  },
};

export default item;
