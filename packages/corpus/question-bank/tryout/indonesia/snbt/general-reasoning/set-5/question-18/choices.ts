import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Growth declined every year from $$2013$$ through $$2018$$",
      value: false,
    },
    {
      label: "Growth never declined between $$2014$$ and $$2017$$",
      value: false,
    },
    {
      label: "Growth showed no recovery after $$2015$$",
      value: false,
    },
    {
      label:
        "The decline from $$2014$$ to $$2015$$ was larger than the rise from $$2015$$ to $$2016$$",
      value: false,
    },
    {
      label:
        "The $$2013$$ growth rate was higher than every rate from $$2014$$ through $$2018$$",
      value: true,
    },
  ],
  id: [
    {
      label: "Pertumbuhan menurun setiap tahun dari $$2013$$ hingga $$2018$$",
      value: false,
    },
    {
      label: "Pertumbuhan tidak pernah menurun antara $$2014$$ dan $$2017$$",
      value: false,
    },
    {
      label: "Pertumbuhan tidak menunjukkan pemulihan setelah $$2015$$",
      value: false,
    },
    {
      label:
        "Penurunan dari $$2014$$ ke $$2015$$ lebih besar daripada kenaikan dari $$2015$$ ke $$2016$$",
      value: false,
    },
    {
      label:
        "Tingkat pertumbuhan $$2013$$ lebih tinggi daripada setiap tingkat pada $$2014$$ hingga $$2018$$",
      value: true,
    },
  ],
};

export default choices;
