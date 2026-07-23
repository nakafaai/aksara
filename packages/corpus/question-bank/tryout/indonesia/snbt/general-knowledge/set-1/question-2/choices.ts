import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
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
