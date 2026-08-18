import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Paket M wird ins Kühllager geschickt.",
      value: false,
    },
    {
      label:
        "Paket M wird wegen seines blauen Etiketts in die manuelle Prüfung geschickt.",
      value: true,
    },
    {
      label:
        "Ein Paket mit rotem Etikett wird in die manuelle Prüfung geschickt.",
      value: false,
    },
    {
      label: "Paket M wird nicht in die manuelle Prüfung geschickt.",
      value: false,
    },
    {
      label: "Kein Paket wird beiden Wegen zugewiesen.",
      value: false,
    },
  ],
};

export default choices;
