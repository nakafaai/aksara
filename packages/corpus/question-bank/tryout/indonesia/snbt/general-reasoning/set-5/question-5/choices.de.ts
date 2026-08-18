import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Fabrik X verkauft $$500{.}000$$ Stück", value: false },
    { label: "Fabrik Y verkauft $$5{.}200{.}000$$ Stück", value: false },
    { label: "Fabrik Z verkauft $$250{.}000$$ Stück", value: true },
    {
      label:
        "Die prognostizierten Verkäufe von Fabrik Y sind viermal so hoch wie die Verkäufe von Fabrik X im Jahr $$2016$$",
      value: false,
    },
    {
      label:
        "Fabrik X verkauft $$800{.}000$$ Stück weniger als im Jahr $$2016$$",
      value: false,
    },
  ],
};

export default choices;
