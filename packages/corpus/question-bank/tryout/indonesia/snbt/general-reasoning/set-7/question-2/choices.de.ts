import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Nicht entfernte Plaque kann zu Zahnstein verhärten.",
      value: false,
    },
    {
      label:
        "Zahnstein unterhalb des Zahnfleischrandes kann das Zahnfleisch reizen.",
      value: false,
    },
    {
      label:
        "Rotes, geschwollenes oder blutendes Zahnfleisch kann auf Gingivitis hinweisen.",
      value: false,
    },
    {
      label:
        "Jede Zahnfleischschwellung wird ausschließlich durch Plaque oder Zahnstein verursacht.",
      value: true,
    },
    {
      label:
        "Bereits gebildeter Zahnstein muss von einer zahnmedizinischen Fachkraft entfernt werden.",
      value: false,
    },
  ],
};

export default choices;
