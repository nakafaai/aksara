import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Importe steigen und fallen von Jahr zu Jahr.", value: false },
    {
      label:
        "Produktion, Verbrauch und Importe steigen jedes Jahr um denselben Betrag.",
      value: false,
    },
    { label: "Der höchste Verbrauch tritt im Jahr A auf.", value: false },
    {
      label:
        "Der Verbrauch übersteigt in jedem aufgeführten Jahr die inländische Produktion, und die Importe decken die Lücke.",
      value: true,
    },
    {
      label:
        "Die Importe übersteigen in jedem aufgeführten Jahr die inländische Produktion.",
      value: false,
    },
  ],
};

export default choices;
