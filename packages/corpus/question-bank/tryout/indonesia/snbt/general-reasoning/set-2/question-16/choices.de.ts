import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Bei Zahlung des Tätigkeitshonorars kann die Führungskraft den Mitarbeiter mit der Erstellung einer Meldung beauftragen",
      value: false,
    },
    {
      label:
        "Wenn der Tätigkeitsbericht nicht eingereicht wurde, bedeutet dies, dass das Managerhonorar nicht gezahlt wird",
      value: false,
    },
    {
      label:
        "Wenn der Manager einen Bericht verlangt, wird die Aktivität sofort ausgeführt",
      value: false,
    },
    {
      label:
        "Wird das Honorar nicht ausgezahlt, wurde die Tätigkeit nicht durchgeführt",
      value: true,
    },
    {
      label: "Fehlt ein Honorar, kann die Tätigkeit nicht ausgeübt werden",
      value: false,
    },
  ],
};

export default choices;
