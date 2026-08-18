import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Das neue Büro liegt weiter von den Wohnungen der meisten Beschäftigten entfernt.",
      value: false,
    },
    {
      label:
        "Die meisten Kündigungen waren bereits vor der Bekanntgabe des Umzugs eingereicht worden.",
      value: true,
    },
    {
      label:
        "Durch den Umzug verdoppelte sich die durchschnittliche Pendelzeit.",
      value: false,
    },
    {
      label:
        "Die Miete des neuen Büros ist niedriger als die des bisherigen Büros.",
      value: false,
    },
    {
      label:
        "Das Unternehmen zog nach Ablauf des Mietvertrags für das bisherige Gebäude um.",
      value: false,
    },
  ],
};

export default choices;
