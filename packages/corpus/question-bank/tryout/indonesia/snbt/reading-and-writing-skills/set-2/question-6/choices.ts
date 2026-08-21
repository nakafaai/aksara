import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "oft.",
      value: true,
    },
    {
      label: "selten.",
      value: false,
    },
    {
      label: "plötzlich.",
      value: false,
    },
    {
      label: "getrennt.",
      value: false,
    },
    {
      label: "vielleicht.",
      value: false,
    },
  ],
  en: [
    {
      label: "often.",
      value: true,
    },
    {
      label: "rarely.",
      value: false,
    },
    {
      label: "suddenly.",
      value: false,
    },
    {
      label: "separately.",
      value: false,
    },
    {
      label: "perhaps.",
      value: false,
    },
  ],
  id: [
    {
      label: "sering.",
      value: true,
    },
    {
      label: "jarang.",
      value: false,
    },
    {
      label: "tiba-tiba.",
      value: false,
    },
    {
      label: "terpisah.",
      value: false,
    },
    {
      label: "mungkin.",
      value: false,
    },
  ],
};

export default choices;
