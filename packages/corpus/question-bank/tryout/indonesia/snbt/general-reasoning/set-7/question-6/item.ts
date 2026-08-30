import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sie ist langlebiger und teurer als die Terrassenlampe.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sie ist weniger langlebig, aber teurer als die Terrassenlampe.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sie ist weniger langlebig und günstiger als die Terrassenlampe.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sie ist langlebiger, aber günstiger als die Terrassenlampe.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sie ist genauso langlebig und genauso teuer wie die Terrassenlampe.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is more durable and more expensive than the terrace lamp.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is less durable but more expensive than the terrace lamp.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "It is less durable and less expensive than the terrace lamp.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is more durable but less expensive than the terrace lamp.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It is equally durable and equally expensive as the terrace lamp.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lampu itu lebih tahan lama dan lebih mahal daripada lampu teras.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lampu itu kurang tahan lama, tetapi lebih mahal daripada lampu teras.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Lampu itu kurang tahan lama dan lebih murah daripada lampu teras.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lampu itu lebih tahan lama, tetapi lebih murah daripada lampu teras.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lampu itu sama tahan lama dan sama mahalnya dengan lampu teras.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
