import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "outline",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Recording visible details",
        },
        {
          isCorrect: true,
          label: "Linking a newspaper comparison",
        },
        {
          isCorrect: false,
          label:
            "Recording a visitor's identification as the main label before finding another source",
        },
        {
          isCorrect: false,
          label:
            "Confirming the identity of every person in all forty-two photographs",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
