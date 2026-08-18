import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "It is more durable and more expensive than the terrace lamp.",
      value: false,
    },
    {
      label: "It is less durable but more expensive than the terrace lamp.",
      value: false,
    },
    {
      label: "It is less durable and less expensive than the terrace lamp.",
      value: true,
    },
    {
      label: "It is more durable but less expensive than the terrace lamp.",
      value: false,
    },
    {
      label: "It is equally durable and equally expensive as the terrace lamp.",
      value: false,
    },
  ],
  id: [
    {
      label: "Lampu itu lebih tahan lama dan lebih mahal daripada lampu teras.",
      value: false,
    },
    {
      label:
        "Lampu itu kurang tahan lama, tetapi lebih mahal daripada lampu teras.",
      value: false,
    },
    {
      label:
        "Lampu itu kurang tahan lama dan lebih murah daripada lampu teras.",
      value: true,
    },
    {
      label:
        "Lampu itu lebih tahan lama, tetapi lebih murah daripada lampu teras.",
      value: false,
    },
    {
      label: "Lampu itu sama tahan lama dan sama mahalnya dengan lampu teras.",
      value: false,
    },
  ],
};

export default choices;
