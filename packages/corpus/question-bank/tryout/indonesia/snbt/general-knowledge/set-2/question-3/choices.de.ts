import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Nur Schulgebäude benötigen eine Verringerung des Katastrophenrisikos, weil andere Infrastruktur bereits sicher ist.",
      value: false,
    },
    {
      label:
        "Frühwarnsysteme können risikobewusste Planung und die Durchsetzung von Vorschriften bei Bauvorhaben ersetzen.",
      value: false,
    },
    {
      label:
        "Katastrophenrisiken müssen erst nach Abschluss einer Entwicklungsinvestition berücksichtigt werden.",
      value: false,
    },
    {
      label:
        "Die Verringerung von Katastrophenrisiken sollte Entwicklungsinvestitionen leiten, weil sich viel kritische Infrastruktur in Gefahrenzonen befindet.",
      value: true,
    },
    {
      label:
        "Die Verstärkung von Gebäuden reicht auch ohne Vorschriften, Aufsicht oder Katastrophenschutzübungen aus.",
      value: false,
    },
  ],
};

export default choices;
