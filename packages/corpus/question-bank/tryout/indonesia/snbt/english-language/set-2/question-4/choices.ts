import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "It produces identical weight loss for every person who fasts.",
      value: false,
    },
    {
      label: "It is designed primarily as a clinical treatment for obesity.",
      value: false,
    },
    {
      label:
        "Its short-term average effects do not by themselves establish lasting weight loss.",
      value: true,
    },
    {
      label: "It permanently reduces fat-free mass and total body water.",
      value: false,
    },
    {
      label: "It always reduces calorie intake by a fixed amount.",
      value: false,
    },
  ],
};

export default choices;
