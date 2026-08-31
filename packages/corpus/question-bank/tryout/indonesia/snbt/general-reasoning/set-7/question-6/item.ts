import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sie ist langlebiger und teurer als die Terrassenlampe.",
        },
        {
          isCorrect: false,
          label:
            "Sie ist weniger langlebig, aber teurer als die Terrassenlampe.",
        },
        {
          isCorrect: false,
          label: "Sie ist langlebiger, aber günstiger als die Terrassenlampe.",
        },
        {
          isCorrect: false,
          label:
            "Sie ist genauso langlebig und genauso teuer wie die Terrassenlampe.",
        },
        {
          isCorrect: true,
          label:
            "Sie ist weniger langlebig und günstiger als die Terrassenlampe.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is more durable and more expensive than the terrace lamp.",
        },
        {
          isCorrect: false,
          label: "It is less durable but more expensive than the terrace lamp.",
        },
        {
          isCorrect: false,
          label: "It is more durable but less expensive than the terrace lamp.",
        },
        {
          isCorrect: false,
          label:
            "It is equally durable and equally expensive as the terrace lamp.",
        },
        {
          isCorrect: true,
          label: "It is less durable and less expensive than the terrace lamp.",
        },
      ],
    },
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
