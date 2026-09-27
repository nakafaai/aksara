import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "larangan yang menghapus seluruh pilihan tindakan",
        },
        {
          isCorrect: true,
          label:
            "rangsangan yang membuat suatu tindakan lebih menarik atau menguntungkan",
        },
        {
          isCorrect: false,
          label: "informasi yang tidak mengubah biaya atau manfaat tindakan",
        },
        {
          isCorrect: false,
          label: "hukuman setelah tindakan lain yang tidak berkaitan",
        },
        {
          isCorrect: false,
          label: "standar untuk mengukur hasil tanpa memengaruhi keputusan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
