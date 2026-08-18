import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Art ist nur in Papua heimisch", value: false },
    {
      label: "Die Art ist überall außerhalb Neuguineas eingeführt",
      value: false,
    },
    {
      label: "Die Art wächst vor allem in einem trockenen gemäßigten Biom",
      value: false,
    },
    {
      label:
        "Das natürliche Verbreitungsgebiet der Art reicht weit über Neuguinea hinaus",
      value: true,
    },
    { label: "Die Art ist eine krautige Pflanze und kein Baum", value: false },
  ],
};

export default choices;
