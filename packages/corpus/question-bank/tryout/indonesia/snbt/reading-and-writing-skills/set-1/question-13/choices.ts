import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "The word _tested_ in sentence $$(2)$$.",
      value: false,
    },
    {
      label: "The word _facilitate_ in sentence $$(3)$$.",
      value: false,
    },
    {
      label: "The word _allows_ in sentence $$(4)$$.",
      value: false,
    },
    {
      label: "The word _produce_ in sentence $$(8)$$.",
      value: true,
    },
    {
      label: "The word _threaten_ in sentence $$(9)$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "Kata _diuji_ pada kalimat $$(2)$$.",
      value: false,
    },
    {
      label: "Kata _membantu_ pada kalimat $$(3)$$.",
      value: false,
    },
    {
      label: "Kata _memungkinkan_ pada kalimat $$(4)$$.",
      value: false,
    },
    {
      label: "Kata _menghasilkan_ pada kalimat $$(8)$$.",
      value: true,
    },
    {
      label: "Kata _mengancam_ pada kalimat $$(9)$$.",
      value: false,
    },
  ],
};

export default choices;
