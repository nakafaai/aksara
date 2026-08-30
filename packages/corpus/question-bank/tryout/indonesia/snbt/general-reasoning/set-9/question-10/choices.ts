import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Schlussfolgerung ist mit Sicherheit wahr", value: true },
    { label: "Die Schlussfolgerung ist möglicherweise wahr", value: false },
    { label: "Die Schlussfolgerung ist mit Sicherheit falsch", value: false },
    {
      label: "Die Schlussfolgerung ist für die Angaben irrelevant",
      value: false,
    },
    {
      label: "Die Schlussfolgerung lässt sich aus den Angaben nicht bewerten",
      value: false,
    },
  ],
  en: [
    { label: "The conclusion is definitely true", value: true },
    { label: "The conclusion is possibly true", value: false },
    { label: "The conclusion is definitely false", value: false },
    {
      label: "The conclusion is irrelevant to the information",
      value: false,
    },
    {
      label: "The conclusion cannot be evaluated from the information",
      value: false,
    },
  ],
  id: [
    { label: "Simpulan tersebut pasti benar", value: true },
    { label: "Simpulan tersebut mungkin benar", value: false },
    { label: "Simpulan tersebut pasti salah", value: false },
    {
      label: "Simpulan tersebut tidak relevan dengan informasi",
      value: false,
    },
    {
      label: "Simpulan tersebut tidak dapat dinilai dari informasi yang ada",
      value: false,
    },
  ],
};

export default choices;
