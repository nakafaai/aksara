import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "larangan yang menghapus seluruh pilihan tindakan",
        },
        {
          correct: true,
          label:
            "rangsangan yang membuat suatu tindakan lebih menarik atau menguntungkan",
        },
        {
          correct: false,
          label: "informasi yang tidak mengubah biaya atau manfaat tindakan",
        },
        {
          correct: false,
          label: "hukuman setelah tindakan lain yang tidak berkaitan",
        },
        {
          correct: false,
          label: "standar untuk mengukur hasil tanpa memengaruhi keputusan",
        },
      ],
    },
  },
};

export default item;
