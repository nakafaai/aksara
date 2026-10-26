import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sedikitnya satu hidangan tidak sekaligus asam dan pedas",
        },
        {
          correct: false,
          label: "Sedikitnya satu hidangan tidak asam dan tidak pedas",
        },
        {
          correct: false,
          label: "Setiap hidangan mengandung sayuran mentah",
        },
        {
          correct: true,
          label:
            "Sedikitnya satu hidangan tidak mengandung sayuran mentah serta terasa asam dan pedas",
        },
        {
          correct: false,
          label: "Tidak ada hidangan yang mengandung sayuran mentah",
        },
      ],
    },
  },
};

export default item;
