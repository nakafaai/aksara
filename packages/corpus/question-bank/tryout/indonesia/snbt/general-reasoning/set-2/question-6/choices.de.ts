import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Der Verkauf von Hosen ist $$10$$ geringer als der von Hemden",
      value: false,
    },
    {
      label: "Der Verkauf von Anzügen ist $$35$$ höher als der von Hosen",
      value: false,
    },
    {
      label: "Zusammen werden weniger als $$70$$ Hemden und Hosen verkauft",
      value: true,
    },
    {
      label: "Der Verkauf von Hemden ist $$10$$ höher als der von Hosen",
      value: false,
    },
    {
      label: "Der Verkauf von Hosen ist $$35$$ geringer als der von Anzügen",
      value: false,
    },
  ],
};

export default choices;
