import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Das Wachstum sank von $$2013$$ bis $$2018$$ in jedem Jahr",
        },
        {
          isCorrect: false,
          label: "Zwischen $$2014$$ und $$2017$$ ging das Wachstum nie zurück",
        },
        {
          isCorrect: false,
          label: "Nach $$2015$$ war keine Erholung des Wachstums erkennbar",
        },
        {
          isCorrect: false,
          label:
            "Der Rückgang von $$2014$$ auf $$2015$$ war größer als der Anstieg von $$2015$$ auf $$2016$$",
        },
        {
          isCorrect: true,
          label:
            "Die Wachstumsrate von $$2013$$ war höher als jede Rate von $$2014$$ bis $$2018$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Growth declined every year from $$2013$$ through $$2018$$",
        },
        {
          isCorrect: false,
          label: "Growth never declined between $$2014$$ and $$2017$$",
        },
        {
          isCorrect: false,
          label: "Growth showed no recovery after $$2015$$",
        },
        {
          isCorrect: false,
          label:
            "The decline from $$2014$$ to $$2015$$ was larger than the rise from $$2015$$ to $$2016$$",
        },
        {
          isCorrect: true,
          label:
            "The $$2013$$ growth rate was higher than every rate from $$2014$$ through $$2018$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pertumbuhan menurun setiap tahun dari $$2013$$ hingga $$2018$$",
        },
        {
          isCorrect: false,
          label:
            "Pertumbuhan tidak pernah menurun antara $$2014$$ dan $$2017$$",
        },
        {
          isCorrect: false,
          label: "Pertumbuhan tidak menunjukkan pemulihan setelah $$2015$$",
        },
        {
          isCorrect: false,
          label:
            "Penurunan dari $$2014$$ ke $$2015$$ lebih besar daripada kenaikan dari $$2015$$ ke $$2016$$",
        },
        {
          isCorrect: true,
          label:
            "Tingkat pertumbuhan $$2013$$ lebih tinggi daripada setiap tingkat pada $$2014$$ hingga $$2018$$",
        },
      ],
    },
  },
};

export default item;
