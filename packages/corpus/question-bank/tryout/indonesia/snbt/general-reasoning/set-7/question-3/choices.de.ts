import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Am Sensor trat eine Störung auf.", value: false },
    {
      label: "Die planmäßige tägliche Reinigung wurde nicht ausgelassen.",
      value: true,
    },
    { label: "Die Warnlampe leuchtete.", value: false },
    { label: "Auf dem Sensor blieben Rückstände zurück.", value: false },
    {
      label: "Die planmäßige tägliche Reinigung wurde ausgelassen.",
      value: false,
    },
  ],
};

export default choices;
