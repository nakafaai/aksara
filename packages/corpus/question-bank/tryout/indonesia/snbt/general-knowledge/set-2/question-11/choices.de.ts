import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "ein Milcherzeugnis, das garantiert keine Laktose enthält.",
      value: false,
    },
    {
      label: "ein Milcherzeugnis, das nur für ältere Menschen bestimmt ist.",
      value: false,
    },
    {
      label: "ein Arzneimittel zur Behandlung von Verdauungskrankheiten.",
      value: false,
    },
    {
      label:
        "ein durch Mikroorganismen fermentativ verändertes Milcherzeugnis.",
      value: true,
    },
    {
      label: "ein vor dem Verzehr mit Sauerstoff vermischtes Milcherzeugnis.",
      value: false,
    },
  ],
};

export default choices;
