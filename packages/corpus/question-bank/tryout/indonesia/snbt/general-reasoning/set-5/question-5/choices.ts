import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Factory X sells $$500{,}000$$ units", value: false },
    { label: "Factory Y sells $$5{,}200{,}000$$ units", value: false },
    { label: "Factory Z sells $$250{,}000$$ units", value: true },
    {
      label:
        "Factory Y's predicted sales are four times Factory X's $$2016$$ sales",
      value: false,
    },
    {
      label: "Factory X sells $$800{,}000$$ fewer units than in $$2016$$",
      value: false,
    },
  ],
  id: [
    { label: "Pabrik X menjual $$500{.}000$$ unit", value: false },
    { label: "Pabrik Y menjual $$5{.}200{.}000$$ unit", value: false },
    { label: "Pabrik Z menjual $$250{.}000$$ unit", value: true },
    {
      label:
        "Prediksi penjualan Pabrik Y empat kali penjualan Pabrik X pada $$2016$$",
      value: false,
    },
    {
      label:
        "Pabrik X menjual $$800{.}000$$ unit lebih sedikit daripada pada $$2016$$",
      value: false,
    },
  ],
};

export default choices;
