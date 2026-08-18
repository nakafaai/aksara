import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Every participant lost exactly 1.24 kg and kept it off.",
      value: false,
    },
    {
      label: "Only one of the 35 studies reported any weight change.",
      value: false,
    },
    {
      label: "Average weight increased during Ramadan and fell afterward.",
      value: false,
    },
    {
      label:
        "The review prescribed a fixed calorie target for all participants.",
      value: false,
    },
    {
      label:
        "Participants lost 1.24 kg on average during Ramadan, but most of it was regained within weeks.",
      value: true,
    },
  ],
};

export default choices;
