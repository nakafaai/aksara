import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$48$$ Tage",
      value: false,
    },
    {
      label: "$$48{,}5$$ Tage",
      value: false,
    },
    {
      label: "$$49$$ Tage",
      value: false,
    },
    {
      label: "$$49{,}5$$ Tage",
      value: true,
    },
    {
      label: "$$50$$ Tage",
      value: false,
    },
  ],
};

export default choices;
