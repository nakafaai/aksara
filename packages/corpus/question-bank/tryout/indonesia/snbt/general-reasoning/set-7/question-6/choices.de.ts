import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Sie ist langlebiger und teurer als die Terrassenlampe.",
      value: false,
    },
    {
      label: "Sie ist weniger langlebig, aber teurer als die Terrassenlampe.",
      value: false,
    },
    {
      label: "Sie ist weniger langlebig und günstiger als die Terrassenlampe.",
      value: true,
    },
    {
      label: "Sie ist langlebiger, aber günstiger als die Terrassenlampe.",
      value: false,
    },
    {
      label:
        "Sie ist genauso langlebig und genauso teuer wie die Terrassenlampe.",
      value: false,
    },
  ],
};

export default choices;
