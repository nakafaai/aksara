import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "product.",
      value: false,
    },
    {
      label: "productive.",
      value: false,
    },
    {
      label: "production.",
      value: false,
    },
    {
      label: "producer.",
      value: false,
    },
    {
      label: "productivity.",
      value: true,
    },
  ],
  id: [
    {
      label: "produk.",
      value: false,
    },
    {
      label: "produktif.",
      value: false,
    },
    {
      label: "produksi.",
      value: false,
    },
    {
      label: "produsen.",
      value: false,
    },
    {
      label: "produktivitas.",
      value: true,
    },
  ],
};

export default choices;
