import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Lampu itu lebih tahan lama dan lebih mahal daripada lampu teras.",
        },
        {
          isCorrect: false,
          label:
            "Lampu itu kurang tahan lama, tetapi lebih mahal daripada lampu teras.",
        },
        {
          isCorrect: false,
          label:
            "Lampu itu lebih tahan lama, tetapi lebih murah daripada lampu teras.",
        },
        {
          isCorrect: false,
          label:
            "Lampu itu sama tahan lama dan sama mahalnya dengan lampu teras.",
        },
        {
          isCorrect: true,
          label:
            "Lampu itu kurang tahan lama dan lebih murah daripada lampu teras.",
        },
      ],
    },
  },
};

export default item;
