import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Der GKP-Erzeugerpreis sinkt von Jahr zu Jahr weiter",
      value: false,
    },
    {
      label:
        "Die Regierung muss den Ankaufspreis erhöhen und den Landwirten zusätzliche Hilfen gewähren",
      value: false,
    },
    {
      label:
        "Die zuständigen Stellen müssen die Präsidialverordnung Nr. $$63$$ von $$2017$$ zur bargeldlosen Sozialhilfe überarbeiten",
      value: false,
    },
    {
      label:
        "Eine schwächere Preisstabilisierung auf Erzeugerebene verringert Kaufkraft und Lebensstandard der Landwirte",
      value: true,
    },
    {
      label:
        "Die Zahl der Rohreisverkäufe in $$30$$ Provinzen sank im April $$2019$$ um $$5{,}37\\%$$, während Grundnahrungsmittel teurer wurden",
      value: false,
    },
  ],
};

export default choices;
