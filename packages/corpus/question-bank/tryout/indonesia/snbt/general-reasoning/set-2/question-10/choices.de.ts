import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2$$ große Äpfel",
      value: false,
    },
    {
      label: "$$2$$ kleine Äpfel",
      value: false,
    },
    {
      label: "$$2$$ große Orangen",
      value: false,
    },
    {
      label: "$$2$$ kleine Orangen",
      value: false,
    },
    {
      label: "$$1$$ großer Apfel und $$1$$ kleine Orange",
      value: true,
    },
  ],
};

export default choices;
