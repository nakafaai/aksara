import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sedikitnya satu hidangan tidak sekaligus asam dan pedas",
        },
        {
          isCorrect: false,
          label: "Sedikitnya satu hidangan tidak asam dan tidak pedas",
        },
        {
          isCorrect: false,
          label: "Setiap hidangan mengandung sayuran mentah",
        },
        {
          isCorrect: true,
          label:
            "Sedikitnya satu hidangan tidak mengandung sayuran mentah serta terasa asam dan pedas",
        },
        {
          isCorrect: false,
          label: "Tidak ada hidangan yang mengandung sayuran mentah",
        },
      ],
    },
  },
};

export default item;
