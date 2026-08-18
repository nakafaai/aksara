import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Regular activity, a varied diet, and practical stress management work together, while guidance should be adapted and additional help sought when needed.",
      value: true,
    },
    {
      label:
        "Eating one high-fiber food prevents disease and removes the need for exercise or stress management.",
      value: false,
    },
    {
      label:
        "Vigorous exercise is the only reliable way to protect health, regardless of a person's circumstances.",
      value: false,
    },
    {
      label:
        "Healthy living requires expensive food, a gym membership, and the complete absence of uncomfortable feelings.",
      value: false,
    },
    {
      label:
        "The same health advice applies to everyone, and people should manage persistent stress without seeking help.",
      value: false,
    },
  ],
};

export default choices;
