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
      value: true,
    },
    {
      label:
        "Die Schlussfolgerung ist relevant, lässt sich wegen unzureichender Angaben aber nicht bewerten.",
      value: false,
    },
  ],
  en: [
    { label: "The conclusion is definitely true.", value: false },
    { label: "The conclusion is probably true.", value: false },
    { label: "The conclusion is definitely false.", value: false },
    {
      label: "The conclusion is irrelevant to the information provided.",
      value: true,
    },
    {
      label:
        "The conclusion is relevant but cannot be evaluated because the information is insufficient.",
      value: false,
    },
  ],
  id: [
    { label: "Simpulan tersebut pasti benar.", value: false },
    { label: "Simpulan tersebut kemungkinan besar benar.", value: false },
    { label: "Simpulan tersebut pasti salah.", value: false },
    {
      label: "Simpulan tidak relevan dengan informasi yang diberikan.",
      value: true,
    },
    {
      label:
        "Simpulan relevan, tetapi tidak dapat dinilai karena informasi tidak cukup.",
      value: false,
    },
  ],
};

export default choices;
