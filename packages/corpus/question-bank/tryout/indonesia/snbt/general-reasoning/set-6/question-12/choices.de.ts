import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Beide Wirtschaftsindikatoren sind gestiegen.", value: false },
    {
      label:
        "Nur der Reallohn der landwirtschaftlichen Arbeitskräfte ist nicht gestiegen.",
      value: false,
    },
    {
      label:
        "Die Armut in den Dörfern und die Ungleichheit zwischen Land und Stadt werden beide abnehmen.",
      value: false,
    },
    {
      label:
        "Das Modell erlaubt keine Schlussfolgerung über Armut oder Ungleichheit.",
      value: false,
    },
    {
      label:
        "Die Armut in den Dörfern und die Ungleichheit zwischen Land und Stadt werden beide zunehmen.",
      value: true,
    },
  ],
};

export default choices;
