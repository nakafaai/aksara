import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der Verbrauch überschreitet den Grenzwert und der Strom wird unterbrochen",
      value: false,
    },
    {
      label:
        "Wenn der Strom nicht unterbrochen wird, hat der Verbrauch den Grenzwert nicht überschritten",
      value: false,
    },
    {
      label:
        "Der Verbrauch überschreitet den Grenzwert nicht oder der Strom wird unterbrochen",
      value: false,
    },
    {
      label:
        "Der Verbrauch überschreitet den Grenzwert und der Strom wird nicht unterbrochen",
      value: true,
    },
    {
      label:
        "Es trifft nicht zu, dass der Verbrauch den Grenzwert überschreitet, während der Strom eingeschaltet bleibt",
      value: false,
    },
  ],
};

export default choices;
