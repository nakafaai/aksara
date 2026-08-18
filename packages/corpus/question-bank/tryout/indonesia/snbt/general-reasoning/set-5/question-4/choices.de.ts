import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Verkaufszahlen von Fabrik Y haben konstante zweite Differenzen",
      value: false,
    },
    {
      label: "Die Verkaufszahlen von Fabrik Z bilden eine geometrische Folge",
      value: false,
    },
    {
      label:
        "Die Verkaufszahlen von Fabrik Z sanken in jedem Zeitraum um $$50%$$",
      value: false,
    },
    {
      label:
        "Der Gesamtverkauf von Fabrik Y ist mehr als doppelt so hoch wie die gemeinsamen Gesamtverkäufe der Fabriken X und Z",
      value: false,
    },
    {
      label:
        "Der größte prozentuale Rückgang bei Fabrik X trat $$2014\\text{-}2015$$ auf",
      value: true,
    },
  ],
};

export default choices;
