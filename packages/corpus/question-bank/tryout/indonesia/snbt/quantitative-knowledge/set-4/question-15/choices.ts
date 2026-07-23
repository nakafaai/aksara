import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$P > Q$$",
      value: true,
    },
    {
      label: "$$P < Q$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$PQ = 1$$",
      value: false,
    },
    {
      label: "Cannot be determined",
      value: false,
    },
  ],
  id: [
    {
      label: "$$P > Q$$",
      value: true,
    },
    {
      label: "$$P < Q$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$PQ = 1$$",
      value: false,
    },
    {
      label: "Tidak dapat ditentukan",
      value: false,
    },
  ],
};

export default choices;
