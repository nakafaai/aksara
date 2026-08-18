import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2\\cos 2x - 3\\sin x + C$$",
      value: false,
    },
    {
      label: "$$-2\\cos 2x + 3\\sin x + C$$",
      value: false,
    },
    {
      label: "$$-2\\cos 2x - 3\\sin x + C$$",
      value: false,
    },
    {
      label: "$$-\\cos 2x - 3\\sin x + C$$",
      value: true,
    },
    {
      label: "$$\\cos 2x + 3\\sin x + C$$",
      value: false,
    },
  ],
};

export default choices;
