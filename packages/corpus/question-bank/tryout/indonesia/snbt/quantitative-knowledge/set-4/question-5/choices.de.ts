import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Wenn $$(1)$$, $$(2)$$ und $$(3)$$ korrekt sind.",
      value: false,
    },
    {
      label: "Wenn $$(1)$$ und $$(3)$$ korrekt sind.",
      value: false,
    },
    {
      label: "Wenn $$(2)$$ und $$(4)$$ korrekt sind.",
      value: true,
    },
    {
      label: "Wenn nur $$(4)$$ korrekt ist.",
      value: false,
    },
    {
      label: "Wenn alles richtig ist.",
      value: false,
    },
  ],
};

export default choices;
