import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Treffen fand im Staatspalast statt",
      value: false,
    },
    {
      label:
        "Das Leistungsbilanzdefizit war mehr als dreimal so hoch wie das Handelsbilanzdefizit",
      value: false,
    },
    {
      label:
        "Die Regierung bat Wirtschaftsvertreter um konkrete und schnell umsetzbare Vorschläge",
      value: true,
    },
    {
      label:
        "Der Text beweist, dass der Handelskrieg das Handelsdefizit dauerhaft verursachte",
      value: false,
    },
    {
      label:
        "Nach dem Text kann die Wirtschaft künftige Herausforderungen ohne die Regierung bewältigen",
      value: false,
    },
  ],
};

export default choices;
