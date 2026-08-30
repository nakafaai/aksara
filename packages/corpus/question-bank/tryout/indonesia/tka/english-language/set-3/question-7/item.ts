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
          label:
            "A volunteer confirms every person in a photograph during one week.",
        },
        {
          isCorrect: false,
          label: "An archivist asks visitors to remove all original notes.",
        },
        {
          isCorrect: true,
          label:
            "A volunteer learns to separate observation, memory, and uncertainty in archive records.",
        },
        {
          isCorrect: false,
          label:
            "A box of photographs is discarded because most names are unknown.",
        },
        {
          isCorrect: false,
          label: "The writer spends the week repairing a railway station.",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
