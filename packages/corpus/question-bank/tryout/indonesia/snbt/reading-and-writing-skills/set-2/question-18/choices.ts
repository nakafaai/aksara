import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$(1)\rightarrow(5)\rightarrow(4)\rightarrow(3)\rightarrow(2)$$.",
      value: false,
    },
    {
      label: "$$(4)\rightarrow(5)\rightarrow(1)\rightarrow(3)\rightarrow(2)$$.",
      value: true,
    },
    {
      label: "$$(4)\rightarrow(2)\rightarrow(3)\rightarrow(1)\rightarrow(5)$$.",
      value: false,
    },
    {
      label: "$$(5)\rightarrow(4)\rightarrow(1)\rightarrow(3)\rightarrow(2)$$.",
      value: false,
    },
    {
      label: "$$(5)\rightarrow(4)\rightarrow(1)\rightarrow(2)\rightarrow(3)$$.",
      value: false,
    },
  ],
  id: [
    {
      label: "$$(1)\rightarrow(5)\rightarrow(4)\rightarrow(3)\rightarrow(2)$$.",
      value: false,
    },
    {
      label: "$$(4)\rightarrow(5)\rightarrow(1)\rightarrow(3)\rightarrow(2)$$.",
      value: true,
    },
    {
      label: "$$(4)\rightarrow(2)\rightarrow(3)\rightarrow(1)\rightarrow(5)$$.",
      value: false,
    },
    {
      label: "$$(5)\rightarrow(4)\rightarrow(1)\rightarrow(3)\rightarrow(2)$$.",
      value: false,
    },
    {
      label: "$$(5)\rightarrow(4)\rightarrow(1)\rightarrow(2)\rightarrow(3)$$.",
      value: false,
    },
  ],
};

export default choices;
