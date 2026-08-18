import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der Schlaf von Tieren beweist, dass Katzen von ihren Aktivitäten im Wachzustand träumen.",
      value: false,
    },
    {
      label:
        "Träume hängen mit der Aktivität des schlafenden Gehirns und Bruchstücken von Erlebnissen zusammen, ihre genaue Funktion wird aber weiter erforscht.",
      value: true,
    },
    {
      label:
        "Jeder Traum wiederholt ein neues Erlebnis genau und stärkt dadurch diese Erinnerung.",
      value: false,
    },
    {
      label:
        "Träume entstehen nur im REM-Schlaf, weil das Gehirn in allen anderen Phasen inaktiv ist.",
      value: false,
    },
    {
      label:
        "Der Zweck des Träumens ist vollständig geklärt, weitere Forschung ist daher unnötig.",
      value: false,
    },
  ],
};

export default choices;
