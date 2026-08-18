import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Bildungszuweisung steigt", value: false },
    {
      label:
        "Viele leistungsstarke Studierende können an führenden Universitäten in Indonesien studieren",
      value: false,
    },
    {
      label:
        "Einige der leistungsstärksten Studierenden Indonesiens können an führenden Universitäten im Ausland studieren",
      value: false,
    },
    {
      label: "Ein Teil der Bildungszuweisung wird nicht vollständig ausgegeben",
      value: false,
    },
    {
      label:
        "Viele der leistungsstärksten Studierenden Indonesiens können an führenden Universitäten im Ausland studieren",
      value: true,
    },
  ],
};

export default choices;
