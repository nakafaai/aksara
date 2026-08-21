import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "versorgt.",
      value: false,
    },
    {
      label: "aufgewacht.",
      value: false,
    },
    {
      label: "tief und fest schlafend.",
      value: true,
    },
    {
      label: "instand gehalten.",
      value: false,
    },
    {
      label: "geschützt.",
      value: false,
    },
  ],
  en: [
    { label: "cared for.", value: false },
    { label: "woken up.", value: false },
    { label: "fast asleep.", value: true },
    { label: "maintained.", value: false },
    { label: "protected.", value: false },
  ],
  id: [
    { label: "terawat.", value: false },
    { label: "terbangun.", value: false },
    { label: "terlelap.", value: true },
    { label: "terpelihara.", value: false },
    { label: "terlindungi.", value: false },
  ],
};

export default choices;
