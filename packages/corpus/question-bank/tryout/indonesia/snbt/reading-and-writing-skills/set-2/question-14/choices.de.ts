import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "das Wort *Hinsichtlich* am Satzanfang entfernen.",
      value: true,
    },
    {
      label: "*dienen* durch *dient* ersetzen.",
      value: false,
    },
    {
      label: "das Wort *auch* entfernen.",
      value: false,
    },
    {
      label: "*Bezugsgrundlage* durch *Schätzung* ersetzen.",
      value: false,
    },
    {
      label: "das Wort *den* vor *aktuellen* einfügen.",
      value: false,
    },
  ],
};

export default choices;
