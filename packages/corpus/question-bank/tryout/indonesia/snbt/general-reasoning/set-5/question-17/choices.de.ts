import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der Beitrag des privaten Konsums bliebe genau bei $$2{,}74$$ Prozentpunkten",
      value: false,
    },
    {
      label:
        "Der Investitionsbeitrag müsste unter $$2{,}17$$ Prozentpunkte fallen",
      value: false,
    },
    {
      label:
        "Der Beitrag des privaten Konsums läge unter $$2{,}74$$ Prozentpunkten",
      value: true,
    },
    {
      label: "Das gesamte Wirtschaftswachstum müsste negativ werden",
      value: false,
    },
    {
      label: "Der private Konsum würde keinen Beitrag leisten",
      value: false,
    },
  ],
};

export default choices;
