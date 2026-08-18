import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Potassium-rich foods can replace prescribed blood-pressure treatment",
      value: false,
    },
    {
      label:
        "Potassium-rich foods may support blood-pressure management, but increasing potassium is not automatically safe for everyone",
      value: true,
    },
    {
      label: "Potassium removes all sodium from the body",
      value: false,
    },
    {
      label:
        "The more potassium someone consumes, the lower their blood pressure will always be",
      value: false,
    },
    {
      label:
        "Everyone should take potassium supplements without professional advice",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Makanan kaya kalium dapat menggantikan pengobatan tekanan darah yang diresepkan",
      value: false,
    },
    {
      label:
        "Makanan kaya kalium dapat membantu pengelolaan tekanan darah, tetapi menambah kalium tidak otomatis aman bagi semua orang",
      value: true,
    },
    {
      label: "Kalium menghilangkan seluruh natrium dari tubuh",
      value: false,
    },
    {
      label:
        "Semakin banyak kalium dikonsumsi, tekanan darah akan selalu semakin rendah",
      value: false,
    },
    {
      label:
        "Semua orang sebaiknya mengonsumsi suplemen kalium tanpa saran tenaga kesehatan",
      value: false,
    },
  ],
};

export default choices;
