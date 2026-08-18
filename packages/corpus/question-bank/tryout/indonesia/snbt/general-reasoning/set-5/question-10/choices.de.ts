import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Ein Teil des Brotes aus Fabrik X enthält weder Kohlenhydrate noch Energie",
      value: false,
    },
    {
      label: "Jedes Brot aus Fabrik X verwendet proteinreiches Weizenmehl",
      value: false,
    },
    {
      label: "Ein Teil des proteinreichen Brotes enthält keine Kohlenhydrate",
      value: false,
    },
    {
      label: "Kein Brot aus Fabrik X verwendet proteinreiches Weizenmehl",
      value: false,
    },
    {
      label:
        "Ein Teil des Brotes aus Fabrik X verwendet proteinarmes Weizenmehl",
      value: true,
    },
  ],
};

export default choices;
