import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Erntefläche in $$2018$$ war mehr als doppelt so groß wie die Erntefläche in $$2016$$",
      value: false,
    },
    {
      label:
        "Die Knoblauchproduktion in $$2018$$ war doppelt so hoch wie die Knoblauchproduktion in $$2017$$",
      value: false,
    },
    {
      label:
        "Im Zeitraum $$2015\\text{-}2017$$ verringerte sich die Knoblaucherntefläche kontinuierlich",
      value: false,
    },
    {
      label:
        "In $$2017$$ gab es einen Rückgang der Erntefläche, der Produktion und des Imports von Knoblauch",
      value: true,
    },
    {
      label:
        "In den letzten beiden Jahren kam es zu einem kontinuierlichen Anstieg der Menge an Knoblauchimporten",
      value: false,
    },
  ],
};

export default choices;
