import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, karena orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, ketika orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: false,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak; oleh karena itu, orang dewasa juga perlu memiliki batas penggunaan media.",
        },
        {
          isCorrect: true,
          label:
            "Rencana media keluarga perlu menetapkan batas bagi anak, tetapi orang dewasa juga perlu memiliki batas penggunaan media.",
        },
      ],
    },
  },
};

export default item;
