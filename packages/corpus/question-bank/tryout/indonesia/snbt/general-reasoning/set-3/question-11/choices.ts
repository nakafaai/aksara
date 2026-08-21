import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "definitiv wahr",
      value: false,
    },
    {
      label: "möglicherweise wahr",
      value: true,
    },
    {
      label: "definitiv falsch",
      value: false,
    },
    {
      label: "möglicherweise falsch",
      value: false,
    },
    {
      label: "kann nicht bestimmt werden",
      value: false,
    },
  ],
  en: [
    {
      label: "definitely true",
      value: false,
    },
    {
      label: "possibly true",
      value: true,
    },
    {
      label: "definitely false",
      value: false,
    },
    {
      label: "possibly false",
      value: false,
    },
    {
      label: "cannot be determined",
      value: false,
    },
  ],
  id: [
    {
      label: "pasti benar",
      value: false,
    },
    {
      label: "mungkin benar",
      value: true,
    },
    {
      label: "pasti salah",
      value: false,
    },
    {
      label: "mungkin salah",
      value: false,
    },
    {
      label: "tidak dapat ditentukan",
      value: false,
    },
  ],
};

export default choices;
