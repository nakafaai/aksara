import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Verunreinigung von Wasserquellen hängt mit Sanitärversorgung und Abwasser zusammen.",
      value: true,
    },
    {
      label:
        "Die Verunreinigung von Wasserquellen in vielen indonesischen Gemeinden hängt eng mit Sanitärversorgung und Abwasser zusammen.",
      value: false,
    },
    {
      label: "Unsichere Sanitärversorgung verunreinigt Wasserquellen.",
      value: false,
    },
    {
      label: "Die Verunreinigung von Wasserquellen hängt eng zusammen.",
      value: false,
    },
    {
      label:
        "Die Verunreinigung von Wasserquellen verursacht Sanitärversorgung und Abwasser.",
      value: false,
    },
  ],
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
