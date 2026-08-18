import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Eine Unterkühlung bedroht nur Menschen im Freien in den Bergen.",
      value: false,
    },
    {
      label:
        "Zittern ist das einzige verlässliche Warnzeichen einer Unterkühlung.",
      value: false,
    },
    {
      label:
        "Eine Unterkühlung ist ein medizinischer Notfall, der schnelles und sicheres Handeln erfordert.",
      value: true,
    },
    {
      label: "Direkte Hitze ist die beste Behandlung einer Unterkühlung.",
      value: false,
    },
    {
      label: "Eine wache Person benötigt keine medizinische Hilfe.",
      value: false,
    },
  ],
};

export default choices;
