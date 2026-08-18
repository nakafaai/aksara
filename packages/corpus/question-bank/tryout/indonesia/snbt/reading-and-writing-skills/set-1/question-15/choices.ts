import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Water-source contamination is linked to sanitation and wastewater.",
      value: true,
    },
    {
      label:
        "Water-source contamination in many Indonesian communities is closely linked to sanitation and wastewater.",
      value: false,
    },
    {
      label: "Unsafe sanitation contaminates water sources.",
      value: false,
    },
    {
      label: "Water-source contamination is closely linked.",
      value: false,
    },
    {
      label: "Water-source contamination causes sanitation and wastewater.",
      value: false,
    },
  ],
  id: [
    {
      label: "Pencemaran sumber air berkaitan dengan sanitasi dan air limbah.",
      value: true,
    },
    {
      label:
        "Pencemaran sumber air di berbagai permukiman Indonesia berkaitan erat dengan sanitasi dan air limbah.",
      value: false,
    },
    {
      label: "Sanitasi yang tidak aman mencemari sumber air.",
      value: false,
    },
    {
      label: "Pencemaran sumber air berkaitan erat.",
      value: false,
    },
    {
      label: "Pencemaran sumber air menyebabkan sanitasi dan air limbah.",
      value: false,
    },
  ],
};

export default choices;
