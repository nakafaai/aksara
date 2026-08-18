import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Einheimische Nahrungspflanzen durch importierte Waren ersetzen.",
      value: false,
    },
    {
      label:
        "Bewässerung, landwirtschaftliche Flächen, Maschinen, Dünger und hochwertiges Saatgut finanzieren.",
      value: true,
    },
    {
      label:
        "Das gesamte Ministeriumsbudget ausschließlich für die Reisproduktion verwenden.",
      value: false,
    },
    {
      label: "Alle Agrarimporte durch ein neues Gesetz beenden.",
      value: false,
    },
    {
      label: "Die bewirtschaftete Fläche außerhalb Javas verkleinern.",
      value: false,
    },
  ],
};

export default choices;
