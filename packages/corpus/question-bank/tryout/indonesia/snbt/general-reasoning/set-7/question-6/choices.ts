import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "More durable and more expensive than the terrace light.",
      value: false,
    },
    {
      label: "Not more durable and more expensive than the terrace light.",
      value: false,
    },
    {
      label: "Not more durable and not more expensive than the terrace light.",
      value: true,
    },
    {
      label: "More durable and not more expensive than the terrace light.",
      value: false,
    },
    {
      label: "Equally durable and equally expensive as the terrace light.",
      value: false,
    },
  ],
  id: [
    {
      label: "Lebih tahan lama dan lebih mahal daripada lampu di teras rumah.",
      value: false,
    },
    {
      label:
        "Tidak lebih tahan lama dan lebih mahal daripada lampu di teras rumah.",
      value: false,
    },
    {
      label:
        "Tidak lebih tahan lama dan tidak lebih mahal daripada lampu di teras rumah.",
      value: true,
    },
    {
      label:
        "Lebih tahan lama dan tidak lebih mahal daripada lampu di teras rumah.",
      value: false,
    },
    {
      label: "Sama tahan lama dan sama mahalnya dengan di teras rumah.",
      value: false,
    },
  ],
};

export default choices;
