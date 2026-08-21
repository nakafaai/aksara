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
  en: [
    { label: "$$2$$ large apples", value: false },
    { label: "$$2$$ small apples", value: false },
    { label: "$$2$$ large oranges", value: false },
    { label: "$$2$$ small oranges", value: false },
    { label: "$$1$$ large apple and $$1$$ small orange", value: true },
  ],
  id: [
    { label: "$$2$$ apel besar", value: false },
    { label: "$$2$$ apel kecil", value: false },
    { label: "$$2$$ jeruk besar", value: false },
    { label: "$$2$$ jeruk kecil", value: false },
    { label: "$$1$$ apel besar dan $$1$$ jeruk kecil", value: true },
  ],
};

export default choices;
