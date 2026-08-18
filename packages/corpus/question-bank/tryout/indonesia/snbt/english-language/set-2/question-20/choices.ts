import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "A biography of the first clerical worker", value: false },
    {
      label: "A list of jobs that will certainly disappear next year",
      value: false,
    },
    { label: "The history of electricity generation", value: false },
    {
      label: "Instructions for building a language model from scratch",
      value: false,
    },
    {
      label:
        "Examples of how workers and organizations can adapt tasks through training and social dialogue",
      value: true,
    },
  ],
};

export default choices;
