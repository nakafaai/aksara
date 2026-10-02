import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
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
