import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, karena orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          correct: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, ketika orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          correct: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          correct: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak; oleh karena itu, orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          correct: true,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, tetapi orang dewasa juga perlu memiliki batas penggunaan media.",
        },
      ],
    },
  },
};

export default item;
