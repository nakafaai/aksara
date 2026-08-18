import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "das Wort *gewann* im Satz $$(3)$$.",
      value: false,
    },
    {
      label: "das Wort *datiert* im Satz $$(4)$$.",
      value: false,
    },
    {
      label: "das Wort *Proben* im Satz $$(5)$$.",
      value: false,
    },
    {
      label: "das Wort *Forschung* im Satz $$(6)$$.",
      value: true,
    },
    {
      label: "das Wort *zirkulierten* im Satz $$(8)$$.",
      value: false,
    },
  ],
};

export default choices;
