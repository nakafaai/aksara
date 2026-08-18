import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Sinta erhält eine Gehaltsüberprüfung, nimmt aber nicht am Beförderungsverfahren teil.",
      value: false,
    },
    {
      label:
        "Sinta erhält eine Gehaltsüberprüfung und nimmt am Beförderungsverfahren teil.",
      value: true,
    },
    {
      label:
        "Sinta erhält weder eine Gehaltsüberprüfung noch ein Beförderungsverfahren.",
      value: false,
    },
    {
      label:
        "Sinta nimmt ohne Gehaltsüberprüfung am Beförderungsverfahren teil.",
      value: false,
    },
    {
      label: "Sinta hat die berufliche Zertifizierung nicht abgeschlossen.",
      value: false,
    },
  ],
};

export default choices;
