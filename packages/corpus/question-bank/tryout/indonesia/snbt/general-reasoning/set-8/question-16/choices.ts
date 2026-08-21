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
  en: [
    { label: "The conclusion is definitely true.", value: false },
    { label: "The conclusion is probably true.", value: false },
    { label: "The conclusion is definitely false.", value: false },
    {
      label: "The conclusion is irrelevant to the given information.",
      value: false,
    },
    {
      label:
        "The conclusion is relevant but cannot be assessed because the information is insufficient.",
      value: true,
    },
  ],
  id: [
    { label: "Simpulan tersebut pasti benar.", value: false },
    { label: "Simpulan tersebut kemungkinan besar benar.", value: false },
    { label: "Simpulan tersebut pasti salah.", value: false },
    {
      label: "Simpulan tidak relevan dengan informasi yang diberikan.",
      value: false,
    },
    {
      label:
        "Simpulan relevan, tetapi tidak dapat dinilai karena informasi tidak cukup.",
      value: true,
    },
  ],
};

export default choices;
