import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Beendigung des illegalen Zinnabbaus würde das Wassereinzugsgebiet zwangsläufig schädigen.",
      value: false,
    },
    {
      label:
        "Bergbausedimente und unterbrochene Flussläufe können die Aufnahmekapazität verringern und die Hochwassergefahr in der Regenzeit erhöhen.",
      value: true,
    },
    {
      label:
        "Weil illegale Bergleute offen arbeiten, kann es in der Regenzeit nicht zu Hochwasser kommen.",
      value: false,
    },
    {
      label:
        "Schäden am Wassereinzugsgebiet und Bergbausedimente bedrohen die umliegende Bevölkerung nicht.",
      value: false,
    },
    {
      label:
        "Bergbausedimente verbessern den Abfluss und verhindern Unterbrechungen der Flussläufe.",
      value: false,
    },
  ],
};

export default choices;
