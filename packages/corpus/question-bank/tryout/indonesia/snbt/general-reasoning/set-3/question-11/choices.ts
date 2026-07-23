import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "definitely true",
      value: true,
    },
    {
      label: "possibly true",
      value: false,
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
      label: "paling benar",
      value: true,
    },
    {
      label: "mungkin benar",
      value: false,
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
