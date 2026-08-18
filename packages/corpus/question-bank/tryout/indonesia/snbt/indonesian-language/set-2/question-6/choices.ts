import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Komik dan novel", value: false },
    { label: "Dongeng dan pengetahuan", value: true },
    { label: "Cerita fiksi dan komik", value: false },
    { label: "Dongeng dan penelitian", value: false },
    { label: "Cerita fiksi dan keagamaan", value: false },
  ],
};

export default choices;
