import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jedes zugelassene pflanzliche Arzneimittel heilt nachweislich Krankheiten.",
      value: false,
    },
    {
      label:
        "Eine Verkehrszulassung garantiert, dass ein pflanzliches Arzneimittel für jede Person und jede Erkrankung geeignet ist.",
      value: false,
    },
    {
      label:
        "Nach der Zulassung eines pflanzlichen Arzneimittels müssen Verbraucher die Kennzeichnung nicht mehr prüfen.",
      value: false,
    },
    {
      label:
        "Die staatliche Überwachung endet, sobald ein pflanzliches Arzneimittel zugelassen wurde.",
      value: false,
    },
    {
      label:
        "Vertrieb und Anwendung pflanzlicher Arzneimittel hängen von behördlicher Prüfung und fortlaufender Überwachung ab.",
      value: true,
    },
  ],
};

export default choices;
