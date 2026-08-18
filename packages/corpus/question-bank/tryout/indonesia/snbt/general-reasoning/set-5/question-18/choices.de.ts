import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Wachstum sank von $$2013$$ bis $$2018$$ in jedem Jahr",
      value: false,
    },
    {
      label: "Zwischen $$2014$$ und $$2017$$ ging das Wachstum nie zurück",
      value: false,
    },
    {
      label: "Nach $$2015$$ war keine Erholung des Wachstums erkennbar",
      value: false,
    },
    {
      label:
        "Der Rückgang von $$2014$$ auf $$2015$$ war größer als der Anstieg von $$2015$$ auf $$2016$$",
      value: false,
    },
    {
      label:
        "Die Wachstumsrate von $$2013$$ war höher als jede Rate von $$2014$$ bis $$2018$$",
      value: true,
    },
  ],
};

export default choices;
