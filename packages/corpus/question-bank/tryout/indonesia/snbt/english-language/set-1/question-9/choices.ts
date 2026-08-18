import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "a ranking of sports by the calories they burn.", value: false },
    {
      label: "replacing balanced meals with dietary supplements.",
      value: false,
    },
    { label: "ways to eliminate every source of stress.", value: false },
    {
      label: "when and how to seek additional support for stress.",
      value: true,
    },
    { label: "the history of international nutrition guidance.", value: false },
  ],
};

export default choices;
