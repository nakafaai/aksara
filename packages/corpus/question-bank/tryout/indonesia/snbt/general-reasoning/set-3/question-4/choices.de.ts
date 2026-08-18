import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$85$$ km/h",
      value: false,
    },
    {
      label: "$$95$$ km/h",
      value: false,
    },
    {
      label: "$$80$$ km/h",
      value: false,
    },
    {
      label: "$$75$$ km/h",
      value: true,
    },
    {
      label: "$$90$$ km/h",
      value: false,
    },
  ],
};

export default choices;
