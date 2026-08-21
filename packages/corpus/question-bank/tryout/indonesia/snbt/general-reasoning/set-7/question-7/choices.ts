import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Schlussfolgerung ist mit Sicherheit wahr.", value: false },
    { label: "Die Schlussfolgerung ist wahrscheinlich wahr.", value: false },
    { label: "Die Schlussfolgerung ist mit Sicherheit falsch.", value: true },
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
  en: [
    { label: "The conclusion is definitely true.", value: false },
    { label: "The conclusion is probably true.", value: false },
    { label: "The conclusion is definitely false.", value: true },
    {
      label: "The conclusion is irrelevant to the information provided.",
      value: false,
    },
    {
      label:
        "The conclusion cannot be assessed because there is insufficient information.",
      value: false,
    },
  ],
  id: [
    { label: "Simpulan tersebut pasti benar.", value: false },
    { label: "Simpulan tersebut mungkin benar.", value: false },
    { label: "Simpulan tersebut pasti salah.", value: true },
    {
      label: "Simpulan tersebut tidak relevan dengan informasi yang diberikan.",
      value: false,
    },
    {
      label:
        "Simpulan tersebut tidak dapat dinilai karena informasi tidak cukup.",
      value: false,
    },
  ],
};

export default choices;
