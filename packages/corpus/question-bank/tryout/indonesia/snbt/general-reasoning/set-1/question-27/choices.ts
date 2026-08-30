import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Die Schlussfolgerung ist definitiv wahr",
      value: true,
    },
    {
      label: "Die Schlussfolgerung ist möglicherweise wahr",
      value: false,
    },
    {
      label: "Die Schlussfolgerung ist definitiv falsch",
      value: false,
    },
    {
      label:
        "Die Schlussfolgerung ist für die bereitgestellten Informationen irrelevant",
      value: false,
    },
    {
      label:
        "Die Schlussfolgerung kann aufgrund unzureichender Informationen nicht bewertet werden",
      value: false,
    },
  ],
  en: [
    { label: "The conclusion is definitely true", value: true },
    { label: "The conclusion is possibly true", value: false },
    { label: "The conclusion is definitely false", value: false },
    {
      label: "The conclusion is irrelevant to the information provided",
      value: false,
    },
    {
      label:
        "The conclusion cannot be evaluated due to insufficient information",
      value: false,
    },
  ],
  id: [
    { label: "Simpulan tersebut pasti benar", value: true },
    { label: "Simpulan tersebut mungkin benar", value: false },
    { label: "Simpulan tersebut pasti salah", value: false },
    {
      label: "Simpulan tidak relevan dengan informasi yang diberikan",
      value: false,
    },
    {
      label: "Simpulan tidak dapat dinilai karena informasi tidak cukup",
      value: false,
    },
  ],
};

export default choices;
