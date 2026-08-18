import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Kaliumreiche Lebensmittel können eine verordnete Blutdruckbehandlung ersetzen",
      value: false,
    },
    {
      label:
        "Kaliumreiche Lebensmittel können die Behandlung von Bluthochdruck unterstützen, doch mehr Kalium ist nicht automatisch für alle Menschen unbedenklich",
      value: true,
    },
    {
      label: "Kalium entfernt das gesamte Natrium aus dem Körper",
      value: false,
    },
    {
      label:
        "Je mehr Kalium jemand zu sich nimmt, desto niedriger ist sein Blutdruck in jedem Fall",
      value: false,
    },
    {
      label:
        "Jeder Mensch sollte ohne fachlichen Rat Kaliumpräparate einnehmen",
      value: false,
    },
  ],
};

export default choices;
