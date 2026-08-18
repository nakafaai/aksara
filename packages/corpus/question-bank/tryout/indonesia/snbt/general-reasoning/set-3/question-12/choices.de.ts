import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "In jeder Woche werden weniger Pashmina-Tücher als quadratische Tücher verkauft.",
      value: false,
    },
    {
      label:
        "In jeder Woche werden mehr Bergo-Tücher als quadratische Tücher verkauft.",
      value: true,
    },
    {
      label:
        "Die wöchentlichen Verkaufszahlen der Bergo-Tücher bilden eine arithmetische Folge.",
      value: false,
    },
    {
      label:
        "Von jedem Kopftuchmodell werden in jeder Woche mehr Stück als in der Vorwoche verkauft.",
      value: false,
    },
    {
      label:
        "Die Verkaufszahl der Bergo-Tücher steigt von Woche 1 bis Woche 4 am wenigsten.",
      value: false,
    },
  ],
};

export default choices;
