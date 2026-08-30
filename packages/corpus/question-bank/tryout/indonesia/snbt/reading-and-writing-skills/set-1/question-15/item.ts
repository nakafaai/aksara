import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Verunreinigung von Wasserquellen hängt mit Sanitärversorgung und Abwasser zusammen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Verunreinigung von Wasserquellen in vielen indonesischen Gemeinden hängt eng mit Sanitärversorgung und Abwasser zusammen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Unsichere Sanitärversorgung verunreinigt Wasserquellen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Verunreinigung von Wasserquellen hängt eng zusammen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Verunreinigung von Wasserquellen verursacht Sanitärversorgung und Abwasser.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Water-source contamination is linked to sanitation and wastewater.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Water-source contamination in many Indonesian communities is closely linked to sanitation and wastewater.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Unsafe sanitation contaminates water sources.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Water-source contamination is closely linked.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Water-source contamination causes sanitation and wastewater.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pencemaran sumber air berkaitan dengan sanitasi dan air limbah.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pencemaran sumber air di berbagai permukiman Indonesia berkaitan erat dengan sanitasi dan air limbah.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sanitasi yang tidak aman mencemari sumber air.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pencemaran sumber air berkaitan erat." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pencemaran sumber air menyebabkan sanitasi dan air limbah.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
