import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "warum ungewöhnliche Verknüpfungen in einem Traum normal wirken können.",
      value: false,
    },
    {
      label:
        "wissenschaftliche Fragen und Befunde zur Entstehung von Träumen und ihrem Zusammenhang mit Erlebnissen und Erinnerungen.",
      value: true,
    },
    {
      label:
        "die Schwierigkeit, die Erlebnisse schlafender Tiere genau zu kennen.",
      value: false,
    },
    {
      label: "ausschließlich die geringere bewusste Kontrolle im REM-Schlaf.",
      value: false,
    },
    {
      label:
        "die Empfehlung, dass Kinder nach jeder Unterrichtsstunde schlafen sollten.",
      value: false,
    },
  ],
};

export default choices;
