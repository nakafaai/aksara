import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$(1)$$, $$(2)$$ und $$(3)$$",
      value: false,
    },
    {
      label: "$$(1)$$ und $$(3)$$",
      value: true,
    },
    {
      label: "$$(2)$$ und $$(4)$$",
      value: false,
    },
    {
      label: "Nur $$(4)$$",
      value: false,
    },
    {
      label: "Alle vier Zahlen",
      value: false,
    },
  ],
};

export default choices;
