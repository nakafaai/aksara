import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Schlussfolgerung ist mit Sicherheit wahr.", value: true },
    { label: "Die Schlussfolgerung ist möglicherweise wahr.", value: false },
    { label: "Die Schlussfolgerung ist mit Sicherheit falsch.", value: false },
    {
      label: "Die Schlussfolgerung ist für die Angaben irrelevant.",
      value: false,
    },
    {
      label:
        "Die Schlussfolgerung lässt sich wegen unzureichender Angaben nicht bewerten.",
      value: false,
    },
  ],
};

export default choices;
