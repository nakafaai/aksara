import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Kinder spielen im Freien.",
      value: false,
    },
    {
      label: "Kinder haben mehr Gelegenheiten.",
      value: false,
    },
    {
      label: "Der Sommer bietet Kindern Gelegenheiten.",
      value: true,
    },
    {
      label: "Der Sommer spielt im Freien.",
      value: false,
    },
    {
      label: "Gelegenheiten finden im Freien statt.",
      value: false,
    },
  ],
};

export default choices;
