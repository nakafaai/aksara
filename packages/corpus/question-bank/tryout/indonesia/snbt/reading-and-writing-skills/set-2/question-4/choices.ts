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
  en: [
    {
      label: "Hypothermia only threatens people outdoors in mountains.",
      value: false,
    },
    {
      label: "Shivering is the only reliable sign of hypothermia.",
      value: false,
    },
    {
      label:
        "Hypothermia is a medical emergency that requires prompt and safe action.",
      value: true,
    },
    {
      label: "Direct heat is the best way to treat hypothermia.",
      value: false,
    },
    {
      label: "A person who remains awake does not need medical help.",
      value: false,
    },
  ],
  id: [
    {
      label: "Hipotermia hanya mengancam orang yang berada di pegunungan.",
      value: false,
    },
    {
      label:
        "Menggigil merupakan satu-satunya tanda hipotermia yang dapat dipercaya.",
      value: false,
    },
    {
      label:
        "Hipotermia merupakan keadaan darurat medis yang memerlukan tindakan cepat dan aman.",
      value: true,
    },
    {
      label:
        "Panas langsung merupakan cara terbaik untuk menangani hipotermia.",
      value: false,
    },
    {
      label: "Orang yang masih sadar tidak memerlukan pertolongan medis.",
      value: false,
    },
  ],
};

export default choices;
