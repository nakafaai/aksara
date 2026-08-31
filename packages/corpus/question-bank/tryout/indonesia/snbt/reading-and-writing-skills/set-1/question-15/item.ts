import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Verunreinigung von Wasserquellen in vielen indonesischen Gemeinden hängt eng mit Sanitärversorgung und Abwasser zusammen.",
        },
        {
          isCorrect: false,
          label: "Unsichere Sanitärversorgung verunreinigt Wasserquellen.",
        },
        {
          isCorrect: false,
          label: "Die Verunreinigung von Wasserquellen hängt eng zusammen.",
        },
        {
          isCorrect: false,
          label:
            "Die Verunreinigung von Wasserquellen verursacht Sanitärversorgung und Abwasser.",
        },
        {
          isCorrect: true,
          label:
            "Die Verunreinigung von Wasserquellen hängt mit Sanitärversorgung und Abwasser zusammen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Water-source contamination in many Indonesian communities is closely linked to sanitation and wastewater.",
        },
        {
          isCorrect: false,
          label: "Unsafe sanitation contaminates water sources.",
        },
        {
          isCorrect: false,
          label: "Water-source contamination is closely linked.",
        },
        {
          isCorrect: false,
          label: "Water-source contamination causes sanitation and wastewater.",
        },
        {
          isCorrect: true,
          label:
            "Water-source contamination is linked to sanitation and wastewater.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pencemaran sumber air di berbagai permukiman Indonesia berkaitan erat dengan sanitasi dan air limbah.",
        },
        {
          isCorrect: false,
          label: "Sanitasi yang tidak aman mencemari sumber air.",
        },
        {
          isCorrect: false,
          label: "Pencemaran sumber air berkaitan erat.",
        },
        {
          isCorrect: false,
          label: "Pencemaran sumber air menyebabkan sanitasi dan air limbah.",
        },
        {
          isCorrect: true,
          label:
            "Pencemaran sumber air berkaitan dengan sanitasi dan air limbah.",
        },
      ],
    },
  },
};

export default item;
