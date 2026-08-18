import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Der Preis von Nudel A ist nie gesunken", value: false },
    {
      label: "Der Preis von Nudel B ist in jedem Zeitraum gestiegen",
      value: false,
    },
    {
      label: "Bei einem Nudelprodukt sank der Preis genau einmal",
      value: true,
    },
    {
      label: "Bei jedem Produkt gab es mehr Anstiege als Rückgänge",
      value: false,
    },
    {
      label: "Der Preis von Nudel A lag jedes Jahr unter Rp $$3000$$",
      value: false,
    },
  ],
};

export default choices;
