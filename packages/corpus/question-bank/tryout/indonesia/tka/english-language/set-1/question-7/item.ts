import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "A workshop closes because it has no spare bicycle chains.",
        },
        {
          isCorrect: false,
          label: "A child teaches Sari how to repair a rear wheel.",
        },
        {
          isCorrect: false,
          label: "The writer spends a week buying new bicycles.",
        },
        {
          isCorrect: false,
          label: "Every repair in the workshop requires new components.",
        },
        {
          isCorrect: true,
          label:
            "A volunteer learns that careful diagnosis matters more than replacing parts quickly.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
