import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pencemaran sumber air di berbagai permukiman Indonesia berkaitan erat dengan sanitasi dan air limbah.",
        },
        {
          correct: false,
          label: "Sanitasi yang tidak aman mencemari sumber air.",
        },
        {
          correct: false,
          label: "Pencemaran sumber air berkaitan erat.",
        },
        {
          correct: false,
          label: "Pencemaran sumber air menyebabkan sanitasi dan air limbah.",
        },
        {
          correct: true,
          label:
            "Pencemaran sumber air berkaitan dengan sanitasi dan air limbah.",
        },
      ],
    },
  },
};

export default item;
