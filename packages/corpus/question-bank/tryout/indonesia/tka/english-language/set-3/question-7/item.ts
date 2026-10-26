import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "outline",
  },
  stimulus: "archive-week",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Recording visible details",
        },
        {
          correct: true,
          label: "Linking a newspaper comparison",
        },
        {
          correct: false,
          label:
            "Recording a visitor's identification as the main label before finding another source",
        },
        {
          correct: false,
          label:
            "Confirming the identity of every person in all forty-two photographs",
        },
      ],
    },
  },
};

export default item;
