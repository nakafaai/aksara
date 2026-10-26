import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lampu itu lebih tahan lama dan lebih mahal daripada lampu teras.",
        },
        {
          correct: false,
          label:
            "Lampu itu kurang tahan lama, tetapi lebih mahal daripada lampu teras.",
        },
        {
          correct: false,
          label:
            "Lampu itu lebih tahan lama, tetapi lebih murah daripada lampu teras.",
        },
        {
          correct: false,
          label:
            "Lampu itu sama tahan lama dan sama mahalnya dengan lampu teras.",
        },
        {
          correct: true,
          label:
            "Lampu itu kurang tahan lama dan lebih murah daripada lampu teras.",
        },
      ],
    },
  },
};

export default item;
