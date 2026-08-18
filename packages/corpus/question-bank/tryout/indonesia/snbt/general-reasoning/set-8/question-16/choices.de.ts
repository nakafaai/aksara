import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Die Schlussfolgerung ist definitiv wahr.",
      value: false,
    },
    {
      label: "Die Schlussfolgerung ist wahrscheinlich wahr.",
      value: false,
    },
    {
      label: "Die Schlussfolgerung ist definitiv falsch.",
      value: false,
    },
    {
      label: "Die Schlussfolgerung ist für die Angaben irrelevant.",
      value: false,
    },
    {
      label:
        "Die Schlussfolgerung ist relevant, lässt sich wegen unzureichender Angaben aber nicht beurteilen.",
      value: true,
    },
  ],
};

export default choices;
