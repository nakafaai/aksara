import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Mindestens ein Gericht ist nicht zugleich säuerlich und scharf",
      value: false,
    },
    {
      label: "Mindestens ein Gericht ist weder säuerlich noch scharf",
      value: false,
    },
    { label: "Jedes Gericht enthält rohes Gemüse", value: false },
    { label: "Kein Gericht enthält rohes Gemüse", value: false },
    {
      label:
        "Mindestens ein Gericht enthält kein rohes Gemüse und schmeckt säuerlich und scharf",
      value: true,
    },
  ],
};

export default choices;
